import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentChargeDto } from './dto/create-payment-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2023-10-16' },
  );
  private readonly logger = new Logger(PaymentsService.name);
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ card, amount, email }: CreatePaymentChargeDto) {
    try {
      // const paymentMethod = await this.stripe.paymentMethods.create({
      //   type:"card"
      //   card,
      // });
      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: 'pm_card_visa',
        amount: amount * 100,
        confirm: true,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });

      this.notificationsService.emit('notify_email', {
        email,
        text: `Your payment of ${amount * 100} has completed successfully.`,
      });

      return paymentIntent;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Failure payments');
    }
  }
}
