import { Module } from '@nestjs/common';
import { IncomeTaxApiService } from './income_tax_api.service';
import { IncomeTaxApiController } from './income_tax_api.controller';

@Module({
  controllers: [IncomeTaxApiController],
  providers: [IncomeTaxApiService],
})
export class IncomeTaxApiModule {}
