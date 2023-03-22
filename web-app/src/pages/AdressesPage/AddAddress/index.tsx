import './styles.css';
import * as Dialog from '@radix-ui/react-dialog';

import addIcon from 'assets/svg/add.png';
import closeIcon from 'assets/svg/close.png';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';
import { useEffect, useState } from 'react';

import UpdateUserQuery from 'queries/User/logged/UpdateUser';
import refreshToken from 'queries/User/public/RefreshToken';


export default function AddAddress  () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateUserQueryParams, setUpdateUserQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateUserQuery = UpdateUserQuery(updateUserQueryParams);

    const [address, setAddress] = useState({default: false} as {
        default: boolean,

        receiverName: string,
        streetName: string,
        houseNumber: number
        district: string,
        city: string,
        state: string,
        cep: string,
        phoneNumber: string
    });

    function addFieldToAddress (event: React.ChangeEvent <HTMLInputElement>){
        const value = event.target.value;
        setAddress({...address, [event.target.name]: value});
    }

    useEffect(()=>{
        console.log(address);
        if(user.value){
            if(user.value.addresses){
                const newAdresses = [...user.value.addresses];
                newAdresses.push(address);

                setUpdateUserQueryParams({userId: user.value.userId, addresses: newAdresses});
            }
            else{
                const newAdresses = [address];
                setUpdateUserQueryParams({userId: user.value.userId, addresses: newAdresses});
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    function updateUser(){
        console.log(updateUserQueryParams);
        if(updateUserQueryParams)
            updateUserQuery.refetch();
        else
            alert("Nenhum campo preenchido.")
    }

    //controladora da query de atualizar usuario
    useEffect(()=>{
        if(updateUserQuery.data){
            console.log(updateUserQuery.data.message)
        }
        if(updateUserQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) updateUserQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 3000);
                }
            });
        else if(updateUserQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 3000);
        }
        else if(updateUserQuery.data?.success && updateUserQuery.data?.user)
            console.log("Endereços atualizado - ", updateUserQuery.data.user.addresses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateUserQuery, updateUserQuery.data]);


    return (
        <div  className='AddAddress'>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <div className='AddAddress-box'>
                        <img className='AddIcon' src={addIcon} alt='icone de mais'/>
                        <span className='Message'>Adicionar endereço</span>
                    </div>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay"/>

                    <Dialog.Content className="DialogContent">

                        <Dialog.Title className="DialogTitle">Salvar endereço</Dialog.Title>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="receiverName">
                                Nome do destinatário
                            </label>
                            <input className="Input" name="receiverName" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="state">
                                Estado
                            </label>
                            <input className="Input" name="state" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="city">
                                Cidade
                            </label>
                            <input className="Input" name="city" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="district">
                                Bairro
                            </label>
                            <input className="Input" name="district" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="streetName">
                                Nome da rua
                            </label>
                            <input className="Input" name="streetName" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="houseNumber">
                                Número da casa/apartamento
                            </label>
                            <input className="Input" name="houseNumber" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="cep">
                                CEP
                            </label>
                            <input className="Input" name="cep" onChange={addFieldToAddress}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="phoneNumber">
                                Número do celular/Whatsapp
                            </label>
                            <input className="Input" name="phoneNumber" onChange={addFieldToAddress}/>
                        </fieldset>

                        <Dialog.Close asChild>
                            <button className="AddButton" onClick={updateUser}>Salvar endereço</button>
                        </Dialog.Close>
                        
                        <Dialog.Close asChild>
                            <img className="CloseButton" src={closeIcon} alt="icone de X" aria-label="Close"/>
                        </Dialog.Close>

                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );

}