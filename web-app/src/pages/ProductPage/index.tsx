import './styles.css';

import { useParams } from 'react-router-dom';

export default function ProductPage () : JSX.Element {

    let { productId } = useParams();

    return(
        <div className='ProductPage'>
            <div>produto {productId}</div>
        </div>
    )

}