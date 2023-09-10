import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "./aws-config"

export const awsDeleteImg = async (imgName: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: imgName,
  })
  await s3.send(command)
}