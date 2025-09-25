# AuthProvider Context Propagation Issue

## 🚨 **Problema Identificado**

El `AuthProvider` no está propagando correctamente el contexto de usuario a los componentes en páginas específicas como `/review`.

## 📋 **Síntomas Observados**

### ✅ **Lo que SÍ funciona:**
- `AuthProvider` obtiene correctamente los datos del usuario internamente
- Los console.logs en `AuthProvider.jsx` muestran el user completo con email y metadata
- Llamadas directas a `supabase.auth.getSession()` en cualquier componente funcionan correctamente
- `ReviewAuthGuard` puede acceder al user mediante llamada directa

### ❌ **Lo que NO funciona:**
- `useAuth()` en `ReviewForm` devuelve `user: undefined`
- El contexto no se propaga desde `Layout.astro` hacia componentes en `/review`
- `user?.user_metadata?.full_name` siempre es `undefined` via contexto

## 🔍 **Evidencia de Logs**

```javascript
// AuthProvider (FUNCIONA - muestra datos)
AuthProvider Context: {
    user: 'franciscozamoranovera@gmail.com',
    name: 'Francisco'
}

// ReviewForm via useAuth() (NO FUNCIONA - undefined)
🔍 USER COMPLETO: undefined
📧 Email: undefined
👤 Nombre: undefined

// ReviewAuthGuard via llamada directa (FUNCIONA - muestra datos)
USER_USER: "Francisco"
contextUser: "no context user"  // ← Confirma que useAuth() no funciona
```

## 🎯 **Lo que DEBERÍA pasar**

### **Flujo esperado:**
```
Layout.astro
    ↓ (AuthWrapper client:load)
AuthProvider (detecta user, actualiza contexto)
    ↓ (Context propagation)
review.astro
    ↓
ReviewAuthGuard (usa useAuth() del contexto)
    ↓
ReviewForm (usa useAuth() del contexto)
    ↓
WrittenReview (recibe user via props)
```

### **Comportamiento esperado:**
- `useAuth()` debería devolver el objeto `user` completo
- `user.email` debería ser accesible
- `user.user_metadata.full_name` debería contener "Francisco"

## 🧪 **Hipótesis del Problema**

### **Hipótesis A: Context Isolation entre archivos .astro**
**Descripción:** Astro puede estar creando contextos React separados entre `Layout.astro` y `review.astro`, impidiendo la propagación del contexto.

**Evidencia:**
- AuthProvider funciona en componentes del mismo archivo .astro
- Falla específicamente en componentes de `/review`
- El context se "pierde" entre boundaries de archivos .astro

**Probabilidad:** Alta ⭐⭐⭐⭐⭐

### **Hipótesis B: Timing de hidratación**
**Descripción:** Los componentes en `/review` se renderizan antes que AuthProvider complete su inicialización.

**Evidencia:**
- AuthProvider tiene `loading: true` inicialmente
- Los componentes podrían renderizarse durante el estado de loading

**Probabilidad:** Media ⭐⭐⭐

### **Hipótesis C: Client-side rendering mismatch**
**Descripción:** Diferencias en cómo Astro maneja `client:load` entre Layout y páginas específicas.

**Evidencia:**
- AuthWrapper usa `client:load` en Layout
- Componentes en review.astro podrían tener diferente estrategia de hidratación

**Probabilidad:** Media ⭐⭐⭐

### **Hipótesis D: Hook mal implementado**
**Descripción:** El hook `useAuth()` no está funcionando correctamente.

**Evidencia:**
- El hook existe y no arroja errores
- La implementación parece correcta

**Probabilidad:** Baja ⭐⭐

## 🔧 **Soluciones Propuestas**

### **Solución 1: Llamada directa (TEMPORAL)**
```javascript
// En cada componente que necesite user data
const [user, setUser] = useState(null)

useEffect(() => {
    const getUser = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
    }
    getUser()
}, [])
```

**Pros:** ✅ Funciona inmediatamente, fácil implementar
**Contras:** ❌ Duplicación de código, múltiples llamadas API

### **Solución 2: Context en ReviewAuthGuard (RECOMENDADA)**
```javascript
// Crear contexto específico en ReviewAuthGuard
const ReviewUserContext = createContext(null)

// ReviewAuthGuard ya obtiene el user correctamente
return (
    <ReviewUserContext.Provider value={finalUser}>
        {children}
    </ReviewUserContext.Provider>
)
```

**Pros:** ✅ Reutilizable, performance, limpio
**Contras:** ❌ Contexto adicional

### **Solución 3: Arreglar AuthProvider**
Investigar la causa raíz del problema de propagación de contexto.

**Pros:** ✅ Solución definitiva
**Contras:** ❌ Requiere investigación profunda, puede ser complejo

## 📊 **Recomendación**

**Implementar Solución 2** (Context en ReviewAuthGuard):
1. Ya sabemos que ReviewAuthGuard obtiene el user correctamente
2. Es escalable para futuros componentes
3. Mantiene buena performance
4. No requiere arreglar la arquitectura completa de Astro

**Plan de contingencia:** Si Solución 2 es compleja, usar Solución 1 temporalmente.

## 🚧 **Estado Actual**

- ✅ Problema diagnosticado completamente
- ✅ Hipótesis formuladas
- ⏳ Esperando decisión de implementación
- ❌ AuthProvider sigue sin funcionar en /review

## 📝 **Notas de Debugging**

Para reproducir el problema:
1. Ir a `/review`
2. Abrir DevTools Console
3. Verificar logs de AuthProvider vs useAuth() en ReviewForm
4. Confirmar que AuthProvider muestra datos pero useAuth() devuelve undefined

---

**Archivo creado:** `2025-09-24`
**Estado:** Problema activo, esperando implementación de solución