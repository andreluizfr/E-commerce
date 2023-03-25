import { useState, useEffect } from 'react';
import MercadoPago from "types/mercadoPago";

const useMercadopago = (publicKey: string | undefined, options?: { locale: string }) => {
    const [mercadopago, setMercadopago] = useState<MercadoPago>();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';

        script.addEventListener('load', () => {
            setMercadopago(new window.MercadoPago(publicKey, options));
        });

        document.body.appendChild(script);

        return () => {
            let iframe = document.body.querySelector('iframe[src*="mercadolibre"]');

            if (iframe) 
                document.body.removeChild(iframe);

            document.body.removeChild(script);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return mercadopago;
}

export default useMercadopago;