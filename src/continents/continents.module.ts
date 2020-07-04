import { Module } from '@nestjs/common';
import { ContinentsController } from './continents.controller';

@Module({
  controllers: [ContinentsController]
})
export class ContinentsModule {}
