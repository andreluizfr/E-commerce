import './styles.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import user from 'assets/svg/user.png'; //trocar pra svg

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from 'types/user';

export default function UserDropdownMenu () :JSX.Element {
    
    const [User, setUser] = useState <null | User>(null);

    useEffect(()=>{
        const UserStoraged = localStorage.getItem("user");
        if(UserStoraged) setUser(JSON.parse(UserStoraged));
    }, []);

    function logout(){
        localStorage.clear();
        window.location.reload();
    }

    if(User)
        return(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <img 
                        className='UserDropdownMenuIcon'
                        alt='icone de usuário' 
                        src={user}
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="UserDropdownMenuContent" sideOffset={5}>
                        {/*<DropdownMenu.Label>Informações</DropdownMenu.Label>*/}
                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                ver minha conta
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Separator className="UserDropdownMenuSeparator"/>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                    pedidos
                            </DropdownMenu.Item>
                        </div>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                    endereços
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Separator className="UserDropdownMenuSeparator"/>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem" onClick={logout}>
                                sair da conta
                            </DropdownMenu.Item>
                        </div>
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
                        src={user}
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="UserDropdownMenuContent" sideOffset={5}>
                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <Link to='/login'>fazer login</Link>
                            </DropdownMenu.Item>
                        </div>

                        <DropdownMenu.Separator className="UserDropdownMenuSeparator"/>

                        <div className='SomeMarginAround'>
                            <DropdownMenu.Item className="UserDropdownMenuItem">
                                <Link to='/cadastro'>cadastrar-se</Link>
                            </DropdownMenu.Item>
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

}