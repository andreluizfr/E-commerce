import './styles.css';

import EditAddress from './EditAddress';
import DeleteAddressDialog from './DeleteAddressDialog';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';
import { useEffect, useState } from 'react';

import UpdateAddressesQuery from 'queries/User/logged/UpdateAddresses';
import refreshToken from 'queries/User/public/RefreshToken';


export default function AddressBoxes  () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateAddressesQueryParams, setUpdateAddressesQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateAddressesQuery = UpdateAddressesQuery(updateAddressesQueryParams);

    const [visibleEditAddress, setVisibleEditAddress] = useState(false);
    const [visibleDeleteAddress, setVisibleDeleteAddress] = useState(false);

    const [addressIndex, setAddressIndex] = useState(0);

    function openEditAddress(index: number){
        setVisibleEditAddress(true);
        setAddressIndex(index);
    }

    function openDeleteAddress(index: number){
        setVisibleDeleteAddress(true);
        setAddressIndex(index);
    }

    function setAddressToDefault(index: number){
        if(user.value){
            const newAddresses = [...user.value.addresses].map(address=>{ return {...address, default: false}});
            newAddresses.splice(index, 1, {...newAddresses[index], default: true});
            setUpdateAddressesQueryParams({userId: user.value.userId, addresses: newAddresses});
        }
    }

    useEffect(()=>{
        if(updateAddressesQueryParams){
            updateAddressesQuery.refetch();
            setUpdateAddressesQueryParams(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQueryParams]);

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
            if(updateAddressesQuery.data)
                console.log(updateAddressesQuery.data.message);

            if(updateAddressesQuery.data?.success && updateAddressesQuery.data?.addresses){
                console.log("Endereços atualizado - ", updateAddressesQuery.data.addresses);
                setTimeout(()=>window.location.reload(), 1000);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQuery.data]);

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
                        <button className='Button' onClick={()=>openEditAddress(index)}>Alterar</button>
                        <button className='Button' onClick={()=>openDeleteAddress(index)}>Excluir</button>
                        {!address.default &&
                            <button className='Button' onClick={()=>setAddressToDefault(index)}>Definir como padrão</button>
                        }
                    </div>
                </div>
            )}
            {visibleEditAddress &&
                <EditAddress visible={visibleEditAddress} addressIndex={addressIndex} setVisible={setVisibleEditAddress}/>
            }
            {visibleDeleteAddress &&
                <DeleteAddressDialog visible={visibleDeleteAddress} addressIndex={addressIndex} setVisible={setVisibleDeleteAddress}/>
            }
        </>
    );
}