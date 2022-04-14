import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UploadFileService } from "./upload-file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

@Controller("upload-file")
export class UploadFileController {
  constructor(
    private uploadFileService: UploadFileService,
    private configService: ConfigService
  ) {}

  @Post("/category-image")
  @UseInterceptors(FileInterceptor("image"))
  async uploadUserProfile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    return await this.uploadFileService.fileUpload(file);
  }
}
