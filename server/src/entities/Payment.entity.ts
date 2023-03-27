import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity("Payments")
export class Payment{

    @PrimaryColumn()
    public readonly id!: string;

    @Column()
    public preferenceId!: string;

    @Column()
    public status!: string;

    @Column()
    public type!: string;

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Payment, 'created_at'>,
    ){
        Object.assign(this, props);
        if(this.status === "pending")
            this.status = "pendente";
        else if(this.status === "approved")
            this.status = "aprovado";
        else if(this.status === "authorized")
            this.status = "autorizado";
        else if(this.status === "in_process")
            this.status = "processando";
        else if(this.status === "in_mediation")
            this.status = "em disputa";
        else if(this.status === "rejected")
            this.status = "recusado";
        else if(this.status === "cancelled")
            this.status = "cancelado";
        else if(this.status === "refunded")
            this.status = "reembolsado";
        else if(this.status === "charged_back")
            this.status = "cobrado de volta";

        this.id = uuidv4();
    }

}