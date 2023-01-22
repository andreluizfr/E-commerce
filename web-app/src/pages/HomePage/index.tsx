import './styles.css';
import { Link } from 'react-router-dom';

export default function HomePage () : JSX.Element {

    return(
        <div className='HomePage'>
            <h1>Home Page</h1>
            <Link to='/login'>login page</Link>
            <br></br>
            <Link to='/cadastro'>signup page</Link>
        </div>
    )

}