import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

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
    customerId: string
  ) {
    // return this.stripe.charges.create({
    //   amount,
    //   customer: customerId,
    //   source: paymentMethodId,
    //   currency: this.configService.get("STRIPE_CURRENCY"),
    // });
    return await this.stripe.charges.create({
      amount,
      currency: this.configService.get("STRIPE_CURRENCY"),
      customer: customerId,
      source: paymentMethodId,
    });
  }
}
