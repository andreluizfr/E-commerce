import './styles.css';

//import { Link } from 'react-router-dom';

import SaudeBeleza from 'assets/images/categories/saude_e_beleza.png';
import Telefonia from 'assets/images/categories/telefonia.png';
import Eletronicos from 'assets/images/categories/eletronicos.png';
import Esportes from 'assets/images/categories/esportes.png';
import Computadores from 'assets/images/categories/computadores.png';
import FerramentasConstrucao from 'assets/images/categories/ferramentas_e_construcao.png';
import RoupasMasculinas from 'assets/images/categories/roupas_masculinas.png';
import RoupasFemininas from 'assets/images/categories/roupas_femininas.png';
import Pets from 'assets/images/categories/pets.png';
import Bebes from 'assets/images/categories/bebes.png';
import Papelaria from 'assets/images/categories/papelaria.png';
import BrinquedosInfantil from 'assets/images/categories/brinquedos_e_infantil.png';
import JoiasRelogios from 'assets/images/categories/joias_e_relogios.png';

export default function Categories () : JSX.Element {

    return(

        <section className='HomePage-categories'>

            <div className='Container-title'>Categorias</div>

            <div className='Categories-cards-wrapper'>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='uma roupa masculina'
                        src={RoupasMasculinas}
                    />
                    <span className='Card-title'>Roupas masculinas</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='uma roupa feminina'
                        src={RoupasFemininas}
                    />
                    <span className='Card-title'>Roupas femininas</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='um celular'
                        src={Telefonia}
                    />
                    <span className='Card-title'>Telefonia</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='um computador'
                        src={Computadores}
                    />
                    <span className='Card-title'>Computadores</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='um aparelho eletrônico'
                        src={Eletronicos}
                    />
                    <span className='Card-title'>Eletrônicos</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='um utensílio doméstico'
                        src={SaudeBeleza}
                    />
                    <span className='Card-title'>Casa e utensílios</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='imagem de almofada e edredom'
                        src={SaudeBeleza}
                    />
                    <span className='Card-title'>Casa e decoração</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='um sapato'
                        src={SaudeBeleza}
                    />
                    <span className='Card-title'>Bolsas e calçados</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='uma jóia'
                        src={JoiasRelogios}
                    />
                    <span className='Card-title'>Jóias e relógios</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='produto de beleza'
                        src={SaudeBeleza}
                    />
                    <span className='Card-title'>Saúde e beleza</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='brinquedo para cachorro'
                        src={Pets}
                    />
                    <span className='Card-title'>Pets</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='bonequinhos de brinquedo'
                        src={BrinquedosInfantil}
                    />
                    <span className='Card-title'>Brinquedos e infantil</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='roupa para bebê'
                        src={Bebes}
                    />
                    <span className='Card-title'>Bebês</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='bola de basquetebol'
                        src={Esportes}
                    />
                    <span className='Card-title'>Esportes</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='ferramentas'
                        src={FerramentasConstrucao}
                    />
                    <span className='Card-title'>Ferramentas e construção</span>
                </article>

                <article className='Categorie-card'>
                    <img
                        className='Card-image'
                        alt='caderno, lápis, borracha, caneta...'
                        src={Papelaria}
                    />
                    <span className='Card-title'>Papelaria</span>
                </article>

            </div>

        </section>

    )

}