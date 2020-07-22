import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Region } from './region.entity';
import { RegionsService } from './regions.service';

@Crud({
  model: {
    type: Region
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    join: {
      country: {
        eager: true,
      },
      cities: {
        eager: true
      }
    },
  },
})

@ApiTags('Regions')
@Controller('regions')
export class RegionsController implements CrudController<Region>{
  constructor(public readonly service: RegionsService) {
  }
}
