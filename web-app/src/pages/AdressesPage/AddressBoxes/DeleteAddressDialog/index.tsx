import './styles.css';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store';
import { removeUser } from 'store/features/userSlice';
import { useEffect, useState } from 'react';

import UpdateAddressesQuery from 'queries/User/logged/UpdateAddresses';
import refreshToken from 'queries/User/public/RefreshToken';

interface Props{
    addressIndex: number;
}

export default function DeleteAddressDialog ({addressIndex}: Props) : JSX.Element {
    
    const user = useSelector((state: StoreState) => state.user);
    const dispatch = useDispatch();

    const [updateAddressesQueryParams, setUpdateAddressesQueryParams] = useState<{userId: string | undefined, addresses: object} | null>(null);
    const updateAddressesQuery = UpdateAddressesQuery(updateAddressesQueryParams);


    useEffect(()=>{
        if(user.value){
            const newAdresses = [...user.value.addresses];
            newAdresses.splice(addressIndex, 1);

            setUpdateAddressesQueryParams({userId: user.value.userId, addresses: newAdresses});
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
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="Button">Excluir</button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay className="AlertDialogOverlay" />
                
                <AlertDialog.Content className="AlertDialogContent">

                    <AlertDialog.Title className="AlertDialogTitle">
                        Tem certeza disso?
                    </AlertDialog.Title>

                    <AlertDialog.Description className="AlertDialogDescription">
                        Esta ação não pode ser desfeita. 
                        Isto irá deletar permanantemente este endereço da sua conta.
                    </AlertDialog.Description>

                    <div className="AlertDialogButtons">
                        <AlertDialog.Cancel asChild>
                            <button className="Button CancelButton">Cancelar</button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button className="Button ConfirmButton" onClick={deleteAddress}>Sim, excluir endereço.</button>
                        </AlertDialog.Action>
                    </div>

                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
