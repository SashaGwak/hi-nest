import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { BaeleeModule } from './baelee/baelee.module';
import { GraphqlModule } from './graphql/graphql.module';
import { BaeleeResover } from './baelee/baelee.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, BaeleeModule, GraphqlModule, AuthModule, UsersModule],
  controllers: [],
  providers: [AppService, DatabaseService, BaeleeResover],
})
export class AppModule {}
