import { Module } from '@nestjs/common';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region])
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService]
})
export class RegionsModule {}
