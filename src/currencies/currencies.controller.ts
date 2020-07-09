import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Currency } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

@Crud({
  model: {
    type: Currency
  }
})

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController implements CrudController<Currency>{
  constructor(public readonly service: CurrenciesService) {
  }
}
