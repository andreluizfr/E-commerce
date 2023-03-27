import './styles.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import { StoreState } from 'store';
import useMercadoPago from 'hooks/useMercadoPago';
import CreatePreferenceQuery from 'queries/Payment/logged/CreatePreference';
import refreshToken from 'queries/User/public/RefreshToken';


export default function PaymentPage () : JSX.Element {

    const cart = useSelector((state: StoreState) => state.cart);
    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const mercadopago = useMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'pt-BR'
    });

    const createPreferenceQuery = CreatePreferenceQuery(cart.value, user.value?.id);

    useEffect(()=>{
        if(createPreferenceQuery.data)
            console.log(createPreferenceQuery.data.message);
            
        if(createPreferenceQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) createPreferenceQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 3000);
                }
            });
        else if(createPreferenceQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 3000);
        }
        else if(mercadopago && createPreferenceQuery.data?.preferenceId)
            mercadopago.checkout({
                preference: {
                    id: createPreferenceQuery.data.preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar',
                }
            });
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mercadopago, createPreferenceQuery.data]);
    

    return (
        <div className='PaymentPage'>
            <div className='cho-container'></div>
            <div>{JSON.stringify(createPreferenceQuery.data)}</div>
        </div>
    );
}