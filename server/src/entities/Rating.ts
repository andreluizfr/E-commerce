import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity("Ratings")
export class Rating{

    @PrimaryGeneratedColumn('increment')
    public readonly ratingId!: string;
    
    @ManyToOne(() => User, (user) => user.ratings, {cascade: true})
    public user!: string;

    @ManyToOne(() => Product, (product) => product.ratings, {cascade: true})
    public product!: string;

    @Column({unique: true})
    public variation!: object;

    @Column({nullable: true})
    public rating!: number;

    @Column()
    public comment!: number;

    @Column()
    public hasMidia!: boolean;

    @Column({nullable: true})
    public midias!: {type: string, url: string}[];

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Product, 'ratingId' | 'created_at'>,
    ){
        Object.assign(this, props);
    }

}