import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomeTaxApiModule } from './coremodels/income_tax_api/income_tax_api.module';
import { PaymentModule } from './coremodels/payment/payment.module';
import { CalculatorsModule } from './coremodels/calculators/calculators.module';
import { MarketDataModule } from './coremodels/market-data/market-data.module';

@Module({
  imports: [IncomeTaxApiModule, PaymentModule, CalculatorsModule, MarketDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
