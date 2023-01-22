import 'assets/css/styles.css';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import LoadingPage from 'pages/LoadingPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import ProductPage from 'pages/ProductPage';

import GetUser from 'queries/GetUser';


function App() {

	const getUserQuery = GetUser();

    if(getUserQuery.isFetching)
		return <RouterProvider router={
			createBrowserRouter([
				{
					path: "*",
					element: <LoadingPage/>, 
				}
			])
		}/>
    
    else if(getUserQuery.isError)
		return <RouterProvider router={
			createBrowserRouter([
				{
					path: "*",
					element: <>{JSON.stringify(getUserQuery.error)}</>,
				}
			])
		}/>

    else
		return <RouterProvider router={
        	createBrowserRouter([
				{
					path: "/",
					element: <HomePage/>,
				},
				{
					path: "/login",
					element: <LoginPage/>,
				},
				{
					path: "/cadastro",
					element: <SignupPage/>,
				},
				{
					path: "/:productId",
					element: <ProductPage/>,
				},
			])
		}/>

}

export default App;
