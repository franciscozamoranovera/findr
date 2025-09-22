# Arquitectura del Sistema

## Autenticación y Autorización

### Opciones de Implementación

El sistema de autenticación puede implementarse usando diferentes enfoques según los requisitos de seguridad y experiencia de usuario:

#### Opción A: Server-Side Rendering (SSR) Completo
**🔐 Máxima Seguridad**

**Servidor (SSR):**
- Middleware lee cookies/headers de autenticación
- Verifica sesión en cada request
- Redirige antes de servir la página
- `isAuthenticated` se determina en servidor

**Cliente (Browser):**
- Recibe página ya autorizada
- AuthProvider sincroniza estado del servidor
- No hay ventana de contenido no autorizado

**Pros:**
- Seguridad máxima (JS deshabilitado = sin acceso)
- SEO optimizado para contenido protegido
- No hay flash de contenido no autorizado

**Contras:**
- Más complejo de implementar
- Requiere configuración SSR específica
- Mayor carga en servidor

---

#### Opción B: Híbrida Cliente-Side (IMPLEMENTACIÓN ACTUAL)
**⚖️ Balance Seguridad/Performance**

**Servidor (SSR):**
- No lee localStorage/sessionStorage (no disponible en servidor)
- Rutas protegidas NO están en middleware
- Sirve páginas sin verificar autenticación
- `isAuthenticated` = `undefined` en servidor

**Cliente (Browser):**
- AuthProvider lee localStorage al hidratarse
- `isAuthenticated: true` **solo existe en el cliente**
- Protección ocurre después de que la página carga
- Redirección si no hay autenticación

**Flujo de Protección:**
```
1. Usuario → /review
2. Servidor sirve página HTML (sin verificar auth)
3. Cliente hidrata AuthProvider
4. AuthProvider lee localStorage
5. Si no auth → redirige a /login
6. Si auth → muestra contenido
```

**Pros:**
- Implementación más simple
- Mejor performance inicial
- Funciona bien con hidratación de Astro

**Contras:**
- Vulnerabilidad si JS está deshabilitado
- Flash momentáneo de contenido protegido
- Auth state no disponible en servidor

---

#### Opción C: Cliente-Side Completo
**🚀 Máxima Performance**

**Servidor (SSR):**
- Sin verificación de autenticación
- Todas las rutas son públicas
- Mínima lógica de servidor

**Cliente (Browser):**
- Todo el manejo de autenticación
- Protección por componentes
- Estado completamente client-side

**Pros:**
- Máxima simplicidad en servidor
- Desarrollo más rápido
- Ideal para SPAs

**Contras:**
- Sin protección si JS deshabilitado
- Posible exposición de datos sensibles
- SEO limitado para contenido protegido

---

### Implementación Actual

**Estado:** Opción B (Híbrida Cliente-Side)

**Configuración:**
- `src/middleware.js`: `/review` comentado (no protegido en servidor)
- `src/components/reviewForm/ReviewForm.jsx`: Protección client-side
- `src/layouts/Layout.astro`: AuthWrapper global con `client:load`

**Archivos Clave:**
```
src/
├── middleware.js                 # Protección SSR (rutas comentadas)
├── components/api/supabase/
│   ├── AuthProvider.jsx         # Context de autenticación
│   ├── AuthWrapper.jsx          # HOCs y wrappers
│   └── supabase.js              # Cliente Supabase
└── components/reviewForm/
    ├── ReviewForm.jsx           # Protección híbrida
    └── buttons/progressBar/
        └── ReviewButton.jsx     # Detección de auth
```

**Flujo de Datos:**
```
Layout.astro (AuthWrapper client:load)
    ↓
AuthProvider (lee localStorage)
    ↓
useAuth() hook en componentes
    ↓
Protección client-side en ReviewForm
```

### Consideraciones de Seguridad

**⚠️ Importante:** En la implementación actual (Opción B):
- Usuarios con JS deshabilitado pueden ver formularios protegidos
- La validación real debe ocurrir en el servidor al enviar datos
- El client-side auth es UX, no seguridad real

**Recomendaciones:**
- Validar autenticación en APIs del servidor
- Implementar rate limiting
- Logs de acceso a rutas protegidas
- Considerar migrar a Opción A para contenido sensible

---

## Sistema de Autenticación: Guía Completa para Desarrolladores

### Resumen Ejecutivo

El sistema de autenticación utiliza **Supabase** como backend de autenticación con **React Context** para el manejo de estado en el frontend. La implementación sigue un patrón híbrido donde la verificación inicial ocurre en el cliente, con un sistema de fallback para garantizar compatibilidad con Astro.

### Componentes del Sistema de Autenticación

#### 1. **Cliente Supabase** (`src/components/api/supabase/supabase.js`)
**Propósito:** Configuración y cliente principal para todas las operaciones de autenticación.

