import { Module } from '@nestjs/common';
import { ContinentsController } from './continents.controller';
import { ContinentsService } from './continents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContinentEntity } from './continent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContinentEntity])
  ],
  controllers: [ContinentsController],
  exports: [ContinentsService],
  providers: [ContinentsService]
})
export class ContinentsModule {}
