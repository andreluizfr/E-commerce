import './styles.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import { StoreState } from 'store';
import useMercadoPago from 'hooks/useMercadoPago';
import CreatePaymentQuery from 'queries/Payment/logged/CreatePayment';
import refreshToken from 'queries/User/public/RefreshToken';


export default function PaymentPage () : JSX.Element {

    const cart = useSelector((state: StoreState) => state.cart);
    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    let amount = 0;
    cart.value.forEach(productState=>{
        amount += Number(productState.product.price) * productState.quantity;
    });

    const [paymentForm, setPaymentForm] = useState<{
        token: string,
        issuer_id: string,
        payment_method_id: string,
        transaction_amount: number,
        installments: number,
        description: string,
        payer: {
            email: string,
            identification: {
                type: string,
                number: number,
            }
        }
    } | null>(null);

    const mercadopago = useMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'pt-BR'
    });

    const createPaymentQuery = CreatePaymentQuery(paymentForm, cart.value, user.value?.id);

    useEffect(()=>{
        if(mercadopago){
            const cardForm = mercadopago.cardForm({
                amount: String(amount),
                iframe: true,
                form: 
                {
                    id: "form-checkout",
                    cardNumber: {
                        id: "form-checkout__cardNumber",
                        placeholder: "Número do cartão",
                    },
                    expirationDate: {
                        id: "form-checkout__expirationDate",
                        placeholder: "MM/YY",
                    },
                    securityCode: {
                        id: "form-checkout__securityCode",
                        placeholder: "Código de segurança",
                    },
                    cardholderName: {
                        id: "form-checkout__cardholderName",
                        placeholder: "Titular do cartão",
                    },
                    issuer: {
                        id: "form-checkout__issuer",
                        placeholder: "Banco emissor",
                    },
                    installments: {
                        id: "form-checkout__installments",
                        placeholder: "Parcelas",
                    },        
                    identificationType: {
                        id: "form-checkout__identificationType",
                        placeholder: "Tipo de documento",
                    },
                    identificationNumber: {
                        id: "form-checkout__identificationNumber",
                        placeholder: "Número do documento",
                    },
                    cardholderEmail: {
                        id: "form-checkout__cardholderEmail",
                        placeholder: "E-mail",
                    },
                },
                callbacks: {
                    onFormMounted: (error: Error) => {
                        if (error) return console.warn("Form Mounted handling error: ", error);
                        console.log("Form mounted");
                    },
                    onSubmit: (event: React.FormEvent <HTMLFormElement>) => {
                        event.preventDefault();
          
                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        setPaymentForm({
                            token,
                            issuer_id,
                            payment_method_id,
                            transaction_amount: Number(amount),
                            installments: Number(installments),
                            description: "Pagamento de produtos",
                            payer: {
                                email,
                                identification: {
                                    type: identificationType,
                                    number: identificationNumber,
                                }
                            }
                        });
                  },
                  onFetching: (resource: string) => {
                    console.log("Fetching resource: ", resource);
          
                    // Animate progress bar
                    const progressBar = document.querySelector(".progress-bar");
                    if(progressBar)
                        progressBar.removeAttribute("value");
          
                    return () => {
                        if(progressBar)
                            progressBar.setAttribute("value", "0");
                    };
                  }
                },
              }
            );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mercadopago]);

    useEffect(()=>{
        if(paymentForm)
            createPaymentQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentForm]);

    useEffect(()=>{
        if(createPaymentQuery.data)
            console.log(createPaymentQuery.data.message);
            
        if(createPaymentQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) createPaymentQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 3000);
                }
            });
        else if(createPaymentQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 3000);
        }
        else if(createPaymentQuery.data?.order){
            console.log(createPaymentQuery.data.order);
        }
            
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mercadopago, createPaymentQuery.data]);

    

    return (
        <div className='PaymentPage'>
            <form id="form-checkout">
                <div id="form-checkout__cardNumber" className="container"></div>
                <div id="form-checkout__expirationDate" className="container"></div>
                <div id="form-checkout__securityCode" className="container"></div>
                <input type="text" id="form-checkout__cardholderName" />
                <select id="form-checkout__issuer">
                </select>
                <select id="form-checkout__installments">
                </select>
                <select id="form-checkout__identificationType">
                </select>
                <input type="text" id="form-checkout__identificationNumber" />
                <input type="email" id="form-checkout__cardholderEmail" />
                <button type="submit" id="form-checkout__submit">Pagar</button>
                <progress value="0" className="progress-bar">Carregando...</progress>
            </form>
            <div>{JSON.stringify(createPaymentQuery.data)}</div>
        </div>
    );
}