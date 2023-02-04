import './styles.css';
import * as Popover from '@radix-ui/react-popover';

import shoppingCartEmpty from 'assets/svg/shopping-cart-empty.png'; //trocar pra svg
import shoppingCart from 'assets/svg/shopping-cart.png'; //trocar pra svg
import shoppingCart2 from 'assets/svg/shopping-cart2.png'; //trocar pra svg

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Product from 'types/product';
type Cart = Array<Product>;

export default function UserDropdownMenu () :JSX.Element {
    
    const [Cart, setCart] = useState <null | Cart>(null);

    useEffect(()=>{
        const StoragedCart = localStorage.getItem("cart");
        if(StoragedCart) setCart(JSON.parse(StoragedCart));
    }, []);

    if(Cart)
        return(
            <Popover.Root>
                <Popover.Trigger className="PopoverTrigger">
                    <img 
                        className='ShoppingCart-icon'
                        alt='icone de carrinho de compras' 
                        src={shoppingCart}
                    />
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="PopoverContent" sideOffset={5}>
                        Some more info…
                        <Popover.Arrow className="PopoverArrow" />
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
                        src={shoppingCartEmpty}
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