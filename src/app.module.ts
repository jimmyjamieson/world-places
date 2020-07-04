import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContinentsModule } from './continents/continents.module';
import { CountriesModule } from './countries/countries.module';
import { RegionsModule } from './regions/regions.module';
import { CitiesModule } from './cities/cities.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    ContinentsModule,
    CountriesModule,
    RegionsModule,
    CitiesModule,
    CurrenciesModule,
    LanguagesModule,
    /*GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
