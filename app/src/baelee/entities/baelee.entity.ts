import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class shippingList {
    @Field()
    c_code: string;

    @Field()
    build_date: string;

    @Field({nullable: true})
    shipped_date: string;

    @Field()
    order_number: string;

    @Field({nullable: true})
    status: number;

    @Field({nullable: true})
    tracking_number: string;

    @Field(() => Float)
    weight: number;
}