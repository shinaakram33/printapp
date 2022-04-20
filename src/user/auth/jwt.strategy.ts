import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { User } from "../user.model";
import { UserService } from "../user.service";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
    super({
      secretOrPrivateKey: configService.get("JWT_SECRET_KEY"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // console.log("in validate ", this.configService.get("JWT_SECRET_KEY"));
    const { _id } = payload;
    const user: User = await this.userService.getUserById(_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
