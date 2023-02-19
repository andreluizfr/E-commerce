import 'assets/css/styles.css';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { newUser } from 'store/features/userSlice';
import { newCart } from 'store/features/cartSlice';

import GetUser from 'queries/GetUser';

import LoadingPage from 'pages/LoadingPage';

const AdminPage = React.lazy(() => import('pages/AdminPage'));
const HomePage = React.lazy(() => import('pages/HomePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const SignupNextStepPage = React.lazy(() => import('pages/SignupNextStepPage'));
const EmailVerificationPage = React.lazy(() => import('pages/EmailVerificationPage'));
const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));
const ProductPage = React.lazy(() => import('pages/ProductPage'));


function App() {

	const dispatch = useDispatch();
	const getUserQuery = GetUser();

	//quando inciar app, ver se tinha carrinho salvo e passa pra store.
	useEffect(()=>{
		const StoragedCart = localStorage.getItem("cart");
        if(StoragedCart)
			dispatch(newCart(JSON.parse(StoragedCart)));
	}, [dispatch]);

	//tenta salvar na store um usuario se ele está logado.
	useEffect(()=>{
		if(getUserQuery.data)
			dispatch(newUser(getUserQuery.data));
	}, [getUserQuery.data, dispatch]);


    if(getUserQuery.isFetching)
		return(
			<RouterProvider router={
				createBrowserRouter([
					{
						path: "*",
						element: <LoadingPage/>, 
					}
				])
			}/>
		);
    
    else if(getUserQuery.isError)
		return (
			<RouterProvider router={
				createBrowserRouter([
					{
						path: "*",
						element: <>{JSON.stringify(getUserQuery.error)}</>,
					}
				])
			}/>
		);

    else if(getUserQuery.data && getUserQuery.data.admin === true)
		return (
			<React.Suspense fallback={<LoadingPage/>}>
				<RouterProvider router={
					createBrowserRouter([
						{
							path: "/admin",
							element: <AdminPage/>,
						},
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
							path: "/cadastro/confirmeSeuEmail",
							element: <SignupNextStepPage/>,
						},
						{
							path: "/verificacao/:verificationEmailCode",
							element: <EmailVerificationPage/>,
						},
						{
							path: "/produto/:productId",
							element: <ProductPage/>,
						},
						{
							path: "*",
							element: <NotFoundPage/>,
						},
					])
				}/> 
			</React.Suspense>
		);

	else
		return (
			<React.Suspense fallback={<LoadingPage/>}>
				<RouterProvider router={
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
							path: "/cadastro/confirmeSeuEmail",
							element: <SignupNextStepPage/>,
						},
						{
							path: "/verificacao/:verificationEmailCode",
							element: <EmailVerificationPage/>,
						},
						{
							path: "/produto/:productId",
							element: <ProductPage/>,
						},
						{
							path: "*",
							element: <NotFoundPage/>,
						},
					])
				}/> 
			</React.Suspense>
		);
}

export default App;
