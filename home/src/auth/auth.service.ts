import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
    constructor(private databaseService:DatabaseService) {
    }

    getHello(): string {
        return '반가와요';
    }

    // select문 실행
    async getAdmin() {
        const db = await this.databaseService.getConnection();
        try {
            // 여기에서 SQL 쿼리 실행
            const [rows, fields] = await db.query<RowDataPacket[]>('SELECT * FROM app_admin;');

            // rows 배열에서 admin_id 필드만 추출
            const adminIds = rows.map((row) => row.admin_id);

            return adminIds;
            // return rows;
        } finally {
            db.release(); // 연결 해제
        }
    }

    // 값 넘겨보기(조건 검색)
    async getUser(adminId:number) {
        const db = await this.databaseService.getConnection();
        try {
            // const [rows, fields] = await db.query<RowDataPacket[]>(`
            //     SELECT * FROM app_admin WHERE admin_id = ${adminId};
            // `);
            const [rows, fields] = await db.query<RowDataPacket[]>(`
                SELECT * FROM app_admin WHERE admin_id = ? AND is_possible = ?`,
                [adminId, 1]
            );

            if (rows.length > 0) {
                return rows[0];
            } else {
                return null; // 해당 adminId의 사용자가 없을 때
            }

        } finally {
            db.release(); // 연결 해제
        }
    } 

    // 트랜잭션 테스트
    async CreatePacking(data:any) {
        const db = await this.databaseService.getConnection();
        let transactionStarted = false; 

        try { 
            // 트랜잭션 시작
            await db.beginTransaction();
            transactionStarted = true;

            const one = await db.query<RowDataPacket[]>(`INSERT INTO app_ws_packing SET ?`, [data.packing]);
            const two = await db.query<RowDataPacket[]>(`INSERT INTO app_ws_packing_box SET ?`, [data.box]);

            // 성공적으로 수행되면 커밋
            await db.commit();

            return '굳';
        } catch (err) {
            if (transactionStarted) {
                console.log('롤백');
                await db.rollback();
                return '실패!';
            }
            throw err;
        } finally {
            db.release();
        }
    }
}
