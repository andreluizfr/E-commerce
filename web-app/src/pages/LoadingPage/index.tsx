import './styles.css';

//import logo from 'assets/images/logo.png'; //tem que ser svg
import { ReactComponent as Logo } from 'assets/svg/logo.svg';

import DotLoader from "react-spinners/DotLoader";
//mport ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


export default function LoadingPage () : JSX.Element {

    return(
        <div className='LoadingPage'>

            {/*<img className='Logo' src={logo} alt='logo'/>*/}
            <Logo className='Logo'/>
            <DotLoader
                className='Loader'
                color="black"
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

        </div>
    );

}