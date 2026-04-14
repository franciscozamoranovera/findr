export { renderers } from '../../renderers.mjs';

/* 
  not in use right now, replaced by uploadAvatar (local api: http://localhost:4321/api/uploadAvatar)
*/


const upload = {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 })
    }

    try {
      const formData = await request.formData();

      const file = formData.get("file");
      const doctorId = formData.get("doctor_id");
      const type = formData.get("type");

      if (!file || !doctorId || !type) {
        return Response.json({ error: "Missing fields" }, { status: 400 })
      }

      let key = "";

      if (type === "avatar") {
        key = `doctors/${doctorId}/profile/avatar.jpg`;
      }

      if (type === "document") {
        key = `doctors/${doctorId}/documents/${file.name}`;
      }

      if (!key) {
        return Response.json({ error: "Invalid type" }, { status: 400 })
      }

      await env.BUCKET.put(key, file, {
        httpMetadata: {
          contentType: file.type
        }
      });

      return Response.json({
        success: true,
        key,
        url: `https://medicos-cdn.findritchile.workers.dev/${key}`
      })


    } catch (error) {
      console.error(error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: upload
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