**Funcionalidades:**
- Cliente Supabase configurado con persistencia en localStorage
- Configuración de refresh automático de tokens
- Detección automática de sesiones en URLs (magic links)
- Configuración de storage personalizada para compatibilidad con Astro

**Configuración Clave:**
```javascript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,        // Renueva tokens automáticamente
        persistSession: true,          // Persiste sesiones en storage
        detectSessionInUrl: true,      // Detecta magic links
        storage: window.localStorage,  // Usa localStorage explícitamente
        storageKey: 'findr-supabase-auth'
    }
})
```

**Interacciones:**
- Usado por AuthProvider para operaciones de auth
- Usado por middleware para verificación en servidor
- Usado por componentes que necesitan verificación directa

---

#### 2. **AuthProvider** (`src/components/api/supabase/AuthProvider.jsx`)
**Propósito:** Context Provider que maneja el estado global de autenticación en React.

**Estado Manejado:**
```javascript
{
    user: null | UserObject,      // Usuario actual
    session: null | SessionObject, // Sesión actual
    loading: boolean,             // Estado de carga inicial
    isAuthenticated: boolean      // Helper para verificar auth
}
```

**Funcionalidades Principales:**

1. **Inicialización de Sesión:**
   ```javascript
   // Al cargar, verifica si hay sesión activa
   const { data: { session } } = await supabase.auth.getSession()
   ```

2. **Listener de Cambios de Estado:**
   ```javascript
   supabase.auth.onAuthStateChange((event, session) => {
       // Maneja SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, etc.
   })
   ```

3. **Storage Events para Cross-Tab Sync:**
   ```javascript
   window.addEventListener('storage', (event) => {
       // Detecta cambios de auth en otras pestañas
   })
   ```

4. **Redirección Post-Login:**
   ```javascript
   // Maneja redirección después de magic link
   const savedRedirectUrl = localStorage.getItem('findr_redirect_after_login')
   ```

**Interacciones:**
- Envuelve toda la aplicación desde Layout.astro
- Provee estado a través del hook `useAuth()`
- Escucha cambios de Supabase y actualiza estado React

---

#### 3. **AuthWrapper** (`src/components/api/supabase/AuthWrapper.jsx`)
**Propósito:** Componentes wrapper y HOCs para diferentes casos de uso de autenticación.

**Componentes Incluidos:**

1. **AuthWrapper:** Wrapper básico que solo provee el contexto
2. **withAuth:** HOC para componentes individuales
3. **AuthenticatedWrapper:** Wrapper con protección automática
4. **AuthGuard:** Componente que verifica auth y redirige

**Uso en el Proyecto:**
```javascript
// En Layout.astro
<AuthWrapper client:load>
    <slot />
</AuthWrapper>
```

---

#### 4. **ReviewAuthGuard** (`src/components/reviewForm/ReviewAuthGuard.jsx`)
**Propósito:** Protección específica para rutas de review con sistema de fallback híbrido.

**Características Únicas:**

1. **Verificación Híbrida:**
   ```javascript
   // Intenta usar contexto React
   const { user, loading } = useAuth()

   // Fallback con verificación directa si contexto no responde
   const directCheck = async () => {
       const { data: { session } } = await supabase.auth.getSession()
   }
   ```

2. **Timeout Inteligente:**
   ```javascript
   // Si contexto no responde en 1 segundo, usa verificación directa
   setTimeout(() => {
       if (loading) directCheck()
   }, 1000)
   ```

3. **Estados Finales:**
   ```javascript
   // Combina contexto y verificación directa
   const finalUser = directAuth.loading === false ? directAuth.user : user
   const finalLoading = directAuth.loading === false ? directAuth.loading : loading
   ```

**Por qué es Necesario:**
- Astro puede crear contextos React separados entre archivos .astro
- Garantiza que la protección funcione incluso si hay problemas de hidratación
- Mantiene UX fluida con fallback rápido

---

#### 5. **LoginForm** (`src/components/reviewForm/LoginForm.jsx`)
**Propósito:** Formulario de login que maneja magic links y redirecciones.

**Funcionalidades:**

1. **Verificación de Sesión Existente:**
   ```javascript
   useEffect(() => {
       const checkUserAuth = async () => {
           const { data: { session } } = await supabase.auth.getSession()
           if (session) {
               // Redirige si ya está logueado
               window.location.href = redirectUrl
           }
       }
   }, [])
   ```

2. **Magic Link Generation:**
   ```javascript
   const result = await supabase.auth.signInWithOtp({
       email,
       options: { redirectTo: baseUrl }
   })
   ```

3. **Manejo de Redirección:**
   ```javascript
   // Guarda URL destino para después del login
   if (redirectUrl) {
       localStorage.setItem('findr_redirect_after_login', redirectUrl)
   }
   ```

---

