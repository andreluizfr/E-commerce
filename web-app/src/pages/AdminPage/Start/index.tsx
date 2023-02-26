import './styles.css';

import { useSelector } from 'react-redux';
import { StoreState } from 'store';

export default function Start () : JSX.Element {
    const user = useSelector((state: StoreState) => state.user);

    return(
        <div className='Start'>
            <div>Bem vindo a página de administração do site, {user.value?.firstName}.</div>
        </div>
    );
}
