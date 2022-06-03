import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/user.model";
import Stripe from "stripe";
import { AddStripeCardDto } from "./dto/add-card.dto";

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    user: User
  ): Promise<Stripe.Charge> {
    // const token = await this.stripe.tokens.create(
    //   {
    //     card: {
    //       number: "4242424242424242",
    //       exp_month: "5",
    //       exp_year: "2023",
    //       cvc: "314",
    //     },
    //   },
    //   { timeout: 30000 }
    // );

    if (!user.payment) {
      if (!paymentMethodId) throw new BadRequestException("fail");
      const card = await this.stripe.customers.createSource(
        user.stripeCustomerId,
        {
          source: paymentMethodId,
        }
      );

      const charge = await this.stripe.charges.create({
        amount,
        currency: this.configService.get("STRIPE_CURRENCY"),
        customer: user.stripeCustomerId,
        source: card.id,
      });
      if (charge.status == "succeeded") {
        user.payment = true;
        return charge;
      } else throw new BadRequestException("Charge not Created");
    } else {
      return await this.stripe.charges.create({
        amount,
        currency: this.configService.get("STRIPE_CURRENCY"),
        customer: user.stripeCustomerId,
      });
    }
  }

  // public async addCard(addCardDto: AddStripeCardDto, user: User) {
  //   return await this.stripe.customers.createSource(user.stripeCustomerId, {
  //     source: addCardDto.paymentMethodId,
  //   });
  // }

  public async getAllCards(user: User) {
    try {
      return await this.stripe.customers.listSources(user.stripeCustomerId, {
        object: "card",
        limit: 100,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
