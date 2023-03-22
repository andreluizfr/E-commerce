import './styles.css';

import addIcon from 'assets/svg/add.png';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';
import { useEffect, useState } from 'react';

import UpdateUserQuery from 'queries/User/logged/UpdateUser';
import refreshToken from 'queries/User/public/RefreshToken';
import User from 'types/user';

export default function AddressBoxes  () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateUserQueryParams, setUpdateUserQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateUserQuery = UpdateUserQuery(updateUserQueryParams);

    const [addressToBeEdited, setAddressToBeEdited] = useState({} as {
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
    const [addressIndex, setAddressIndex] = useState<Number | null>(null);
    /*
    function addFieldToAddress (event: React.ChangeEvent <HTMLInputElement>){
        const value = event.target.value;
        setAddress({...address, [event.target.name]: value});
    }

    useEffect(()=>{
        if(user.value){
            const newAdresses = [...user.value.addresses];
            newAdresses.push(address);

            setUserToBeUpdated({...user.value, addresses: newAdresses})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);
    */

    function addAddress(){
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
        <>
            {user.value?.addresses.map((address, index)=>
                <div className='Address-box' key={"address"+index}>
                    {address.default &&
                        <span className='DefaultAddress'>Endereço padrão</span>
                    }

                    <div className='Address-box-infos'>
                        <span className='info ReceiverName'>{address.receiverName}</span>
                        <span className='info StreetName-houseNumber'>{address.streetName+", "+address.houseNumber}</span>
                        <span className='info District'>{address.district}</span>
                        <span className='info City-state-cep'>{address.city+", "+address.state+", "+address.cep}</span>
                        <span className='info PhoneNumber'>{address.phoneNumber}</span>
                    </div>

                    <div className='Address-box-toolbar'>
                        <button className='Button'>Alterar</button>
                        <button className='Button'>Excluir</button>
                        {!address.default &&
                            <button className='Button'>Definir como padrão</button>
                        }
                    </div>
                </div>
            )}
        </>
    );
}