import './styles.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';

import EditProductQuery from 'queries/Product/admin/EditProduct';
import refreshToken from 'queries/User/public/RefreshToken';

import Product from 'types/product';

interface Props {
    productToBeEdited: Product |  null;
    setProductToBeEdited: React.Dispatch<React.SetStateAction<Product | null>>;
}

export default function EditProduct ({productToBeEdited, setProductToBeEdited}: Props) : JSX.Element {

    const editProductQuery = EditProductQuery(productToBeEdited);
    const dispatch = useDispatch();

    useEffect(()=>{
 
        if(productToBeEdited){
            console.log(productToBeEdited);

            const editProductContainer = document.getElementsByClassName("EditProduct")[0] as HTMLElement;
            editProductContainer.setAttribute("visible", "true");
        } else {
            const editProductContainer = document.getElementsByClassName("EditProduct")[0] as HTMLElement;
            editProductContainer.setAttribute("visible", "false");
        }
    }, [productToBeEdited]);

    function abortEdit(){
        setProductToBeEdited(null);
        editProductQuery.data = null;
        editProductQuery.remove();
    }

    function updateFormData (event: React.ChangeEvent <HTMLSelectElement | HTMLInputElement>) {
        if(productToBeEdited)
            setProductToBeEdited({
                ...productToBeEdited,
                [event.target.name]: event.target.value
            });
    }

    function updateFormDataAttributes (event: React.ChangeEvent<HTMLInputElement>, index: number) {
        if(productToBeEdited){

            const input = event.target;
            if(input.value.charAt(input.value.length-1) === ";"){ //um input valido termina com ;

                const pieces = input.value.substring(0, input.value.length - 1).split(":");
                const name = pieces[0];
                const values = pieces[1].split(",");

                //se existir atributo com mesmo ele vai ser sobrescrito porque index vai pegar a posição do repetido
                let repeated = false;
                productToBeEdited.attributes.forEach((attribute, i)=>{
                    if(attribute.name === name){
                        repeated = true;
                        index = i;
                    }
                });

                let updatedAttributes = [...productToBeEdited.attributes];
                updatedAttributes[index] = {name: name, values: values};

                setProductToBeEdited({
                    ...productToBeEdited,
                    [event.target.name]: updatedAttributes,
                    hasAttributes: true
                });

                if(repeated)
                    input.value = "";
                
            } else if(input.value.length === 0){ //caso tenha apagado o input
                const updatedAttributes = [...productToBeEdited.attributes];
                updatedAttributes.splice(index, 1);

                if(updatedAttributes.length === 0)
                    setProductToBeEdited({
                        ...productToBeEdited,
                        [event.target.name]: updatedAttributes,
                        hasAttributes: false
                    });
                else
                    setProductToBeEdited({
                        ...productToBeEdited,
                        [event.target.name]: updatedAttributes,
                    });
            }
        }
    }
    
    function updateFormDataMidias (event: React.ChangeEvent<HTMLInputElement>, index: number) {
        if(productToBeEdited){

            const input = event.target;
            if(input.value.charAt(input.value.length-1) === ";"){ //um input valido termina com ;
 
                const pieces = input.value.substring(0, input.value.length - 1).split(":");
                const attributeValue = pieces[0];
                const url = pieces[1] + ":" + pieces[2]; //por causa do http:// que também foi dividido

                let exists = false;
                let repeated = false;

                //se for diferente de none tem que fazer as verificações abaixo antes de adicionar
                if(attributeValue !== "none"){
                    productToBeEdited.attributes.forEach(attribute=>{
                        if(attribute.values.includes(attributeValue))
                            exists = true;
                    });
                    if(!exists){ //se não existir, da alerta e limpa input
                        alert("Esse atributo não existe nesse produto.");
                        input.value = "";
                        return ;
                    }

                    //se existir atributoValue com mesmo nome sobrescreve no index o i do atributo repetido
                    productToBeEdited.midias.forEach((midia, i)=>{
                        if(midia.attributeValue === attributeValue){
                            repeated = true;
                            index = i;
                        }
                    });
                }

                let updatedMidias = [...productToBeEdited.midias];
                updatedMidias[index] = { attributeValue: attributeValue, url: url};

                setProductToBeEdited({
                    ...productToBeEdited,
                    [event.target.name]: updatedMidias
                });

                if(repeated)
                    input.value = "";
                
            } else if(input.value.length === 0){//caso tenha apagado o input
                const updatedMidias = [...productToBeEdited.midias];
                updatedMidias.splice(index, 1);

                setProductToBeEdited({
                    ...productToBeEdited,
                    [event.target.name]: updatedMidias
                });
            }
        }
    }

    function updateFormDataTags (event: React.ChangeEvent<HTMLTextAreaElement>) {
        if(productToBeEdited){

            const input = event.target;
            const inputValue = input.value;

            if(inputValue.charAt(inputValue.length-1) === ";"){ //só é valido se terminar com ;
                const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
                const tags = refinedInputValue.split(",");

                setProductToBeEdited({
                    ...productToBeEdited,
                    [event.target.name]: tags
                });
            }
        }
    }

    function convertAttributeToString(attribute: {
                                                    name: string;
                                                    values: string[];
                                                } | undefined){
        let string = "";

        if(attribute)
            string = attribute.name + ":" + attribute.values.join(",");
    
        return string;
    }

    function convertMidiaToString(midia: {
                                            url: string;
                                            attributeValue: string | null;
                                        } | undefined){
        let string = "";

        if(midia)
            string += midia.attributeValue + ":" + midia.url;

        return string;
    }

    function convertTagsToString(tags: string[] | undefined){

        let string ="";

        if(tags)
            string = tags.join(",");

        return string;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        editProductQuery.refetch();
    }

     //controladora da resposta da query editProductQuery
     useEffect(()=>{

        if(editProductQuery.data){
            console.log(editProductQuery.data.message)
            const serverResponseEl = document.getElementsByClassName("ServerResponse")[0];
            serverResponseEl?.setAttribute("visible", "true");
            setTimeout(()=>{serverResponseEl?.setAttribute("visible", "false")}, 3000);
        }
            
        if(editProductQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) editProductQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 3000);
                }
            });
        else if(editProductQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 3000);
        }
        else if(editProductQuery.data?.success && editProductQuery.data?.product)
            console.log("Novos dados do produto - ", editProductQuery.data.product);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editProductQuery, editProductQuery.data]);

    return(
        <div className='EditProduct'>
            
            <div className="EditProductOverlay" onClick={abortEdit}></div>

            <form className="EditProduct-form" onSubmit={handleSubmit} noValidate>
                <header className='ComponentTitle'>Editar produto</header>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="productStatus">Status do produto</label>
                    <select name="productStatus" defaultValue={productToBeEdited?.productStatus} onChange={updateFormData} key={"productStatus"+productToBeEdited?.id} required>
                        <option value="rascunho">Rascunho</option>
                        <option value="ativo">Ativo</option>
                        <option value="desativado">Desativado</option>
                    </select>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="title">Título</label>
                    <input name="title" onChange={updateFormData} defaultValue={productToBeEdited?.title} required/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="description">Descrição</label>
                    <input name="description" defaultValue={productToBeEdited?.description} onChange={updateFormData}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="category">Categoria</label>
                    <select name="category" defaultValue={productToBeEdited?.category} onChange={updateFormData}>
                        <option value="Roupas masculinas">Roupas masculinas</option>
                        <option value="Roupas femininas">Roupas femininas</option>
                        <option value="Telefonia">Telefonia</option>
                        <option value="Computadores">Computadores</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Utensílios para casa">Utensílios para casa</option>
                        <option value="Casa e decoração">Casa e decoração</option>
                        <option value="Bolsas e calçados">Bolsas e calçados</option>
                        <option value="Jóias e relógios">Jóias e relógios</option>
                        <option value="Saúde e beleza">Saúde e beleza</option>
                        <option value="Pets">Pets</option>
                        <option value="Brinquedos e hobbies">Brinquedos e hobbies</option>
                        <option value="Esportes">Esportes</option>
                        <option value="Ferramentas e construção">Ferramentas e construção</option>
                    </select>
                </div>

                {/*
                <label htmlFor="subcategory">Subcategoria</label>
                <input name="subcategory" onChange={updateFormData}/>
                */}
                <div className="FormField">
                    <label className="FormField-label" htmlFor="attributes">Atributos (Ex: tamanho:P,M,G;) (máximo 4)</label>
                    <div className='FormField-inputs'>
                        {
                            new Array(4).fill(0,0,4).map((value, index)=>
                                <input 
                                    name="attributes" 
                                    key={JSON.stringify(productToBeEdited?.attributes[index])?JSON.stringify(productToBeEdited?.attributes[index]):"undefinedAttribute"+index} 
                                    defaultValue={convertAttributeToString(productToBeEdited?.attributes[index])}
                                    onChange={(e)=>updateFormDataAttributes(e,index)}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="midias">Mídias (Ex: azul:www.google.com;) (máximo 10)</label>
                    <div className='FormField-inputs'>
                        {
                            new Array(10).fill(0,0,10).map((value, index)=>
                                <input 
                                    name="midias" 
                                    key={JSON.stringify(productToBeEdited?.midias[index])?JSON.stringify(productToBeEdited?.midias[index])+index:"undefinedMidia"+index}
                                    defaultValue={convertMidiaToString(productToBeEdited?.midias[index])}
                                    onChange={(e)=>updateFormDataMidias(e,index)} 
                                />
                            )
                        }
                    </div> 
                </div>         

                <div className="FormField">
                    <label className="FormField-label" htmlFor="providerURL">Link do provedor</label>
                    <input name="providerURL" onChange={updateFormData} defaultValue={productToBeEdited?.providerURL}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="price">Preço</label>
                    {(productToBeEdited?.price !== null)?
                        <input name="price" type="number" onChange={updateFormData} defaultValue={productToBeEdited?.price}/>
                        :
                        <input name="price" type="number" onChange={updateFormData}/>
                    }
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="comparisonPrice">Comparação de preço</label>
                    {(productToBeEdited?.comparisonPrice !== null)?
                        <input name="comparisonPrice" type="number" onChange={updateFormData} defaultValue={productToBeEdited?.comparisonPrice}/>
                        :
                        <input name="comparisonPrice" type="number" onChange={updateFormData}/>
                    }
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="costPerProduct">Custo por produto</label>
                    {(productToBeEdited?.costPerProduct !== null)?
                        <input name="costPerProduct" type="number" onChange={updateFormData} defaultValue={productToBeEdited?.costPerProduct}/>
                        :
                        <input name="costPerProduct" type="number" onChange={updateFormData}/>
                    }
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="sales">Número de vendas</label>
                    {(productToBeEdited?.sales !== undefined) &&
                        <input name="sales" type="number" onChange={updateFormData} defaultValue={productToBeEdited?.sales}/>
                    }
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="tags">Tags (Ex: roupa,gola;)</label>
                    <textarea 
                        cols={30} 
                        rows={5}
                        className="Tags"
                        name="tags"
                        onChange={updateFormDataTags}
                        defaultValue={convertTagsToString(productToBeEdited?.tags)}
                    ></textarea>
                </div>

                <button className="Submit-button" type="submit">Salvar</button>
                
                <div className="ServerResponse">
                    {editProductQuery.data?.message}
                </div>

            </form>

        </div>
    );
}
