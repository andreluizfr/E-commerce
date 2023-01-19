import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import Category from '../types/Category';
import ProductStatus from '../types/ProductStatus';

@Entity("Products")
export class Product{

    @PrimaryGeneratedColumn('increment')
    public readonly productId!: string;
    
    @Column({ unique: true })
    public title!: string;

    @Column({nullable: true})
    public description!: string;

    @Column({nullable: true})
    public midia!: string[];

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

    @Column()
    public productStatus!: ProductStatus;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Product, 'productId' | 'created_at'>,
    ){
        //received from client
        Object.assign(this, props);
    }

}