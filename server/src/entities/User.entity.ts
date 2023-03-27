import { Entity, Column, CreateDateColumn, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Rating } from './Rating.entity';
import { Order } from './Order.entity';

import { UserDTO } from '../repositories/Users/UserDTO';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';


@Entity("Users")
export class User{

    @PrimaryColumn()
    public readonly id!: string;
    
    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @Column({ unique: true })
    public email!: string;

    @Column()
    public birthDate!: Date;

    @Column({ unique: true })
    public cpf!: string;

    @Column()
    public phoneNumber!: string;

    @Column()
    public password!: string;

    @Column()
    public emailVerified!: boolean;

    @Column({ unique: true })
    public verificationEmailCode!: string;

    @Column()
    public admin!: boolean;

    @Column({type: "jsonb", nullable: true})
    public addresses!: {
        default: boolean,
        receiverName: string,
        streetName: string,
        houseNumber: number
        district: string,
        city: string,
        state: string,
        cep: string,
        phoneNumber: string
    }[];

    @Column({ nullable: true })
    public photoURL!: string;

    @OneToMany(() => Order, (order: Order) => order.user)
    public orders!: Order[];

    @OneToMany(() => Rating, (rating: Rating) => rating.user)
    public ratings!: Rating[];

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: UserDTO,
        verificationEmailCode: string,
    ){
        //received from client
        Object.assign(this, props);
        //always create here
        this.id = uuidv4();
        this.emailVerified = false;
        this.verificationEmailCode = verificationEmailCode;
        this.admin = false;
        this.addresses = [];
        this.photoURL = "";
    }

    @BeforeInsert()
    async hashPassword() {
        
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        
    }

}