import './styles.css';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { HTMLAttributes, useEffect } from 'react';

import refreshToken from 'queries/RefreshToken';
import { removeUser } from 'store/features/userSlice';
import { useDispatch } from 'react-redux';

import DeleteCollectionQuery from 'queries/DeleteCollection';

interface Props extends HTMLAttributes<HTMLDivElement>{
    collectionId: string | undefined;
    setRefreshCollections: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteAlertDialog ({collectionId, setRefreshCollections}: Props) : JSX.Element {

    const dispatch = useDispatch();
    const deleteCollectionQuery = DeleteCollectionQuery(collectionId);

    function deleteCollection(){
        deleteCollectionQuery.refetch();
    }

    useEffect(()=>{

        if(deleteCollectionQuery.data)
            console.log(deleteCollectionQuery.data?.message);
            
        if(deleteCollectionQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) deleteCollectionQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 2000);
                }
            });
        else if(deleteCollectionQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 2000);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteCollectionQuery.data]);
    
    return(
        <div className="DeleteAlertDialog">
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <button className="DeleteButton">Excluir</button>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="AlertDialogOverlay" />
                    
                    <AlertDialog.Content className="AlertDialogContent">

                        <AlertDialog.Title className="AlertDialogTitle">
                            Tem certeza disso?
                        </AlertDialog.Title>

                        <AlertDialog.Description className="AlertDialogDescription">
                            Esta ação não pode ser desfeita. 
                            Isto irá deletar permanantemente esta coleção do banco de dados.
                        </AlertDialog.Description>

                        <div className="AlertDialogButtons">
                            <AlertDialog.Cancel asChild>
                                <button className="Button CancelButton">Cancelar</button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button className="Button ConfirmButton" onClick={deleteCollection}>Sim, excluir coleção.</button>
                            </AlertDialog.Action>
                        </div>

                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    );
}
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

