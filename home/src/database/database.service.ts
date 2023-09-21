import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 32, // 원하는 연결 수 설정
    });
  }

  async getConnection() {
    return await this.pool.getConnection();
  }
}