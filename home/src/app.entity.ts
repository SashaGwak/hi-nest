// market.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Market {
    @Field(() => Int)
    market_id: number;

    @Field()
    code: string;

    @Field()
    market: string;

    @Field()
    kor_market: string;

    @Field()
    orderby: string;

    @Field()
    label: string;

    @Field(() => Int)
    sort: number;

    @Field(() => Int)
    is_run: number;

    @Field(() => Int)
    shipping_edit: number;

    @Field(() => Int)
    shipping_check: number;

    @Field(() => Int)
    open_market: number;
}
