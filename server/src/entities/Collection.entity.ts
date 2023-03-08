import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CollectionDTO } from '../repositories/Collections/CollectionDTO';
import { Product } from './Product.entity';

@Entity("Collections")
export class Collection{

    @PrimaryColumn()
    public readonly collectionId!: string;

    @ManyToMany(() => Product, (product: Product)=> product.productId)
    public products!: Product[];
    
    @Column({ unique: true })
    public title!: string;

    @Column({nullable: true})
    public description!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: CollectionDTO,
    ){
        //received from client
        Object.assign(this, props);
        this.collectionId = uuidv4();
    }


}