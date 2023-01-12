import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

    @Column()
    public admin!: boolean;

    @Column(({ nullable: true }))
    public photoURL!: string;

    @Column(({ nullable: true }))
    public refreshToken!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(props: Pick <User, 'firstName' | 'lastName' | 'email' | 'birthDate' | 'cpf' | 'password'>, admin: boolean){

        Object.assign(this, props);
        this.userId = uuidv4();
        this.admin = admin;
        
    }

}