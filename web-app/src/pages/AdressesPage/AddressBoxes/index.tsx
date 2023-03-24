import './styles.css';

import EditAddress from './EditAddress';
import DeleteAddressDialog from './DeleteAddressDialog';

import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useState } from 'react';


export default function AddressBoxes  () : JSX.Element {

    const user = useSelector((state: StoreState) => state.user);

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
                            <button className='Button'>Definir como padrão</button>
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