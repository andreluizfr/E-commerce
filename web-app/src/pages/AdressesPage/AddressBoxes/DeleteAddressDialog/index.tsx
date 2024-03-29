import './styles.css';

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

export default function DeleteAddressDialog ({addressIndex, visible, setVisible}: Props) : JSX.Element {
    
    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateAddressesQueryParams, setUpdateAddressesQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateAddressesQuery = UpdateAddressesQuery(updateAddressesQueryParams);


    useEffect(()=>{
        console.log("addressIndex:", addressIndex);
        if(user.value){
            const newAddresses = [...user.value.addresses];
            newAddresses.splice(addressIndex, 1);

            setUpdateAddressesQueryParams({userId: user.value.id, addresses: newAddresses});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressIndex]);

    useEffect(()=>{
        console.log("updateAdressesQueryParams:", updateAddressesQueryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQueryParams]);

    function deleteAddress(){
        console.log(updateAddressesQueryParams);
        
        if(updateAddressesQueryParams)
            updateAddressesQuery.refetch();
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
            if(updateAddressesQuery.data)
                console.log(updateAddressesQuery.data.message);

            if(updateAddressesQuery.data?.success && updateAddressesQuery.data?.addresses){
                console.log("Endereços atualizado - ", updateAddressesQuery.data.addresses);
                setTimeout(()=>window.location.reload(), 1000);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateAddressesQuery.data]);

   //controladora da query de atualizar usuario
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

    return(
        <div className="DeleteAlertDialog">
            <div className="AlertDialogOverlay" />
            
            <div className="AlertDialogContent">

                <header className="AlertDialogTitle">
                    Tem certeza disso?
                </header>

                <div className="AlertDialogDescription">
                    Esta ação não pode ser desfeita. 
                    Isto irá deletar permanantemente este endereço da sua conta.
                </div>

                <div className="AlertDialogButtons">
                    <button className="Button CancelButton" onClick={()=>setVisible(false)}>Cancelar</button>
                    <button className="Button ConfirmButton" onClick={deleteAddress}>Sim, excluir endereço.</button>
                </div>

            </div>
        </div>
    );
}
