import './styles.css';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export default function DeleteAlertDialog ({productId}: {productId: string | undefined}) : JSX.Element {

    function deleteProduct(){
        console.log(productId);
    }
    
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
