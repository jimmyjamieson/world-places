import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { City } from './cities.entity';
import { CitiesService } from './cities.service';

@Crud({
  model: {
    type: City
  },
})

@ApiTags('Cities')
@Controller('cities')
export class CitiesController implements CrudController<City>{
  constructor(public readonly service: CitiesService) {
  }
}
