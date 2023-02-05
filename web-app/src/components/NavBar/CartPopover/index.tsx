import './styles.css';

import * as Popover from '@radix-ui/react-popover';

import shoppingCart from 'assets/svg/shopping-cart.png'; //trocar pra svg

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { addProduct, removeProduct, clearCart } from 'store/features/cartSlice';
import Product from 'types/product';

//import { Link } from 'react-router-dom';

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

    function remove(productId: string) {
        dispatch(removeProduct(productId));
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
                                    <div key={index}>
                                        {JSON.stringify(productState.product)}
                                        <div>{productState.quantity}</div>
                                        <button onClick={()=>{
                                            add(productState.product);
                                            animateCart();
                                        }}>
                                            add
                                        </button>
                                        <button onClick={()=>remove(productState.product.productId)}>remove</button>
                                    </div>
                                );
                            })
                        }
                        <button onClick={clear}>Clear</button>
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