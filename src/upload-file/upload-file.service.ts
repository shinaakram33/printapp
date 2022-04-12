import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class UploadFileService {
  constructor(private configService: ConfigService) {}

  AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async fileUpload(file: any): Promise<any> {
    const { originalname } = file;
    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET_NAME,
      originalname,
      file.mimetype
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: "public-read",
      ContentType: mimetype,
      ContentDisposition: "inline",
      CreateBucketConfiguration: {
        LocationConstraint: "us-west-2",
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
