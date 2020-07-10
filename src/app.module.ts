import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { RegionsModule } from './regions/regions.module';
import { CitiesModule } from './cities/cities.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { LanguagesModule } from './languages/languages.module';
import { ImportModule } from './import/import.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db',
      entities: [__dirname + '/!**!/!*.entity{.ts,.js}'],
      synchronize: true,
    }),*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5000,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      dropSchema: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    CountriesModule,
    RegionsModule,
    CitiesModule,
    CurrenciesModule,
    LanguagesModule,
    ImportModule,
    ExportModule,
    /*GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
