import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { GraphqlModule } from './graphql/graphql.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [AuthModule, DatabaseModule, GraphqlModule],
  controllers: [],
  providers: [DatabaseService, AppResolver],
})
export class AppModule {}
