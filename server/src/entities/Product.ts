import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

import Category from '../types/Category';
import ProductStatus from '../types/ProductStatus';
import Attributes from '../types/Attributes';
import Midias from '../types/Midias';
import RatingNumbers from '../types/RatingNumbers';
import { Rating } from './Rating';

@Entity("Products")
export class Product{

    @PrimaryGeneratedColumn('increment')
    public readonly productId!: string;
    
    @Column({ unique: true })
    public title!: string;

    @Column({nullable: true})
    public description!: string;

    @Column({nullable: true})
    public midias!: Midias;

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

    @Column({nullable: true})
    public attributes!: Attributes;

    @Column()
    public productStatus!: ProductStatus;

    @Column()
    public rating!: number;

    @Column()
    public ratingNumbers!: RatingNumbers;

    @OneToMany(() => Rating, (rating: Rating) => rating.product, {cascade: true})
    @Column()
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