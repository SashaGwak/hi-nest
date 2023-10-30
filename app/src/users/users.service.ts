import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2';;

@Injectable()
export class UsersService {
    constructor(private databaseService: DatabaseService) {
    }

    async findUser(email: string): Promise<User | undefined> {
        const db = await this.databaseService.getConnection();

        try {
            const [rows, fields] = await db.query<RowDataPacket[]>(
                'SELECT * FROM app_admin WHERE email = ?', [email]
            );

            if (rows && rows.length > 0) {
                const user: User = {
                    admin_id: rows[0].admin_id,
                    email: rows[0].email,
                    password: rows[0].password,
                    salt : rows[0].salt,
                    name: rows[0].name,
                    is_god: rows[0].is_god,
                    fail_count: rows[0].fail_count,
                    is_possible : rows[0].is_possible,
                    refresh_token : rows[0].refresh_token,
                };
                return user;
            }

            // 결과가 없으면 undefined 반환
            return undefined;
        } finally {
            db.release();
        }
    }

    async updateToken(ref_token:string, admin_id:number): Promise<boolean> {
        const db = await this.databaseService.getConnection();

        try {
            const [rows, field] = await db.query<ResultSetHeader>(
                `UPDATE app_admin SET refresh_token = ? WHERE admin_id = ?`, [ref_token, admin_id]
            );

            if (rows && rows?.affectedRows === 1) {
                return true;
            } else {
                return false;
            }

        } catch (err) {
            console.error('Failed to update token:', err);
            return false;

        } finally {
            db.release();
        }
    }

    // fail count 필요
}