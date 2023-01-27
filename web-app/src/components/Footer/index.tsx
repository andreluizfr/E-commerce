import './styles.css';

import elo from 'assets/images/footer/elo.png';
import pix from 'assets/images/footer/pix.png';
import boleto from 'assets/images/footer/boleto.png';
import mastercard from 'assets/images/footer/mastercard.png';
import hiper from 'assets/images/footer/hiper.png';
import visa from 'assets/images/footer/visa.png';

import { ReactComponent as Whatsapp } from 'assets/svg/whatsapp.svg';
import { ReactComponent as Instagram } from 'assets/svg/instagram.svg';
import { ReactComponent as Twitter } from 'assets/svg/twitter.svg';
import { ReactComponent as Facebook } from 'assets/svg/facebook.svg';

export default function Footer () :JSX.Element {

    return (
        <footer className='Footer'>

            <section className='FirstSecondColumn'>
                <header className='Column-title'>Informações</header>
                <div className='FirstSecondColumn-container'>
                    <span>Quem somos</span>
                    <span>Política e Privacidade</span>
                    <span>Trabalhe conosco</span>
                    <span>Termos e condições</span>
                </div>
            </section>

            <section className='FirstSecondColumn'>
                <header className='Column-title'>Ajuda</header>
                <div className='FirstSecondColumn-container'>
                    <span>Central de ajuda</span>
                    <span>Como comprar</span>
                    <span>Métodos de pagamento</span>
                    <span>Fale conosco</span>
                    <span>Ouvidoria</span>
                </div>
            </section>

            <section className='ThirdColumn'>
                <header className='Column-title'>Pagamento</header>
                <div className='ThirdColumn-container'>
                    <img alt='colocar' src={elo}/>
                    <img alt='colocar' src={pix}/>
                    <img alt='colocar' src={boleto}/>
                    <img alt='colocar' src={mastercard}/>
                    <img alt='colocar' src={hiper}/>
                    <img alt='colocar' src={visa}/>
                </div>
            </section>

            <section className='FourthColumn'>

                <header className='Column-title'>Redes sociais</header>
                <div className='FourthColumn-container'>
                    <Whatsapp className='FourthColumn-icon'/>
                    <Instagram className='FourthColumn-icon'/>
                    <Twitter className='FourthColumn-icon'/>
                    <Facebook className='FourthColumn-icon'/>
                </div>
            </section>
        </footer>
    );

}