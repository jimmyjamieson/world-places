import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Region } from './region.entity';
import { RegionsService } from './regions.service';

@Crud({
  model: {
    type: Region
  }
})

@ApiTags('Regions')
@Controller('regions')
export class RegionsController implements CrudController<Region>{
  constructor(public readonly service: RegionsService) {
  }
}
