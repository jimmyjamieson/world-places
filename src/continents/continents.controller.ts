import { Controller } from '@nestjs/common';
import { ContinentsService } from './continents.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ContinentEntity } from './continent.entity';

@Crud({
  model: {
    type: ContinentEntity
  }
})
@Controller('continents')
export class ContinentsController implements CrudController<ContinentEntity>{
  constructor(public readonly service: ContinentsService) {
  }
}
