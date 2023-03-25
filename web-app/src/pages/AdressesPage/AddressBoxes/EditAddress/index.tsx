import './styles.css';

import closeIcon from 'assets/svg/close.png';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';
import { useEffect, useState } from 'react';

import UpdateAddressesQuery from 'queries/User/logged/UpdateAddresses';
import refreshToken from 'queries/User/public/RefreshToken';

interface Props {
    addressIndex: number,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditAddress ({addressIndex, visible, setVisible}: Props) : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateAddressesQueryParams, setUpdateAddressesQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateAddressesQuery = UpdateAddressesQuery(updateAddressesQueryParams);

    const [address, setAddress] = useState<{
        default: boolean,
        receiverName: string,
        streetName: string,
        houseNumber: number
        district: string,
        city: string,
        state: string,
        cep: string,
        phoneNumber: string
    } | null> (null);

    const [serverResponse, setServerResponse] = useState("");

    useEffect(()=>{
        console.log("addressIndex", addressIndex);
        if(user.value)
            setAddress(user.value.addresses[addressIndex]);
    }, [addressIndex, user.value]);

    function addFieldToAddress (event: React.ChangeEvent <HTMLInputElement>){
        if(address){
            const value = event.target.value;
            setAddress({...address, [event.target.name]: value});
        }
    }

    useEffect(()=>{
        console.log(address);
        if(user.value && address){
            const newAddresses = [...user.value.addresses];
            newAddresses[addressIndex] = address;

            setUpdateAddressesQueryParams({userId: user.value.userId, addresses: newAddresses});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    useEffect(()=>{
        console.log("updateAdressesQueryParams:", updateAddressesQueryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQueryParams]);

    function updateAddresses(){
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
            }
            if(updateAddressesQuery.data?.success && updateAddressesQuery.data?.addresses){
                console.log("Endereços atualizado - ", updateAddressesQuery.data.addresses);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQuery.data]);

    return (
        <div  className='EditAddress'>
            <div className="DialogOverlay"/>

            <div className="DialogContent">

                <header className="DialogTitle">Alterar endereço</header>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="receiverName">
                        Nome do destinatário
                    </label>
                    <input className="Input" name="receiverName" onChange={addFieldToAddress} defaultValue={address?.receiverName}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="state">
                        Estado
                    </label>
                    <input className="Input" name="state" onChange={addFieldToAddress} defaultValue={address?.state}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="city">
                        Cidade
                    </label>
                    <input className="Input" name="city" onChange={addFieldToAddress} defaultValue={address?.city}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="district">
                        Bairro
                    </label>
                    <input className="Input" name="district" onChange={addFieldToAddress} defaultValue={address?.district}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="streetName">
                        Nome da rua
                    </label>
                    <input className="Input" name="streetName" onChange={addFieldToAddress} defaultValue={address?.streetName}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="houseNumber">
                        Número da casa/apartamento
                    </label>
                    <input className="Input" name="houseNumber" onChange={addFieldToAddress} defaultValue={address?.houseNumber}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="cep">
                        CEP
                    </label>
                    <input className="Input" name="cep" onChange={addFieldToAddress} defaultValue={address?.cep}/>
                </fieldset>

                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="phoneNumber">
                        Número do celular/Whatsapp
                    </label>
                    <input className="Input" name="phoneNumber" onChange={addFieldToAddress} defaultValue={address?.phoneNumber}/>
                </fieldset>

                <button className="AddButton" onClick={updateAddresses}>Salvar endereço</button>

                <img className="CloseButton" src={closeIcon} alt="icone de X" aria-label="Close" onClick={()=>setVisible(false)}/>

                <div className="Server-response">
                    {serverResponse}
                </div>

            </div>
        </div>
    );
}