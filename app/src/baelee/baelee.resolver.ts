import { Args, Query, Resolver } from "@nestjs/graphql";
import { shippingList } from "./entities/baelee.entity";
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';

@Resolver()
export class BaeleeResover {
    constructor(private databaseService: DatabaseService) {
    }

    @Query(() => [shippingList]) 
    async getBaelee(
        @Args('c_code') c_code: string,
        @Args('start_date') start_date: string,
        @Args('end_date') end_date: string,
        @Args('company_id') company_id: string,
        @Args('date_id') date_id: number, // 0 for build_date, 1 for shipped_date
        @Args('search', {nullable:true}) search?: string,
    ): Promise<shippingList[]> {
        const db = await this.databaseService.getConnection();

        let rows: RowDataPacket[], fields: any;
        let isSearch = search ? `AND (order_number = "${search}" or tracking_number = "${search}")` : "";
        let dateSQL = date_id === 0 ? `build_date`: `shipped_date`; 

        try {
            if (company_id == "1") {
                [rows, fields] = await db.query<RowDataPacket[]>(
                    `SELECT * FROM js_kpacket WHERE c_code = ? AND ${dateSQL} BETWEEN ? AND ? ${isSearch}`, [c_code, start_date, end_date]
                );
            } else {
                [rows, fields] = await db.query<RowDataPacket[]>(
                    `SELECT * FROM js_ems WHERE c_code = ? AND ${dateSQL} BETWEEN ? AND ? ${isSearch}`, [c_code, start_date, end_date]
                );
            }

            if (!rows || rows.length === 0) {
                console.error('No data found for the given parameters');
                return [];
            }
        
            return rows as shippingList[];

        } finally {
            db.release(); 
        }
    }

}