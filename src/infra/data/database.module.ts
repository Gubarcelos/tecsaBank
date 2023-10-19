import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig}),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}