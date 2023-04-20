import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity("Payments")
export class Payment{

    @PrimaryColumn()
    public readonly id!: string;

    @Column()
    public type!: string; //credit_card 

    @Column()
    public method!: string; //visa | master | account_money

    @Column()
    public status!: string;

    @Column()
    public statusDetail!: string;

    @Column({type: "json", nullable: true})
    public transactionDetails!: {
        "total_paid_amount": number,
        "external_resource_url": null | string,
    }

    @Column({type: "json", nullable: true})
    public transactionData!: {
        "qr_code_base64": string,
        "qr_code": string,
        "ticket_url": string
    }

    @CreateDateColumn()
    public created_at!: Date;


    constructor(
        props: Omit <Payment, 'created_at' | 'transactionDetails' | 'transactionData'>,
        transactionDetails?: {
            "total_paid_amount": number,
            "external_resource_url": null | string,
        },
        transactionData?: {
            "qr_code_base64": string,
            "qr_code": string,
            "ticket_url": string
        }
    ){
        Object.assign(this, props);

        this.id = uuidv4();

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

        if(transactionDetails)
            this.transactionDetails = transactionDetails;
        if(transactionData)
            this.transactionData = transactionData;
    }

}