import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Product } from './Product.entity';
import { User } from './User.entity';

@Entity("Ratings")
export class Rating{

    @PrimaryGeneratedColumn('increment')
    public readonly ratingId!: string;
    
    @ManyToOne(() => User, (user) => user.ratings, {cascade: true})
    public user!: User;

    @ManyToOne(() => Product, (product) => product.ratings, {cascade: true})
    public productId!: Product;

    @Column({type: 'json'})
    public variation!: object;

    @Column({nullable: true})
    public rating!: number;

    @Column()
    public comment!: string;

    @Column()
    public hasMidia!: boolean;

    @Column({type: "jsonb", nullable: true})
    public midias!: {type: string, url: string}[];

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Product, 'ratingId' | 'created_at'>,
    ){
        Object.assign(this, props);
    }

}