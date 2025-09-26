# 📧 Configuración de Emails con Resend + Supabase Edge Functions

## 🎯 ¿Qué hicimos?

Implementamos un sistema de notificaciones por email completamente funcional para cuando los usuarios envían reseñas médicas:
- **Email de confirmación** ✅ cuando la reseña se envía exitosamente
- **Email de notificación** ❌ cuando hay errores al enviar la reseña
- **Nombres reales de doctores** 👨‍⚕️ usando `doctorFullName` en lugar de "Doctor" genérico
- **Sistema sin bloqueo** 🚀 los emails no interfieren con el flujo principal

## 🛠️ Tecnologías utilizadas

- **Resend**: Servicio de emails transaccionales (como Mailgun o SendGrid)
- **Supabase Edge Functions**: Funciones serverless para procesar emails
- **React**: Frontend para enviar las reseñas
- **CORS**: Para permitir comunicación entre frontend y backend
- **Deno**: Runtime de JavaScript/TypeScript para Edge Functions

---

## 📋 Paso a Paso - Configuración

### 1️⃣ **Configuración de Resend**

#### ¿Qué es Resend?
Resend es un servicio que nos permite enviar emails desde nuestras aplicaciones de forma programática. Es más confiable que enviar emails directamente desde nuestro servidor.

#### Configuración inicial:
1. Crear cuenta en [resend.com](https://resend.com)
2. Generar API Key
3. Agregar la API key a nuestro proyecto

**Archivo creado**: `supabase/.env`
```bash
# Resend API Key para enviar emails
RESEND_API_KEY=re_TcijJ1TY_6H5ocgBFyPAaubm3eCJMER1n
```

### 2️⃣ **Creación de Edge Functions**

#### ¿Qué son las Edge Functions?
Son funciones serverless (código que se ejecuta en la nube sin que tengamos que manejar servidores) que se ejecutan cerca del usuario para mayor velocidad.

#### Comandos ejecutados:
```bash
# Inicializar Supabase en el proyecto
supabase init

# Crear función para emails de confirmación
supabase functions new send-review-confirmation

# Crear función para emails de error
supabase functions new send-failure-notification
```

### 3️⃣ **Implementación de la función de confirmación**

**Archivo**: `supabase/functions/send-review-confirmation/index.ts`

```typescript
// Importar tipos de Supabase
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Definir estructura de datos que recibimos
interface ReviewData {
  userEmail: string;
  userName: string;
  doctorFullName: string; // ✅ Actualizado para usar nombre completo del doctor
  reviewText: string;
  submissionDate: string;
}

// Headers CORS para permitir requests desde el frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // Manejar requests OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Solo permitir método POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Extraer datos del request
    const reviewData: ReviewData = await req.json();
    const { userEmail, userName, doctorFullName, reviewText, submissionDate } = reviewData;

    // Validar campos obligatorios
    if (!userEmail || !userName || !doctorFullName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userEmail, userName, doctorFullName' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Obtener API key de Resend desde variables de entorno
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Email service configuration error' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Crear contenido HTML del email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0063F7;">¡Gracias por tu reseña, ${userName}!</h2>

        <p>Tu reseña sobre <strong>${doctorFullName}</strong> ha sido enviada exitosamente.</p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Tu reseña:</h3>
          <p style="white-space: pre-wrap; color: #555;">${reviewText}</p>
        </div>

        <p style="color: #666; font-size: 14px;">
          <strong>Fecha de envío:</strong> ${submissionDate}
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="color: #888; font-size: 12px;">
          Este correo confirma que tu reseña ha sido procesada correctamente en FindrIt.
        </p>
      </div>
    `;

    // Enviar email usando Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FindrIt <onboarding@resend.dev>', // Dominio por defecto de Resend
        to: [userEmail],
        subject: `✅ Reseña enviada - ${doctorFullName}`,
        html: emailHtml,
      }),
    });

    // Verificar si Resend respondió exitosamente
    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errorData }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', resendData);

    // Responder exitosamente
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Review confirmation email sent successfully',
        emailId: resendData.id
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error('Error in send-review-confirmation function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
})
```

### 4️⃣ **Implementación de la función de notificación de errores**

**Archivo**: `supabase/functions/send-failure-notification/index.ts`

Similar a la función anterior, pero con contenido HTML diferente para notificar errores:

```typescript
// Estructura de datos para errores
interface FailureData {
  userEmail: string;
  userName: string;
  doctorFullName: string; // ✅ Actualizado para usar nombre completo del doctor
  reviewText: string;
  errorMessage: string;
  attemptCount: number;
  lastAttemptDate: string;
}

// El contenido HTML incluye:
const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #dc3545;">❌ Problema al enviar tu reseña</h2>

    <p>Hola ${userName},</p>

    <p>Lamentamos informarte que no pudimos procesar tu reseña sobre <strong>${doctorFullName}</strong> después de ${attemptCount} intentos.</p>

    <div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #856404;">⚠️ Detalles del error:</h4>
      <p style="color: #856404; font-family: monospace; background-color: #fff; padding: 10px; border-radius: 4px;">
        ${errorMessage}
      </p>
    </div>

    <!-- Más contenido del email... -->
  </div>
