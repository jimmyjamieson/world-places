import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContinentsService } from './continents.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Continent } from './continent.entity';

@Crud({
  model: {
    type: Continent
  },
  query: {
    join: {
      countries: {
        eager: true,
      },
    },
  },
})

@ApiTags('Continents')
@Controller('continents')
export class ContinentsController implements CrudController<Continent>{
  constructor(public readonly service: ContinentsService) {
  }
}
