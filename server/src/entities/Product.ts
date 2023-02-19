import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

import Category from '../types/Category';
import ProductStatus from '../types/ProductStatus';

import { Rating } from './Rating';

@Entity("Products")
export class Product{

    @PrimaryGeneratedColumn('increment')
    public readonly productId!: string;
    
    @Column({ unique: true })
    public title!: string;

    @Column({nullable: true})
    public description!: string;

    @Column({type: "jsonb", nullable: true})
    public midias!: {attributeValue: string | null, type: string, url: string}[];

    @Column({type: 'decimal', precision: 20, scale: 2, nullable: true})
    public price!: number;

    @Column({type: 'decimal', precision: 20, scale: 2, nullable: true})
    public comparisonPrice!: number;

    @Column({type: 'decimal', precision: 20, scale: 2, nullable: true})
    public costPerProduct!: number;

    @Column({nullable: true})
    public category!: Category;

    @Column({nullable: true})
    public subcategory!: string;

    @Column({nullable: true})
    public providerURL!: string;

    @Column({type: "jsonb", nullable: true})
    public attributes!: {name: string, values: string[]}[];

    @Column()
    public productStatus!: ProductStatus;

    @Column()
    public rating!: number;

    @Column({type: "json"})
    public ratingNumbers!: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number
    };

    @OneToMany(() => Rating, (rating: Rating) => rating.product)
    public ratings!: Rating[];

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Product, 'productId' | 'created_at'>,
    ){
        //received from client
        Object.assign(this, props);
    }

}