import { Query, Resolver } from "@nestjs/graphql";
import { Market } from './app.entity';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';

@Resolver()
export class AppResolver {
    constructor(private databaseService:DatabaseService) {
    }

    @Query(() => String)
    hello(): string {
        return `Hello, Nest.js with GraphQL!`;
    }

    @Query(() => [Market])
    async allMarkets(): Promise<Market[]> {
        const db = await this.databaseService.getConnection();
        try {
            const [rows, fields] = await db.query<RowDataPacket[]>('SELECT * FROM app_market_list;');

            // 'Market' 타입으로 매핑 1
            // return rows.map(row => ({
            //     market_id: row.market_id,
            //     code: row.code,
            //     market: row.market,
            //     kor_market: row.kor_market,
            //     orderby: row.orderby,
            //     label: row.label,
            //     sort: row.sort,
            //     is_run: row.is_run,
            //     shipping_edit: row.shipping_edit,
            //     shipping_check: row.shipping_check,
            //     open_market: row.open_market,
            // } as Market));

            // 'Market' 타입으로 매핑 2 
            // return rows.map(({ market_id, code, market, kor_market, orderby, label, sort, is_run, shipping_edit, shipping_check, open_market }) => ({
            //     market_id, code, market, kor_market, orderby, label, sort, is_run, shipping_edit, shipping_check, open_market,
            // } as Market));

            return rows as Market[];
        } finally {
            db.release(); // 연결 해제
        }
    }
}