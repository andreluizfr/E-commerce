import './styles.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import userIcon from 'assets/svg/user.png'; //trocar pra svg
import userOutline from 'assets/svg/user-outline.png';
import packageBox from 'assets/svg/package-box.png';
import locationIcon from 'assets/svg/location.png';
import logoutIcon from 'assets/svg/logout.png';
import loginIcon from 'assets/svg/login.png';
import signup from 'assets/svg/signup.png';

//import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';

import { Link } from 'react-router-dom';

export default function UserDropdownMenu () :JSX.Element {
    
    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    function logout(){
        dispatch(removeUser());
        localStorage.clear();
    }

    if(user && user.logged)
        return(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <img 
                        className='UserDropdownMenuIcon'
                        alt='icone de usuário' 
                        src={userIcon}
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="UserDropdownMenuContent" sideOffset={5}>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <img className="Icon" src={userOutline} alt='icone de usuário' loading="lazy"/>
                                ver minha conta
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Separator className="UserDropdownMenuSeparator"/>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <img className="Icon" src={packageBox} alt='prancheta de pedidos ao lado de uma caixa' loading="lazy"/>
                                pedidos
                            </DropdownMenu.Item>
                        </div>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <img className="Icon" src={locationIcon} alt='símbolo de localização' loading="lazy"/>
                                endereços
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Separator className="UserDropdownMenuSeparator"/>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem" onClick={logout}>
                                <img className="Icon" src={logoutIcon} alt='porta pra sair' loading="lazy"/>
                                sair da conta
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Arrow className="UserDropdownMenuArrow" />

                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );
    else
        return(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <img 
                        className='UserDropdownMenuIcon'
                        alt='icone de usuário' 
                        src={userIcon}
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="UserDropdownMenuContent" sideOffset={5}>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <img className="Icon" src={loginIcon} alt='porta pra entrar' loading="lazy"/>
                                <Link to='/login'>fazer login</Link>
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Separator className="UserDropdownMenuSeparator"/>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <img className="Icon" src={signup} alt='usuário com símbolo de mais' loading="lazy"/>
                                <Link to='/cadastro'>cadastrar-se</Link>
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Arrow className="UserDropdownMenuArrow" />

                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

}