import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { User } from './User.entity';
import { Payment } from './Payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity("Orders")
export class Order{

    @PrimaryColumn()
    public readonly id!: string;
    
    @ManyToOne(() => User, (user) => user.orders, {cascade: true})
    public user!: string;

    @OneToOne(() => Payment)
    @JoinColumn() //onde tem o joinColumn é onde vai ficar com o id da relação com a outra entidade
    public payment!: Payment;

    @Column()
    public status!: string;
    //"não processado" | "processado" | "enviado" | "entregue" 

    @Column({type: "jsonb"})
    public items!: {
        title: string, 
        unit_price: number,
        quantity: number
    }[];

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Order, 'id' | 'status' | 'created_at'>,
    ){
        Object.assign(this, props);
        
        this.id = uuidv4();
        this.status = "não processado";
    }

}