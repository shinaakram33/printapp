import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model, Schema as MongooseSchema } from "mongoose";
import { User } from "../user/user.model";
import { Activity, ActivityDocument } from "./activity.model";
import { AddActivityDto } from "./dto/add-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: Model<ActivityDocument>,
    private configService: ConfigService
  ) {}

  async addActivity(addAcivityDto: AddActivityDto) {
    try {
      return await this.activityModel.create(addAcivityDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteActivity(user: User, activityId: String) {
    try {
      var activity = await this.activityModel.findById(activityId);
      if (!activity) {
        throw new NotFoundException("No promo code of this Id exists");
      }
      return await this.activityModel.findByIdAndDelete(activityId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateActivity(
    updateActivityDto: UpdateActivityDto,
    activityId: String
  ) {
    try {
      var activity = await this.activityModel.findById(activityId);
      if (!activity) {
        throw new NotFoundException("No Acivity of this Id exists");
      }
      return await this.activityModel.findByIdAndUpdate(
        activityId,
        updateActivityDto,
        {
          new: true,
        }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllActivity(user: User) {
    try {
      return await this.activityModel.find({ userId: user._id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
