// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

interface FailureData {
  userEmail: string;
  userName: string;
  doctorFullName: string;
  reviewText: string;
  errorMessage: string;
  attemptCount: number;
  lastAttemptDate: string;
}

// CORS headers para permitir requests desde el frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Check if request is POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const failureData: FailureData = await req.json();
    const { userEmail, userName, doctorFullName, reviewText, errorMessage, attemptCount, lastAttemptDate } = failureData;

    // Validate required fields
    if (!userEmail || !userName || !doctorFullName || !errorMessage) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userEmail, userName, doctorFullName, errorMessage' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Email service configuration error' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Prepare email content
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

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Tu reseña (guardada temporalmente):</h3>
          <p style="white-space: pre-wrap; color: #555;">${reviewText}</p>
        </div>

        <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #0c5460;">💡 ¿Qué puedes hacer?</h4>
          <ul style="color: #0c5460;">
            <li>Verifica tu conexión a internet</li>
            <li>Vuelve a intentar enviar la reseña más tarde</li>
            <li>Si el problema persiste, contáctanos a soporte@findrit.com</li>
          </ul>
        </div>

        <p style="color: #666; font-size: 14px;">
          <strong>Último intento:</strong> ${lastAttemptDate}<br>
          <strong>Número de intentos:</strong> ${attemptCount}
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="color: #888; font-size: 12px;">
          Notificación automática de FindrIt - Tu reseña está temporalmente guardada.
        </p>
      </div>
    `;

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FindrIt <onboarding@resend.dev>', // Using Resend's default domain
        to: [userEmail],
        subject: `❌ Problema al enviar reseña - ${doctorFullName}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errorData }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resendData = await resendResponse.json();
    console.log('Failure notification email sent successfully:', resendData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Failure notification email sent successfully',
        emailId: resendData.id
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error('Error in send-failure-notification function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-failure-notification' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
