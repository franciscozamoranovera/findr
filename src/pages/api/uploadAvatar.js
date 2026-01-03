/* 
    Endpoint unificado que puede:
    1. Recibir FormData (file + doctorId) → Sube a R2 y guarda en Supabase
    2. Recibir JSON (url + doctorId) → Solo guarda en Supabase
*/

import { updateDoctorAvatar } from "../../components/backend/updateDoctorAvatar";

export async function POST(context) {
    console.log('=== UPLOAD AVATAR ENDPOINT ===')
    
    try {
        // Detectar qué tipo de contenido recibimos
        const contentType = context.request.headers.get('content-type') || ''
        
        // ========================================
        // CASO 1: FormData (archivo completo)
        // ========================================
        if (contentType.includes('multipart/form-data')) {
            console.log('📦 Recibiendo FormData (archivo)')
            
            const formData = await context.request.formData()
            const file = formData.get('file')
            const doctorId = formData.get('doctorId')
            
            console.log('📄 Doctor ID:', doctorId)
            console.log('📁 File:', file?.name, file?.type, file?.size)
            
            if (!file || !doctorId) {
                return new Response(JSON.stringify({ 
                    error: "Missing file or doctorId" 
                }), { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            
            // Subir al worker
            console.log('📤 Subiendo a Worker/R2...')
            const workerFormData = new FormData()
            workerFormData.append('file', file)
            workerFormData.append('doctor_id', doctorId)
            workerFormData.append('type','avatar')
            
            const workerResponse = await fetch('https://medicos-cdn.findritchile.workers.dev', {
                method: 'POST',
                body: workerFormData
            })
            
            if (!workerResponse.ok) {
                const errorText = await workerResponse.text()
                console.error('❌ Error del Worker:', errorText)
                throw new Error(`Worker error: ${errorText}`)
            }
            
            const workerData = await workerResponse.json()
            const publicUrl = workerData.url
            
            if (!publicUrl) {
                throw new Error('Worker no devolvió URL')
            }
            
            console.log('✅ URL de R2:', publicUrl)
            
            // Guardar en Supabase
            console.log('💾 Guardando en Supabase...')
            await updateDoctorAvatar({
                doctorId,
                publicUrl
            })
            
            console.log('✅ Todo completado')
            
            return new Response(JSON.stringify({
                success: true,
                doctorId: doctorId,
                url: publicUrl,
                message: 'Avatar subido y guardado'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            })
        }
        
        // ========================================
        // CASO 2: JSON (solo URL)
        // ========================================
        else if (contentType.includes('application/json')) {
            console.log('📝 Recibiendo JSON (solo URL)')
            
            const body = await context.request.json()
            const { doctorId, url } = body
            
            console.log('📄 Doctor ID:', doctorId)
            console.log('🔗 URL:', url)
            
            if (!doctorId || !url) {
                return new Response(JSON.stringify({ 
                    error: "Missing doctorId or url" 
                }), { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            
            // Solo guardar en Supabase
            console.log('💾 Guardando en Supabase...')
            await updateDoctorAvatar({
                doctorId,
                publicUrl: url
            })
            
            console.log('✅ URL guardada')
            
            return new Response(JSON.stringify({ 
                success: true,
                message: 'URL guardada en Supabase'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            })
        }
        
        // ========================================
        // CASO 3: Content-Type no soportado
        // ========================================
        else {
            return new Response(JSON.stringify({ 
                error: "Unsupported Content-Type. Use multipart/form-data or application/json" 
            }), { 
                status: 415,
                headers: { 'Content-Type': 'application/json' }
            })
        }
        
    } catch (error) {
        console.error('❌ Error:', error)
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}



/* 
## Ahora tienes UN solo endpoint con 2 usos:

### **Uso 1: Subir archivo completo (Postman con form-data)**
```
POST http://localhost:4321/api/uploadAvatar

Body (form-data):
- file: [selecciona imagen]
- doctorId: "43489479-..."
```

### **Uso 2: Solo guardar URL (JSON)**
```
POST http://localhost:4321/api/uploadAvatar

Body (raw JSON):
{
  "doctorId": "43489479-...",
  "url": "https://cdn.findr.cl/..."
} */