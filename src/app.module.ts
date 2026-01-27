import { Module } from '@nestjs/common';
import { QueriesModule } from './queries/queries.module';
import { ConfigModule } from '@nestjs/config';
import { KnexService } from './database/knex.service';
import { KnexModule } from './database/knex.module';

@Module({
  imports: [
    QueriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    KnexModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
