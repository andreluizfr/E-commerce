import './styles.css';

//import { Link } from 'react-router-dom';

import SaudeBeleza from 'assets/images/categories/saude_e_beleza.jpg';
import Telefonia from 'assets/images/categories/telefonia.jpg';
import Eletronicos from 'assets/images/categories/eletronicos.jpg';
import Esportes from 'assets/images/categories/esportes.jpg';
import Computadores from 'assets/images/categories/computadores.jpg';
import FerramentasConstrucao from 'assets/images/categories/ferramentas_e_construcao.jpg';
import RoupasMasculinas from 'assets/images/categories/roupas_masculinas.jpg';
import RoupasFemininas from 'assets/images/categories/roupas_femininas.jpg';
import Pets from 'assets/images/categories/pets.jpg';
import Bebes from 'assets/images/categories/bebes.jpg';
import Papelaria from 'assets/images/categories/papelaria.jpg';
import BrinquedosHobbies from 'assets/images/categories/brinquedos_e_hobbies.jpg';
import JoiasRelogios from 'assets/images/categories/joias_e_relogios.jpg';
import BolsasCalcados from 'assets/images/categories/bolsas_e_calcados.jpg';
import CasaDecoracao from 'assets/images/categories/casa_e_decoracao.jpg';
import UtensiliosCasa from 'assets/images/categories/utensilios_para_casa.jpg';

import { useNavigate } from 'react-router-dom';

export default function Categories () : JSX.Element {

    const navigate = useNavigate();

    return(

        <section className='HomePage-categories'>

            <div className='Container-title'>Categorias</div>

            <div className='Categories-cards-wrapper'>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Roupas masculina")}>
                    <img
                        className='Card-image'
                        alt='uma roupa masculina'
                        src={RoupasMasculinas}
                        loading="lazy"
                    />
                    <span className='Card-title'>Roupas masculinas</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Roupas femininas")}>
                    <img
                        className='Card-image'
                        alt='uma roupa feminina'
                        src={RoupasFemininas}
                        loading="lazy"
                    />
                    <span className='Card-title'>Roupas femininas</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Telefonia")}>
                    <img
                        className='Card-image'
                        alt='um celular'
                        src={Telefonia}
                        loading="lazy"
                    />
                    <span className='Card-title'>Telefonia</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Computadores")}>
                    <img
                        className='Card-image'
                        alt='um computador'
                        src={Computadores}
                        loading="lazy"
                    />
                    <span className='Card-title'>Computadores</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Eletrônicos")}>
                    <img
                        className='Card-image'
                        alt='um aparelho eletrônico'
                        src={Eletronicos}
                        loading="lazy"
                    />
                    <span className='Card-title'>Eletrônicos</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Utensílios para casa")}>
                    <img
                        className='Card-image'
                        alt='um utensílio doméstico'
                        src={UtensiliosCasa}
                        loading="lazy"
                    />
                    <span className='Card-title'>Utensílios para casa</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Casa e decoração")}>
                    <img
                        className='Card-image'
                        alt='imagem de almofada e edredom'
                        src={CasaDecoracao}
                        loading="lazy"
                    />
                    <span className='Card-title'>Casa e decoração</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Bolsas e calçados")}>
                    <img
                        className='Card-image'
                        alt='um sapato'
                        src={BolsasCalcados}
                        loading="lazy"
                    />
                    <span className='Card-title'>Bolsas e calçados</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Jóias e relógios")}>
                    <img
                        className='Card-image'
                        alt='uma jóia'
                        src={JoiasRelogios}
                        loading="lazy"
                    />
                    <span className='Card-title'>Jóias e relógios</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Saúde e beleza")}>
                    <img
                        className='Card-image'
                        alt='produto de beleza'
                        src={SaudeBeleza}
                        loading="lazy"
                    />
                    <span className='Card-title'>Saúde e beleza</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Pets")}>
                    <img
                        className='Card-image'
                        alt='brinquedo para cachorro'
                        src={Pets}
                        loading="lazy"
                    />
                    <span className='Card-title'>Pets</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Brinquedos e hobbies")}>
                    <img
                        className='Card-image'
                        alt='bonequinhos de brinquedo'
                        src={BrinquedosHobbies}
                        loading="lazy"
                    />
                    <span className='Card-title'>Brinquedos e hobbies</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Bebês")}>
                    <img
                        className='Card-image'
                        alt='roupa para bebê'
                        src={Bebes}
                        loading="lazy"
                    />
                    <span className='Card-title'>Bebês</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Esportes")}>
                    <img
                        className='Card-image'
                        alt='bola de basquetebol'
                        src={Esportes}
                        loading="lazy"
                    />
                    <span className='Card-title'>Esportes</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Ferramentas e construção")}>
                    <img
                        className='Card-image'
                        alt='ferramentas'
                        src={FerramentasConstrucao}
                        loading="lazy"
                    />
                    <span className='Card-title'>Ferramentas e construção</span>
                </article>

                <article className='Categorie-card' onClick={()=>navigate("/produtos/?categoria=Papelaria")}>
                    <img
                        className='Card-image'
                        alt='caderno, lápis, borracha, caneta...'
                        src={Papelaria}
                        loading="lazy"
                    />
                    <span className='Card-title'>Papelaria</span>
                </article>

            </div>

        </section>

    )

}