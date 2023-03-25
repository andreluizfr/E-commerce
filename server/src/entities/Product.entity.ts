import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductDTO } from '../repositories/Products/ProductDTO';
import { Rating } from './Rating.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity("Products")
export class Product{

    @PrimaryColumn()
    public readonly id!: string;

    @OneToMany(() => Rating, (rating: Rating) => rating.product)
    public ratings!: Rating[];
    
    @Column()
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

    @Column({nullable: true}) //retirar depois quando apagar esses produtos atuais
    public sales!: number;

    @Column({array: true})
    public tags!: string;

    @CreateDateColumn()
    public created_at!: Date;

    constructor(props: ProductDTO){

        Object.assign(this, props);
        
        this.id = uuidv4();
        const ratingNumbersInitial = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        }
        this.ratingNumbers = ratingNumbersInitial;
        this.rating = 0;
        this.sales = 0;
        
    }

}