import { Entity, Column, CreateDateColumn, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
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
    public birthDate!: string;

    @Column({ unique: true })
    public cpf!: string;

    @Column()
    public password!: string;

    @Column(({ nullable: true }))
    public photoURL!: string;

    @Column()
    public emailVerified!: boolean;

    @Column({ unique: true })
    public verificationEmailCode!: string;

    @Column()
    public admin!: boolean;

    @Column(({ nullable: true }))
    public refreshToken!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Pick <User, 'firstName' | 'lastName' | 'email' | 'birthDate' | 'cpf' | 'password'>,
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