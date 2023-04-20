import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne} from 'typeorm';
import { Product } from './Product.entity';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity("Ratings")
export class Rating{

    @PrimaryColumn()
    public readonly id!: string;
    
    @ManyToOne(() => User, (user) => user.ratings, {cascade: true})
    public user!: string;

    @ManyToOne(() => Product, (product) => product.ratings, {cascade: true})
    public product!: string;

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
        props: Omit <Rating, 'id' | 'created_at'>,
    ){
        Object.assign(this, props);
        this.id = uuidv4();
    }

}