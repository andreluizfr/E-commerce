import './styles.css';

import useMercadoPago from 'hooks/useMercadoPago';
import { useEffect } from 'react';

export default function PaymentPage () : JSX.Element {

    const mercadopago = useMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'pt-BR'
    });

    useEffect(()=>{
        if(mercadopago)
            mercadopago.checkout({
                preference: {
                    id: "preferenceId"
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar',
                }
            });
            
    }, [mercadopago]);
    

    return (
        <div className='PaymentPage'>
            <div className='cho-container'></div>
        </div>
    );
}