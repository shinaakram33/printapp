// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import Stripe from "stripe";

// @Injectable()
// export default class StripeService {
//   constructor(private configService: ConfigService, private stripe: Stripe) {
//     this.stripe = new Stripe(configService.get("STRIPE_SECRET_KEY"), {
//       apiVersion: "2020-08-27",
//     });
//   }

//   public async createCustomer(name: string, email: string) {
//     return this.stripe.customers.create({
//       name,
//       email,
//     });
//   }

//   public async charge(
//     amount: number,
//     paymentMethodId: string,
//     customerId: string
//   ) {
//     return this.stripe.paymentIntents.create({
//       amount,
//       customer: customerId,
//       payment_method: paymentMethodId,
//       currency: this.configService.get("STRIPE_CURRENCY"),
//       confirm: true,
//     });
//   }
// }
