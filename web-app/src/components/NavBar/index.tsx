import './styles.css';

import { useMediaQuery } from 'react-responsive';

import logo from 'assets/images/logo.png';

import { ReactComponent as SearchIcon } from 'assets/svg/search.svg';
import van from 'assets/svg/van.png'; //trocar pra svg
import shoppingCart from 'assets/svg/shoppingCart.png'; //trocar pra svg

import UserDropdownMenu from 'components/UserDropdownMenu';


export default function NavBar() : JSX.Element{

    const isSmall = useMediaQuery({ query: '(max-width: 720px)' });
    //const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

    if(isSmall)
        return (
            <header className='NavBar'>

                <div className='NavBar-banner'>
                    <p className='NavBar-banner-sentence'>
                        <span className='Coloured-word'>FRETE GRÁTIS</span> para <span className='Coloured-word'>TODO</span> Brasil
                    </p>
                    <img 
                        className='Van-Icon'
                        alt='van de entrega'
                        src={van}
                    />
                </div>

                <img 
                    className='NavBar-logo'
                    alt='logo da empresa' 
                    src={logo}
                />

                <div className='NavBar-container-background'>

                    <div className='NavBar-container'>

                        <div className='NavBar-searchBar'>
                            <input 
                                className='SearchBar-input'
                                placeholder='Procure um produto...'
                            />
                            <SearchIcon className='SearchBar-icon'/>
                        </div>
                        
                        <div className='NavBar-user-toolbar'>
                            <UserDropdownMenu/>
                            <img 
                                className='ShoppingCart-icon'
                                alt='icone de carrinho de compras' 
                                src={shoppingCart}
                            />
                        </div>

                    </div>
                
                </div>

            </header>
        );

    else 
        return (
            <header className='NavBar'>

                <div className='NavBar-banner'>
                    <p className='NavBar-banner-sentence'>
                        <span className='Coloured-word'>FRETE GRÁTIS</span> para <span className='Coloured-word'>TODO</span> Brasil
                    </p>
                    <img 
                        className='Van-Icon'
                        alt='van de entrega'
                        src={van}
                    />
                </div>

                <div className='NavBar-container-background'>

                    <div className='NavBar-container'>

                        <img 
                            className='NavBar-logo'
                            alt='logo da empresa' 
                            src={logo}
                        />

                        <div className='NavBar-searchBar'>
                            <input 
                                className='SearchBar-input'
                                placeholder='Procure um produto...'
                            />
                            <SearchIcon className='SearchBar-icon'/>
                        </div>
                        
                        
                        <div className='NavBar-user-toolbar'>
                            <UserDropdownMenu/>
                            <img 
                                className='ShoppingCart-icon'
                                alt='icone de carrinho de compras' 
                                src={shoppingCart}
                            />
                        </div>

                    </div>
                    
                </div>

            </header>
        );

}