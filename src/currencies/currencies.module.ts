import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './currencies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrencyEntity])
  ],
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  exports: [CurrenciesService]
})
export class CurrenciesModule {}
