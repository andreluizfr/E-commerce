import './styles.css';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useEffect } from 'react';

import refreshToken from 'queries/User/public/RefreshToken';
import { removeUser } from 'store/features/userSlice';
import { useDispatch } from 'react-redux';

import DeleteProductQuery from 'queries/Product/admin/DeleteProduct';

interface Props{
    productId: string | undefined;
    setRefreshProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteAlertDialog ({productId, setRefreshProducts}: Props) : JSX.Element {
    
    const dispatch = useDispatch();
    const deleteProductQuery = DeleteProductQuery(productId);

    function deleteProduct(){
        deleteProductQuery.refetch();
    }

    useEffect(()=>{

        if(deleteProductQuery.data)
            console.log(deleteProductQuery.data?.message);
            
        if(deleteProductQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) deleteProductQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 2000);
                }
            });
        else if(deleteProductQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 2000);
        }
        else if(deleteProductQuery.data?.success)
            setRefreshProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteProductQuery.data]);
    
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
                            Isto irá deletar permanantemente este produto do banco de dados e em suas relações.
                        </AlertDialog.Description>

                        <div className="AlertDialogButtons">
                            <AlertDialog.Cancel asChild>
                                <button className="Button CancelButton">Cancelar</button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button className="Button ConfirmButton" onClick={deleteProduct}>Sim, excluir produto.</button>
                            </AlertDialog.Action>
                        </div>

                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    );
}
