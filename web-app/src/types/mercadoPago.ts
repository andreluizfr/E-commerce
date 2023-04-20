export default interface MercadoPago{
    checkout: (input:{
        preference:{
            id: string | undefined
        },
        render:{
            container: string,
            label?: string
        }
    }) => any;
    cardForm: (input:{
        amount: string,
        iframe: boolean,
        form: object,
        callbacks: object
    }) => any;
    getIdentificationTypes: () => Promise<[]>;
}

interface Constructable<T> {
    new(key: string | undefined, options?: { locale: string }): T
}

declare global {
    interface Window{
        MercadoPago: Constructable <MercadoPago>;
    }
}
