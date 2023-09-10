import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./aws-config";

export const awsGetImg = async (imgName: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: imgName,
  })
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return url;
}