import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  
  getHello(): string {
    return `API is running on PORT: ${this.config.get('PORT')}`;
  }
}
