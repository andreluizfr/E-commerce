import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Rating } from './Rating.entity';

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
    public category!: string;

    @Column({nullable: true})
    public subcategory!: string;

    @Column({nullable: true})
    public providerURL!: string;

    @Column()
    public hasAttributes!: boolean;

    @Column({type: "jsonb", nullable: true})
    public attributes!: {name: string, values: string[]}[];

    @Column()
    public productStatus!: string;

    @Column({nullable: true})
    public rating!: number;

    @Column({type: "json", nullable: true})
    public ratingNumbers!: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number
    };

    @OneToMany(() => Rating, (rating: Rating) => rating.product)
    public ratings!: Rating[];

    @Column({array: true, nullable: true})
    public tags!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(props: {
        title: string,
        description?: string | null,
        midias?: {
            type: string,
            attributeValue: string | null,
            url: string
        }[] | null ,
        price?: number | null,
        comparisonPrice?: number | null,
        costPerProduct?: number | null,
        category?: string | null,
        subcategory?: string | null, //trocar pra seu tipo depois
        providerURL?: string | null,
        attributes?: {name: string, values: string[]}[] | null,
        productStatus: string,
        ratingNumbers?: {
            "1": number,
            "2": number,
            "3": number,
            "4": number,
            "5": number
        } | null,
        tags?: string[] | null
    }){

        this.hasAttributes = false;
        Object.assign(this, props);

        if(props && props.attributes && props.attributes.length>0) this.hasAttributes = true;
        
        if(props && props.ratingNumbers){
            this.rating = Number(((
                1*props.ratingNumbers["1"] +
                2*props.ratingNumbers["2"] +
                3*props.ratingNumbers["3"] +
                4*props.ratingNumbers["4"] +
                5*props.ratingNumbers["5"] 
            ) / 5).toFixed(2)); 
        } else {
            this.ratingNumbers = {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            }
            this.rating = 0;
        }
    }

}