#### 6. **ReviewButton** (`src/components/reviewForm/buttons/progressBar/ReviewButton.jsx`)
**Propósito:** Botón inteligente que adapta su comportamiento según el estado de autenticación.

**Estados del Botón:**

1. **Loading:** "Verificando...."
   ```javascript
   if (loading) return <button disabled>Verificando....</button>
   ```

2. **No Autenticado:** "Iniciar sesión para evaluar..."
   ```javascript
   if (!isAuthenticated) {
       const handleLoginRedirect = () => {
           const loginUrl = `/login?redirect=${encodeURIComponent(fullCurrentPath)}`
       }
   }
   ```

3. **Autenticado:** "Dejar Review como {email}"
   ```javascript
   const handleStartReview = () => {
       window.location.href = `/review?id=${drId}&from=${currentPage}`
   }
   ```

---

#### 7. **Middleware** (`src/middleware.js`)
**Propósito:** Protección a nivel de servidor para rutas específicas (actualmente deshabilitado para /review).

**Configuración Actual:**
```javascript
const protectedRoutes = [
    // '/review',      // DESHABILITADO para evitar conflictos
    '/userprofile',
    '/drprofile'
]
```

**Función cuando Activo:**
```javascript
const session = await checkAuth()
if (isProtectedRoute && !session) {
    return context.redirect(`/login?redirect=${fullPath}`)
}
```

---

### Flujo Completo de Autenticación

#### 1. **Inicialización de la Aplicación:**
```
Layout.astro carga
    ↓
AuthWrapper se hidrata con client:load
    ↓
AuthProvider se inicializa
    ↓
supabase.auth.getSession() verifica localStorage
    ↓
Estado inicial establecido (user, loading, session)
```

#### 2. **Acceso a Ruta Protegida (Cross-Tab):**
```
Nueva pestaña → /review
    ↓
ReviewAuthGuard se renderiza
    ↓
useAuth() intenta leer contexto
    ↓
Si contexto no responde en 1s → verificación directa
    ↓
supabase.auth.getSession() lee localStorage
    ↓
Usuario autenticado → muestra contenido
```

#### 3. **Proceso de Login:**
```
Usuario visita /login?redirect=/review
    ↓
LoginForm verifica si ya está logueado
    ↓
Si no → muestra formulario de email
    ↓
Usuario ingresa email → supabase.auth.signInWithOtp()
    ↓
Magic link enviado al email
    ↓
Usuario hace click en magic link
    ↓
Supabase procesa autenticación
    ↓
AuthProvider detecta SIGNED_IN event
    ↓
Lee findr_redirect_after_login de localStorage
    ↓
Redirige a la página original (/review)
```

#### 4. **Sincronización Cross-Tab:**
```
Pestaña A: Usuario se loguea
    ↓
Supabase guarda en localStorage
    ↓
Storage Event disparado
    ↓
Pestaña B: AuthProvider escucha storage event
    ↓
Re-verifica sesión con supabase.auth.getSession()
    ↓
Actualiza estado React automáticamente
```

### Patrones de Uso Comunes

#### Para Proteger un Componente:
```javascript
import { useAuth } from "@/components/api/supabase/AuthProvider"

const MyComponent = () => {
    const { user, loading, isAuthenticated } = useAuth()

    if (loading) return <div>Cargando...</div>
    if (!isAuthenticated) return <div>Necesitas login</div>

    return <div>Contenido protegido para {user.email}</div>
}
```

#### Para Verificación Directa:
```javascript
import { supabase } from "@/components/api/supabase/supabase"

const checkDirectAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user || null
}
```

#### Para Logout:
```javascript
const { signOut } = useAuth()
await signOut()
```

### Consideraciones de Debugging

**Logs Importantes a Monitorear:**
- `🏗️ AuthProvider component rendering...`
- `📦 Respuesta getSession:`
- `🔄 Cambio de auth detectado:`
- `🔄 ReviewAuthGuard RENDER:`
- `⚡ Contexto no responde, usando verificación directa`

**Problemas Comunes:**
1. **Multiple GoTrueClient instances:** Verificar que solo se usa `supabase`, no `client`
2. **Loading infinito:** ReviewAuthGuard usa verificación directa como fallback
3. **Cross-tab no funciona:** Verificar que Storage Events están activos
4. **Magic links no redirigen:** Verificar URLs en dashboard de Supabase

### Configuración de Desarrollo

**Variables de Entorno Requeridas:**
```
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Configuración Supabase Dashboard:**
- Redirect URLs: `http://localhost:4321/**` y `http://IP:4321/**`
- Email Templates: Configurar magic link templates
- RLS Policies: Configurar según necesidades de seguridad

Esta arquitectura proporciona un sistema robusto de autenticación que balancea seguridad, performance y experiencia de usuario, con fallbacks para garantizar funcionamiento en el entorno específico de Astro.