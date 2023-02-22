import './styles.css';
import { ReactComponent as SearchIcon } from 'assets/svg/search.svg';
import van from 'assets/svg/van.png'; //trocar pra svg
import logo from 'assets/images/logo.png';

import UserDropdownMenu from './UserDropdownMenu';
import CartPopover from './CartPopover';

import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function NavBar() : JSX.Element{

    const isMedium = useMediaQuery({ query: '(max-width: 720px)' });
    const [searchInputContent, updateSearchInputContent] = useState <string>("");
    const navigate = useNavigate();

    function saveInput (event: React.ChangeEvent<HTMLInputElement>){
        const input = event.target as HTMLInputElement;
        updateSearchInputContent(input.value);
    }

    function search (event: React.MouseEvent<HTMLAnchorElement>){
        event.preventDefault();
        if(searchInputContent.length > 0)
            navigate("/busca?keyword="+searchInputContent);
    }

    if(isMedium)
        return (
            <header className='NavBar'>

                <div className='NavBar-banner'>
                    <p className='NavBar-banner-sentence'>
                        <span className='Coloured-word'>FRETE GRÁTIS</span>
                        <span className='Normal-word'> para </span>
                        <span className='Coloured-word'>TODO</span>
                        <span className='Normal-word'> Brasil </span>
                    </p>
                    <img 
                        className='Van-Icon'
                        alt='van de entrega'
                        src={van}
                    />
                </div>

                <Link to='/'>
                    <img 
                        className='NavBar-logo'
                        alt='logo da empresa' 
                        src={logo}
                    />
                </Link>

                <div className='NavBar-container-background'>

                    <div className='NavBar-container'>

                        <div className='NavBar-searchBar'>
                            <input 
                                className='SearchBar-input'
                                placeholder='Procure um produto...'
                                onChange={saveInput}
                            />
                            <Link to={'/busca?keyword='+searchInputContent} onClick={search}>
                                <SearchIcon className='SearchBar-icon'/>
                            </Link>
                        </div>
                        
                        <div className='NavBar-user-toolbar'>
                            <UserDropdownMenu/>
                            <CartPopover/>
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

                    <Link to='/'>
                        <img 
                            className='NavBar-logo'
                            alt='logo da empresa' 
                            src={logo}
                        />
                    </Link>

                        <div className='NavBar-searchBar'>
                            <input 
                                className='SearchBar-input'
                                placeholder='Procure um produto...'
                                onChange={saveInput}
                            />
                             <Link to={'/busca?keyword='+searchInputContent} onClick={search}>
                                <SearchIcon className='SearchBar-icon'/>
                            </Link>
                        </div>
                        
                        
                        <div className='NavBar-user-toolbar'>
                            <UserDropdownMenu/>
                            <CartPopover/>
                        </div>

                    </div>
                    
                </div>

            </header>
        );

}