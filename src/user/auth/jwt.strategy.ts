import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
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
      secretOrKey: configService.get("JWT_SECRET_KEY"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { _id } = payload;
    const user: User = await this.userService.getUserById(_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
