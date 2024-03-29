import './styles.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import { StoreState } from 'store';
import useMercadoPago from 'hooks/useMercadoPago';
import CreatePaymentQuery from 'queries/Payment/logged/CreatePayment';
import refreshToken from 'queries/User/public/RefreshToken';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';


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

    //cria o formulário para cartão e seus callbacks
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

                        const description = "Produtos: " + cart.value.map(productState=>(productState.quantity+"x "+productState.product.title)).join();

                        setPaymentForm({
                            token,
                            issuer_id,
                            payment_method_id,
                            transaction_amount: Number(amount),
                            installments: Number(installments),
                            description: description,
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
                    const progressBar = document.querySelector(".Progress-bar");
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

    //preenche o select do dos tipos de identificação com os tipos vindos do mercado pago
    function createSelectOptions(elem: HTMLSelectElement, options: {[key: string]: string}[], labelsAndKeys = { label: "name", value: "id" }) {
        const { label, value } = labelsAndKeys;
  
        elem.options.length = 0;
  
        const tempOptions = document.createDocumentFragment();
  
        options.forEach(option => {
          const optValue = option[value];
          const optLabel = option[label];
  
          const opt = document.createElement('option');
          opt.value = optValue;
          opt.textContent = optLabel;
  
          tempOptions.appendChild(opt);
        });
  
        elem.appendChild(tempOptions);
      }
    
    //pega todos os tipos de identificação do mercado pago
    useEffect(()=>{
        if(mercadopago){
            mercadopago.getIdentificationTypes().then(identificationTypes=>{
                const identificationTypeElement = document.getElementById('form-checkout__identificationType') as HTMLSelectElement;
                if(identificationTypeElement)
                    createSelectOptions(identificationTypeElement, identificationTypes);
            }).catch(e=>{
                console.error('Error getting identificationTypes: ', e);
            });
        }
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
            <NavBar/>

            <div className='Payment-container'>
                <form id="form-checkout">
                    <div className="input" id="form-checkout__cardNumber"></div>
                    <div className="input" id="form-checkout__expirationDate"></div>
                    <div className="input" id="form-checkout__securityCode"></div>
                    <input type="text" id="form-checkout__cardholderName" />
                    <select id="form-checkout__issuer">
                    </select>
                    <select id="form-checkout__installments">
                    </select>
                    <select id="form-checkout__identificationType">
                    </select>
                    <input className="input" type="text" id="form-checkout__identificationNumber" />
                    <input className="input" type="email" id="form-checkout__cardholderEmail" />
                    <button className="Pay-button" type="submit" id="form-checkout__submit">Pagar</button>
                    <progress className="Progress-bar" value="0">Carregando...</progress>
                    <div>{JSON.stringify(createPaymentQuery.data)}</div>
                </form>
            </div>

            <Footer/>
        </div>
    );
}