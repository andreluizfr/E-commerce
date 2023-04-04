import './styles.css';

import Footer from 'components/Footer';
import NavBar from 'components/NavBar';

import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage () : JSX.Element{

    const navigate = useNavigate();
    const cart = useSelector((state: StoreState) => state.cart);

    let totalPrice = 0;
    cart.value.forEach(productState=>{
        if(productState.product.price)
            totalPrice += productState.quantity*productState.product.price;
    });

    function navigateToPaymentMethodsPage(){
        navigate('/MetodoDePagamento');
    }

    return (
        <div className='CartPage'>
            <NavBar/>

            <div className='CartPage-container'>
                <header className='Title'>Carrinho de compras</header>

                <main className='Wrapper'>
                    <section className='Items-container'>
                        <div className='Items-container-menu'>
                            <span>Produto</span>
                            <span>Quantidade</span>
                            <span>Preço</span>
                        </div>

                        {cart.value.map(productState=>
                            <article className='Item'>
                                <div className='Product-card'>
                                    <img className='Icon' src={productState.product.midias[0].url} alt='Imagem do produto'/>
                                    <div className='Title-code'>
                                        <span className='Item-title'>{productState.product.title}</span>
                                        <span className='Item-code'>{productState.product.id}</span>
                                    </div>
                                </div>

                                <div className='Quantity-wrapper'>
                                    <button className='Minus-box'>
                                        -
                                    </button>

                                    <div className='Quantity-box'>
                                        {productState.quantity}
                                    </div>

                                    <button className='Plus-box'>
                                        +
                                    </button>
                                </div>
                                
                                {productState.product.comparisonPrice?
                                    <div className='Price-wrapper'>
                                        <span className="ComparisonPrice">{"De R$"+productState.product.comparisonPrice}</span>
                                        <span className="Price">{"Por R$"+productState.product.price}</span>
                                    </div>
                                    :
                                    <div className='Price-wrapper'>
                                        <span className="Price">{"R$"+productState.product.price}</span>
                                    </div>
                                }
                            </article>
                        )}
                    </section>

                    <aside className='Items-resume'>
                        <header className='Title'>Resumo do pedido</header>

                        <section className='Products'>
                            {cart.value.map(productState=>
                                <div className='ProductInfo'>
                                    <span className='ProductQuantities'>{productState.quantity+"x "+productState.product.title}</span>
                                    {productState.product.price &&
                                        <span className='ProductTotalPrice'>{"R$"+(productState.quantity*productState.product.price).toFixed(2)}</span>
                                    }
                                </div>
                            )}
                        </section>

                        <div className='Separator'/>

                        <section className='Last-section'>
                            <div className='TotalPrice-wrapper'>
                                <span className='Title'>Total</span>
                                <span className='TotalPrice'>{"R$"+totalPrice.toFixed(2)}</span>
                            </div>

                            <div className='PriceOnPaymentSlip'>
                                {"R$"+(totalPrice*0.9).toFixed(2)+" no Boleto"}
                            </div>

                            <div className='PriceOnPix'>
                                {"R$"+(totalPrice*0.9).toFixed(2)+" no Pix"}
                            </div>
                            
                            <div className='ButtonContainer'>
                                <button className='ContinueButton' onClick={navigateToPaymentMethodsPage}>
                                    Continuar
                                </button>
                            </div>
                            
                            <div className='AddMoreProductsContainer'>
                                <Link to="/produtos" className='AddMoreProducts'>
                                    Adicionar mais produtos
                                </Link>
                            </div>
                            
                        </section>
                    </aside>
                </main>
            </div>

            <Footer/>
        </div>
    );
}