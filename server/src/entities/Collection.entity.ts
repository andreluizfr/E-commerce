import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Product } from './Product.entity';

@Entity("Collections")
export class Collection{

    @PrimaryColumn()
    public readonly collectionId!: string;
    
    @Column({ unique: true })
    public title!: string;

    @Column({nullable: true})
    public description!: string;

    @ManyToMany(() => Product, {cascade: true})
    @JoinTable()
    public products!: Product[];

    @Column({nullable: true})
    public subcategory!: string;

    @Column({nullable: true})
    public providerURL!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Product, 'productId' | 'created_at'>,
    ){
        //received from client
        Object.assign(this, props);
        this.collectionId = uuidv4();
    }


}