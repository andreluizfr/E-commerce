import './styles.css';

import * as Popover from '@radix-ui/react-popover';

import shoppingCart from 'assets/svg/shopping-cart.png'; //trocar pra svg
import addToCart from 'assets/svg/add-to-cart.png'; //trocar pra svg
import removeFromCart from 'assets/svg/remove-from-cart.png'; //trocar pra svg

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { addProduct, removeProduct, clearCart } from 'store/features/cartSlice';

import Product from 'types/product';

import { Link } from 'react-router-dom';

export default function UserDropdownMenu () :JSX.Element {
    
    const cart = useSelector((state: StoreState) => state.cart);
    const dispatch = useDispatch();

    //sempre que carrinho store atualizar, atualizar o localStorage como backup.
	useEffect(()=>{
            localStorage.setItem("cart", JSON.stringify(cart.value));
	}, [cart]);

    function add(product: Product) {
        dispatch(addProduct(product));
    }

    function remove(product: Product) {
        dispatch(removeProduct(product));
    }

    function clear() {
        dispatch(clearCart());
    }

    function animateCart() {
        const cartIconElement = document.getElementsByClassName("ShoppingCart-icon")[0];
        cartIconElement.setAttribute("animate", "true");

        setTimeout(()=>{
            cartIconElement.setAttribute("animate", "false");
        }, 200); //0.2s igual o tempo da animação
    }

    if(cart && cart.value.length > 0)
        return(
            <Popover.Root>
                <Popover.Trigger className="CartPopoverTrigger">
                    <img 
                        className='ShoppingCart-icon'
                        alt='icone de carrinho de compras' 
                        src={shoppingCart}
                    />
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="CartPopoverContent" sideOffset={5}>
                        {
                            cart.value.map((productState, index)=>{
                                return(
                                    <div className="Item-container" key={index}>
                                        
                                        <Link to={'/produto/'+productState.product.productId}>
                                            <img 
                                                className="Item-image"
                                                src={productState.product.midias[0].url} 
                                                alt="imagem do produto"
                                            />  
                                        </Link>

                                        <div className="TitleVariation-wrapper">
                                            <span className='Title'>{productState.product.title}</span>
                                            <span className='Variation'>
                                                Variação:
                                                {   
                                                    productState.product.variation?
                                                        Object.keys(productState.product.variation).map(key=>{
                                                            if(productState.product.variation && productState.product.variation[key])
                                                                return(" " + productState.product.variation[key] + ", ");
                                                            else 
                                                                return "";
                                                        }).map((variationString, index, variationList)=>{
                                                            if(index === variationList.length-1)
                                                                return variationString.split(",")[0];
                                                            else
                                                                return variationString;
                                                        })
                                                        :
                                                        null
                                                }
                                            </span>
                                        </div>

                                        <div className='QuantityPrice-wrapper'>
                                            <span className='Quantity'>Quantidade: {productState.quantity}</span>
                                            <span className='Price'>R${productState.product.price}</span>
                                        </div>
                                        
                                        <div className='Buttons'>
                                            <img
                                                className='Add-button'
                                                src={addToCart} 
                                                alt="icone de adicionar no carrinho"
                                                onClick={()=>{
                                                    add(productState.product);
                                                    animateCart();
                                                }}
                                            />

                                            <img
                                                className='Remove-button'
                                                src={removeFromCart} 
                                                alt="icone de adicionar no carrinho"
                                                onClick={()=>{
                                                    remove(productState.product);
                                                    animateCart();
                                                }}
                                            />
                                        </div>

                                    </div>
                                );
                            })
                        }

                        <div className='Bottom-buttons'>    
                            <button 
                                className="Clear-button Button" 
                                onClick={()=>{
                                    clear();
                                    animateCart();
                                }}>
                                Limpar carrinho
                            </button>
                            <Link to={'/pagamento'}>
                                <button className="Finish-button Button">Terminar de comprar</button>
                            </Link>
                        </div>

                        <Popover.Arrow className="CartPopoverArrow" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );
    else
        return(
            <Popover.Root>
                <Popover.Trigger className="CartPopoverTrigger">
                    <img 
                        className='ShoppingCart-icon'
                        alt='icone de carrinho de compras' 
                        src={shoppingCart}
                    />
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="CartPopoverContent" sideOffset={5}>
                        Nothing to see here...
                        <Popover.Arrow className="CartPopoverArrow" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

}