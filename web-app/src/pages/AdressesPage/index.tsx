import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import AddAddress from './AddAddress';
import AddressBoxes from './AddressBoxes';

import NotFoundPage from 'pages/NotFoundPage';

import { useSelector } from 'react-redux';
import { StoreState } from 'store';

export default function AddressesPage () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);

    if(user.logged)
        return(
            <div className='AddressesPage'>
                <NavBar/>

                    <main className='AddressesPage-container'>

                        <header className='Page-title'>Seus endereços</header>

                        <AddAddress/>

                        <AddressBoxes/>

                    </main>

                <Footer/>
            </div>
        );
    else    
        return <NotFoundPage/>
}
