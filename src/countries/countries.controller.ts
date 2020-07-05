import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CountryEntity } from './country.entity';
import { CountriesService } from './countries.service';

@Crud({
  model: {
    type: CountryEntity
  }
})

@ApiTags('Countries')
@Controller('countries')
export class CountriesController implements CrudController<CountryEntity>{
  constructor(public readonly service: CountriesService) {
  }
}
