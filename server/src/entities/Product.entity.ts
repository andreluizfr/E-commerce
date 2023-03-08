import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany} from 'typeorm';
import { ProductDTO } from '../repositories/Products/ProductDTO';
import { Collection } from './Collection.entity';
import { Rating } from './Rating.entity';

@Entity("Products")
export class Product{

    @PrimaryGeneratedColumn('increment')
    public readonly productId!: string;

    @OneToMany(() => Rating, (rating: Rating) => rating.productId)
    public ratings!: Rating[];

    @ManyToMany(() => Collection, (collection: Collection)=> collection.collectionId)
    public collections!: Collection[];
    
    @Column({ unique: true })
    public title!: string;

    @Column()
    public description!: string;

    @Column({type: "jsonb"})
    public midias!: {attributeValue?: string, type?: string, url?: string}[];

    @Column({type: 'decimal', precision: 20, scale: 2, nullable: true})
    public price!: number | null;

    @Column({type: 'decimal', precision: 20, scale: 2, nullable: true})
    public comparisonPrice!: number | null;

    @Column({type: 'decimal', precision: 20, scale: 2, nullable: true})
    public costPerProduct!: number | null;

    @Column()
    public category!: string;

    @Column()
    public subcategory!: string;

    @Column()
    public providerURL!: string;

    @Column()
    public hasAttributes!: boolean;

    @Column({type: "jsonb"})
    public attributes!: {name?: string, values?: string[]}[];

    @Column()
    public productStatus!: string;

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

    @Column({array: true})
    public tags!: string;

    @CreateDateColumn()
    public created_at!: Date;

    constructor(props: ProductDTO){

        Object.assign(this, props);
        
        const ratingNumbers2 = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        }
        this.ratingNumbers = ratingNumbers2;
        this.rating = 0;
        
    }

}