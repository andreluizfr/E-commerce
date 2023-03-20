import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import addIcon from 'assets/svg/add.png';

import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useEffect, useState } from 'react';


export default function AddressesPage () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);

    const [addresses, setAddresses] = useState([] as {
        default: boolean,
        receiverName: string,
        streetName: string,
        houseNumber: number
        district: string,
        city: string,
        state: string,
        cep: string,
        phoneNumber: string
    }[]);

    useEffect(()=>{
        if(user.value)
            setAddresses(user.value.addresses);
    }, [user.value])

    return(
        <div className='AddressesPage'>
            <NavBar/>

                <main className='AddressesPage-container'>

                    <header className='Page-title'>Seus endereços</header>

                    <div className='AddAddress-box'>
                        <img className='AddIcon' src={addIcon} alt='icone de mais'/>
                        <span className='Message'>Adicionar endereço</span>
                    </div>

                    <div className='Address-box'>
                        <span className='DefaultAddress'>Endereço padrão</span>

                        <div className='Address-box-infos'>
                            <span className='info ReceiverName'>{"André Luiz Ferreira"}</span>
                            <span className='info StreetName-houseNumber'>{"Rua benjamin de aguiar machado"+", "+"26"}</span>
                            <span className='info District'>{"Rio doce"}</span>
                            <span className='info City-state-cep'>{"Olinda"+", "+"Pernambuco"+", "+"53150-220"}</span>
                            <span className='info PhoneNumber'>{"81987539588"}</span>
                        </div>

                        <div className='Address-box-toolbar'>
                            <button className='Button'>Alterar</button>
                            <button className='Button'>Excluir</button>
                        </div>
                    </div>

                    <div className='Address-box'>
                        <div className='Address-box-infos'>
                            <span className='info ReceiverName'>{"André Luiz Ferreira"}</span>
                            <span className='info StreetName-houseNumber'>{"Rua benjamin de aguiar machado"+", "+"26"}</span>
                            <span className='info District'>{"Rio doce"}</span>
                            <span className='info City-state-cep'>{"Olinda"+", "+"Pernambuco"+", "+"53150-220"}</span>
                            <span className='info PhoneNumber'>{"81987539588"}</span>
                        </div>

                        <div className='Address-box-toolbar'>
                            <button className='Button'>Alterar</button>
                            <button className='Button'>Excluir</button>
                            <button className='Button'>Definir como padrão</button>
                        </div>
                    </div>

                </main>

            <Footer/>
        </div>
    );
}
