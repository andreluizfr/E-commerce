import './styles.css';
import * as Dialog from '@radix-ui/react-dialog';

import addIcon from 'assets/svg/add.png';
import closeIcon from 'assets/svg/close.png';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';
import { useEffect, useState } from 'react';

import UpdateAddressesQuery from 'queries/User/logged/UpdateAddresses';
import refreshToken from 'queries/User/public/RefreshToken';


export default function AddAddress  () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateAddressesQueryParams, setUpdateAddressesQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateAddressesQuery = UpdateAddressesQuery(updateAddressesQueryParams);

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

    const [serverResponse, setServerResponse] = useState("");

    function addFieldToAddress (event: React.ChangeEvent <HTMLInputElement>){
        const value = event.target.value;
        setAddress({...address, [event.target.name]: value});
    }

    useEffect(()=>{
        console.log(address);
        if(user.value){
            const newAddresses = [...user.value.addresses];
            newAddresses.push(address);

            setUpdateAddressesQueryParams({userId: user.value.id, addresses: newAddresses});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    function updateAddresses(event: React.MouseEvent <HTMLButtonElement>){
        event.preventDefault();
        console.log(updateAddressesQueryParams);
        
        if(updateAddressesQueryParams)
            updateAddressesQuery.refetch();
        else{
            setServerResponse("Nenhum campo preenchido.");
            setTimeout(()=>setServerResponse(" "), 3000);
        }
    }

    //controladora da query de atualizar endereços
    useEffect(()=>{
        if(updateAddressesQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) updateAddressesQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 3000);
                }
            });
        else if(updateAddressesQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 3000);
        }
        else{
            if(updateAddressesQuery.data){
                console.log(updateAddressesQuery.data.message);
                setServerResponse(updateAddressesQuery.data.message);
                setTimeout(()=>window.location.reload(), 3000);

                const inputs = document.getElementsByClassName("Input");
                Array.from(inputs).forEach(input=>(input as HTMLInputElement).value="");
            }
            if(updateAddressesQuery.data?.success && updateAddressesQuery.data?.addresses){
                console.log("Endereços atualizado - ", updateAddressesQuery.data.addresses);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQuery.data]);


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
                            <button className="AddButton" onClick={(e)=>updateAddresses(e)}>Salvar endereço</button>
                        </Dialog.Close>

                        <Dialog.Close asChild>
                            <img className="CloseButton" src={closeIcon} alt="icone de X" aria-label="Close"/>
                        </Dialog.Close>

                        <div className="Server-response">
                            {serverResponse}
                        </div>

                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );

}