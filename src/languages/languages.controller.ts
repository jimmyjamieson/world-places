import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Language } from './languages.entity';
import { LanguagesService } from './languages.service';

@Crud({
  model: {
    type: Language
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController implements CrudController<Language>{
  constructor(public readonly service: LanguagesService) {
  }
}
