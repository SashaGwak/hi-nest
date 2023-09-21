import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