`;
```

### 5️⃣ **Despliegue de las funciones**

```bash
# Conectar con Supabase usando Personal Access Token
supabase login --token [TU_TOKEN_AQUI]

# Vincular proyecto local con proyecto en Supabase
supabase link --project-ref ehdwumyvvxjmzatwkrhu

# Configurar variable de entorno en Supabase
supabase secrets set RESEND_API_KEY=re_TcijJ1TY_6H5ocgBFyPAaubm3eCJMER1n

# Desplegar las funciones
supabase functions deploy send-review-confirmation
supabase functions deploy send-failure-notification
```

### 6️⃣ **Integración con el Frontend**

#### Modificaciones en `SubmitFormReview.jsx`:

**Funciones auxiliares para enviar emails:**

```javascript
// Función para enviar email de confirmación
const sendConfirmationEmail = async (userEmail, userName, doctorFullName, reviewText) => {
  try {
    console.log('📧 Enviando email de confirmación...');

    const response = await fetch(`${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/send-review-confirmation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        userName,
        doctorFullName, // ✅ Actualizado para usar nombre completo
        reviewText,
        submissionDate: new Date().toLocaleString('es-ES')
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email de confirmación enviado:', result.emailId);
    } else {
      console.error('❌ Error enviando email de confirmación:', await response.text());
    }
  } catch (error) {
    console.error('❌ Error en función de email:', error);
  }
};

