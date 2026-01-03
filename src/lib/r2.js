import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY
  }
})

export async function uploadToR2(file, key) {
  const buffer = Buffer.from(await file.arrayBuffer())

  await r2.send(
    new PutObjectCommand({
      Bucket: "doctors-storage",
      Key: key,
      Body: buffer,
      ContentType: file.type
    })
  )

  return `https://medicos-cdn.findritchile.workers.dev/${key}`
}