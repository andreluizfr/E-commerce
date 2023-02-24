import { Entity, Column, CreateDateColumn, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Rating } from './Rating.entity';

@Entity("Users")
export class User{

    @PrimaryColumn()
    public readonly userId!: string;
    
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

    @Column({ nullable: true }) //colunas inseridas posteriormente exigem que contenha nullable pra não dar erro nas antigas informações do DB
    public phoneNumber!: string;

    @Column()
    public password!: string;

    @Column({ nullable: true })
    public photoURL!: string;

    @Column()
    public emailVerified!: boolean;

    @Column({ unique: true })
    public verificationEmailCode!: string;

    @Column()
    public admin!: boolean;

    @Column({ nullable: true })
    public refreshToken!: string;

    @OneToMany(() => Rating, (rating: Rating) => rating.user)
    public ratings!: Rating[];

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Pick <User, 'firstName' | 'lastName' | 'email' | 'birthDate' | 'cpf' | 'phoneNumber' | 'password'>,
        verificationEmailCode: string,
        admin: boolean
    ){
        //received from client
        Object.assign(this, props);
        //always create here
        this.userId = uuidv4();
        this.emailVerified = false;
        //received from controller
        this.verificationEmailCode = verificationEmailCode;
        this.admin = admin;
    }

    @BeforeInsert()
    async hashPassword() {
        
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        
    }

}