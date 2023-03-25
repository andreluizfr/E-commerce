import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne} from 'typeorm';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity("Payments")
export class Payment{

    @PrimaryColumn()
    public readonly id!: string;
    
    @ManyToOne(() => User, (user) => user.payments, {cascade: true})
    public user!: string;

    @Column()
    public preferenceId!: string;

    @Column()
    public status!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Payment, 'id' | 'created_at'>,
    ){
        Object.assign(this, props);
        this.id = uuidv4();
    }

}