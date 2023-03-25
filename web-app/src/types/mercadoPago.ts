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
}

interface Constructable<T> {
    new(key: string | undefined, options?: { locale: string }): T
}

declare global {
    interface Window{
        MercadoPago: Constructable <MercadoPago>;
    }
}
