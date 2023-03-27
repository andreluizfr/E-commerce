import './styles.css';

import * as Popover from '@radix-ui/react-popover';
import { motion, useAnimation } from 'framer-motion';

import shoppingCart from 'assets/svg/shopping-cart.png'; //trocar pra svg
import addToCart from 'assets/svg/add-to-cart.png'; //trocar pra svg
import removeFromCart from 'assets/svg/remove-from-cart.png'; //trocar pra svg
import plusOne from 'assets/svg/plus-one.png'; //trocar pra svg
import minusOne from 'assets/svg/minus-one.png'; //trocar pra svg

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { addProduct, removeProduct, clearCart } from 'store/features/cartSlice';

import Product from 'types/product';

import { Link } from 'react-router-dom';

interface Props {
    animateCart?: boolean
}

export default function UserDropdownMenu (props: Props) :JSX.Element {
    
    const cart = useSelector((state: StoreState) => state.cart);
    const dispatch = useDispatch();

    const cartIconControls = useAnimation();
    const [showPlusIcon, setShowPlusIcon] = useState(false);
    const [showMinusIcon, setShowMinusIcon] = useState(false);

    //sempre que carrinho store atualizar, atualizar o localStorage como backup.
	useEffect(()=>{
            localStorage.setItem("cart", JSON.stringify(cart.value));
	}, [cart]);

    function addProductToCart(product: Product) {
        dispatch(addProduct(product));
    }

    function removeProductFromCart(product: Product) {
        dispatch(removeProduct(product));
    }

    function clear() {
        dispatch(clearCart());
    }

    function animateAddProduct (){
        cartIconControls.start({rotate: [45, -45, 45, 0]});

        setShowPlusIcon(true);
        setTimeout(()=>setShowPlusIcon(false), 1000);
    };

    function animateRemoveProduct (){
        cartIconControls.start({rotate: [45, -45, 45, 0]});

        setShowMinusIcon(true);
        setTimeout(()=>setShowMinusIcon(false), 1000);
    };

    function animateClearCart (){
        cartIconControls.start({rotate: [0, 180, 225, 135, 225, 135, 225, 135, 0], transition: {duration: 0.8, ease: "easeIn"}});
    };

    useEffect(()=>{
        if(props.animateCart)
            animateAddProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.animateCart]);


    if(cart && cart.value.length > 0)
        return(
            <Popover.Root>
                <Popover.Trigger className="CartPopoverTrigger">
                    <motion.img
                        className='ShoppingCart-icon'
                        alt='icone de carrinho de compras' 
                        src={shoppingCart}
                        animate={cartIconControls}
                        transition={{type:'spring', bounce: 0.8}}
                    >
                    </motion.img>
                    {showPlusIcon &&
                        <motion.img
                            className='ShoppingCart-icon-add-remove'
                            alt='icone de sinalizando que produto entrou no carrinho'
                            src={plusOne}
                            initial={{opacity: 0.5, scale: 0, translateY: "0"}}
                            animate={{opacity: 1, scale: 1, translateY: "-.6rem", transition: { type: "spring", duration: 0.3 }}}
                        >
                        </motion.img>
                    }
                    {showMinusIcon &&
                        <motion.img
                            className='ShoppingCart-icon-add-remove'
                            alt='icone de sinalizando que produto foi removido do carrinho'
                            src={minusOne}
                            initial={{opacity: 0.5, scale: 0, translateY: "0"}}
                            animate={{opacity: 1, scale: 1, translateY: "-.6rem", transition: { type: "spring", duration: 0.3 }}}
                        >
                        </motion.img>
                    }
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="CartPopoverContent" sideOffset={5} asChild forceMount>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { type: "spring", duration: 0.3 },
                            }}    
                        >
                            {
                                cart.value.map((productState, index)=>{
                                    return(
                                        <div className="Item-container" key={index}>
                                            
                                            <Link to={'/produto/'+productState.product.id}>
                                                <img 
                                                    className="Item-image"
                                                    src={productState.product.midias[0].url} 
                                                    alt="imagem do produto"
                                                />  
                                            </Link>

                                            <div className="TitleVariation-wrapper">
                                                <span className='Title'>{productState.product.title}</span>
                                                <span className='Variation'>
                                                    {
                                                        productState.product.variation &&
                                                            "Variação:"
                                                    }
                                                    {   
                                                        productState.product.variation &&
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
                                                        addProductToCart(productState.product);
                                                        animateAddProduct();
                                                    }}
                                                />

                                                <img
                                                    className='Remove-button'
                                                    src={removeFromCart} 
                                                    alt="icone de adicionar no carrinho"
                                                    onClick={()=>{
                                                        removeProductFromCart(productState.product);
                                                        animateRemoveProduct();
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
                                        animateClearCart();
                                    }}>
                                    Limpar carrinho
                                </button>
                                <Link to={'/pagamento'}>
                                    <button className="Finish-button Button">Terminar de comprar</button>
                                </Link>
                            </div>

                            <Popover.Arrow className="CartPopoverArrow" />
                            
                        </motion.div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );
    else
        return(
            <Popover.Root>
                <Popover.Trigger className="CartPopoverTrigger">
                    <motion.img
                        className='ShoppingCart-icon'
                        alt='icone de carrinho de compras' 
                        src={shoppingCart}
                        animate={cartIconControls}
                        transition={{type:'spring', bounce: 0.8}}
                    >
                    </motion.img>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="CartPopoverContent" sideOffset={5} asChild forceMount>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { type: "spring", duration: 0.3 },
                            }}    
                        >

                            Seu carrinho está vazio...
                            <Popover.Arrow className="CartPopoverArrow" />

                        </motion.div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

}