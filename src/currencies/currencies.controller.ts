import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CurrencyEntity } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

@Crud({
  model: {
    type: CurrencyEntity
  }
})

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController implements CrudController<CurrencyEntity>{
  constructor(public readonly service: CurrenciesService) {
  }
}
