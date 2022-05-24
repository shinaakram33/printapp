import {
  Controller,
  UseGuards,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "src/user/user.model";
import { ActivityService } from "./activity.service";
import { AddActivityDto } from "./dto/add-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

@Controller("activity")
@ApiTags("Activity Controller")
export class ActivityController {
  constructor(private activityService: ActivityService) {}
  @ApiBearerAuth()
  @Post("/add")
  @UseGuards(AuthGuard("jwt"))
  async addPromocode(
    @GetUser() user: User,
    @Body() addActivityDto: AddActivityDto
  ): Promise<any> {
    return await this.activityService.addActivity(addActivityDto);
  }

  @ApiBearerAuth()
  @Delete("/delete/:activityId")
  @UseGuards(AuthGuard("jwt"))
  async deleteActivity(
    @GetUser() user: User,
    @Param("activityId") promoId: String
  ): Promise<any> {
    return await this.activityService.deleteActivity(user, promoId);
  }

  @ApiBearerAuth()
  @Patch("/update/:activityId")
  @UseGuards(AuthGuard("jwt"))
  async updateActivity(
    @GetUser() user: User,
    @Param("activityId") activityId: String,
    @Body() UpdateActivityDto: UpdateActivityDto
  ): Promise<any> {
    return await this.activityService.updateActivity(
      UpdateActivityDto,
      activityId
    );
  }

  @ApiBearerAuth()
  @Post("/findall")
  @UseGuards(AuthGuard("jwt"))
  async addProduct(@GetUser() user: User): Promise<any> {
    return await this.activityService.getAllActivity(user);
  }
}