// Función para enviar email de error
const sendFailureEmail = async (userEmail, userName, doctorFullName, reviewText, errorMessage) => {
  try {
    console.log('📧 Enviando email de falla...');

    const response = await fetch(`${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/send-failure-notification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        userName,
        doctorFullName, // ✅ Actualizado para usar nombre completo
        reviewText,
        errorMessage: errorMessage,
        attemptCount: 1,
        lastAttemptDate: new Date().toLocaleString('es-ES')
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email de falla enviado:', result.emailId);
    }
  } catch (error) {
    console.error('❌ Error en función de email de falla:', error);
  }
};
```

**Modificación del handleSubmit:**

```javascript
const handleSubmit = async () => {
  setIsLoading(true);

  try {
    // Actualizar nombre del usuario si existe
    if (userName) {
      await supabase.auth.updateUser({
        data: { full_name: userName }
      });
    }

    // Obtener datos del usuario
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Insertar reseña en base de datos
    const result = await supabase.from('reviews').insert({
      user_id: user.id,
      doctor_id: doctorId,
      written_review: writtenReview,
      // ... más campos
      user_email: user.email,
      is_anonymous: isAnonymous
    });

    // Verificar si hubo error
    if (result.error) {
      throw result.error;
    }

    console.log('✅ Reseña guardada exitosamente:', result);

    // 🎯 AQUÍ SE ENVÍA EL EMAIL DE CONFIRMACIÓN
    sendConfirmationEmail(
      user.email,
      userName || user.user_metadata?.full_name || 'Usuario',
      doctorFullName || 'Doctor', // ✅ Usa el nombre completo del doctor
      writtenReview
    );

    // Continuar al siguiente paso
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 300);

  } catch (error) {
    console.error('❌ Error enviando reseña:', error);

    // 🎯 AQUÍ SE ENVÍA EL EMAIL DE ERROR
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        sendFailureEmail(
          user.email,
          userName || user.user_metadata?.full_name || 'Usuario',
          doctorFullName || 'Doctor', // ✅ Usa el nombre completo del doctor
          writtenReview,
          error.message || 'Error desconocido'
        );
      }
    } catch (emailError) {
      console.error('Error obteniendo user para email de falla:', emailError);
    }

    setIsLoading(false);
    return { error };
  }
};
```

---

## 🔧 Problemas y Soluciones

### ❌ Problema 1: Error CORS

**Error encontrado:**
```
Access to fetch at 'https://ehdwumyvvxjmzatwkrhu.supabase.co/functions/v1/send-review-confirmation'
from origin 'http://localhost:4321' has been blocked by CORS policy
```

**¿Qué es CORS?**
CORS (Cross-Origin Resource Sharing) es una política de seguridad de los navegadores que bloquea requests entre diferentes dominios por defecto.

**Solución implementada:**
Agregar headers CORS a las Edge Functions:

```typescript
// Headers CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Manejar requests OPTIONS (preflight)
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders });
}

// Agregar corsHeaders a todas las respuestas
return new Response(
  JSON.stringify(data),
  { headers: { "Content-Type": "application/json", ...corsHeaders } }
);
```

### ❌ Problema 2: Dominio no verificado en Resend

**Error encontrado:**
```
"The findrit.com domain is not verified. Please, add and verify your domain"
```

**Solución:**
Usar el dominio por defecto de Resend:
```typescript
from: 'FindrIt <onboarding@resend.dev>' // En lugar de noreply@findrit.com
```

### ❌ Problema 3: Error 400 - Campos faltantes

**Error encontrado:**
```
Error 400: Missing required fields: userEmail, userName, doctorName
```

**Causa:** El frontend enviaba `doctorFullName` pero las Edge Functions esperaban `doctorName`.

**Solución:**
- Actualizar las interfaces de las Edge Functions para usar `doctorFullName`
- Cambiar todas las referencias de `doctorName` → `doctorFullName`
- Redesplegar las funciones actualizadas

### ❌ Problema 4: Error de despliegue con deno.json

**Error encontrado:**
```
failed to load import map: open import_map.json: no such file or directory
```

**Solución:**
Remover la línea `"importMap": "import_map.json"` de los archivos `deno.json`

---

## 🎯 Flujo Completo

### Caso de Éxito ✅
1. Usuario llena formulario de reseña
2. Presiona "Enviar"
3. Se guarda en base de datos Supabase
4. Se ejecuta `sendConfirmationEmail()` con `doctorFullName`
5. Edge Function envía email via Resend con nombre real del doctor
6. Usuario recibe email: **"Tu reseña sobre Dr. García López ha sido enviada exitosamente"**
7. Se muestra pantalla "Thanks"

### Caso de Error ❌
1. Usuario llena formulario de reseña
2. Presiona "Enviar"
3. Falla (sin internet, error de BD, etc.)
4. Se ejecuta `sendFailureEmail()` con `doctorFullName`
5. Edge Function envía email de notificación con nombre real del doctor
6. Usuario recibe email: **"No pudimos procesar tu reseña sobre Dr. García López"**
7. Se muestra mensaje de error

---

## 📊 URLs y Referencias

**Edge Functions desplegadas:**
- Confirmación: `https://ehdwumyvvxjmzatwkrhu.supabase.co/functions/v1/send-review-confirmation`
- Error: `https://ehdwumyvvxjmzatwkrhu.supabase.co/functions/v1/send-failure-notification`

**Dashboard Supabase:**
- Functions: https://supabase.com/dashboard/project/ehdwumyvvxjmzatwkrhu/functions

**Configuración de variables:**
- `PUBLIC_SUPABASE_URL`: URL del proyecto Supabase
- `PUBLIC_SUPABASE_ANON_KEY`: Clave pública para autenticación
- `RESEND_API_KEY`: Clave secreta para enviar emails

---

## 🧪 Cómo Probar

### Prueba Manual en la App:
1. Ir a tu app local: `http://localhost:4321`
2. Navegar a una página de reseña
3. Llenar formulario completo
4. Presionar "Enviar"
5. Verificar console logs
6. Verificar email recibido

### Prueba con cURL:
```bash
curl -i --location --request POST \
'https://ehdwumyvvxjmzatwkrhu.supabase.co/functions/v1/send-review-confirmation' \
--header 'Authorization: Bearer [TU_ANON_KEY]' \
--header 'Content-Type: application/json' \
--data '{
  "userEmail": "tu@email.com",
  "userName": "Tu Nombre",
  "doctorFullName": "Dr. García López",
  "reviewText": "Excelente atención médica",
  "submissionDate": "26/09/2025 11:45"
}'
```

---

## 📝 Notas Importantes

1. **Emails no bloquean el flujo**: Si falla el envío de email, la reseña igual se guarda
2. **Manejo de errores**: Cada función tiene try/catch para errores internos
3. **Logging**: Console.log para debugging en producción
4. **Variables de entorno**: Todas las claves sensibles están en variables de entorno
5. **CORS**: Configurado para permitir requests desde cualquier origen (desarrollo)

---

## 🚀 Próximos Pasos (Futuras Mejoras)

1. **Dominio personalizado**: Verificar `findrit.com` en Resend
2. **Templates de email**: Crear templates más elaborados
3. **Retry mechanism**: Reintentar envío de emails si fallan
4. **Rate limiting**: Limitar cantidad de emails por usuario
5. **Analytics**: Tracking de emails abiertos/clicks
6. **Localización**: Emails en diferentes idiomas

---

## 🎉 Estado Final

**✅ Sistema Completamente Funcional**
- Emails de confirmación y error funcionando perfectamente
- Nombres reales de doctores en los emails (no "Doctor" genérico)
- CORS configurado correctamente
- Variables de entorno configuradas
- Edge Functions desplegadas y operativas
- Frontend integrado con las funciones
- Documentación completa actualizada

**📧 Emails Enviados Exitosamente:**
- Confirmación: "Tu reseña sobre Dr. [Nombre Real] ha sido enviada exitosamente"
- Error: "No pudimos procesar tu reseña sobre Dr. [Nombre Real]"

**🔗 URLs Funcionales:**
- `https://ehdwumyvvxjmzatwkrhu.supabase.co/functions/v1/send-review-confirmation`
- `https://ehdwumyvvxjmzatwkrhu.supabase.co/functions/v1/send-failure-notification`

---

*Documento creado: 26/09/2025*
*Última actualización: 26/09/2025*
*Estado: Sistema completamente funcional ✅*
*Autor: Configuración paso a paso de sistema de emails para reseñas médicas*