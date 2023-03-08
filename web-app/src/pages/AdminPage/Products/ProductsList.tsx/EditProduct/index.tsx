import './styles.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';

import EditProductQuery from 'queries/EditProduct';
import refreshToken from 'queries/RefreshToken';

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

    function updateFormDataFromSelect (event: React.ChangeEvent<HTMLSelectElement>) {
        if(productToBeEdited)
            setProductToBeEdited({
                ...productToBeEdited,
                [event.target.name]: event.target.value
            });
    }

    function updateFormData (event: React.ChangeEvent<HTMLInputElement>) {

        const input = event.target;
        const inputValue = input.value as (string | number);
        const type = input.getAttribute("type");

        if(type === "number" && productToBeEdited)
            setProductToBeEdited({
                ...productToBeEdited,
                [event.target.name]: Number(inputValue)
            });

        else if(productToBeEdited)
            setProductToBeEdited({
                ...productToBeEdited,
                [event.target.name]: inputValue
            });
    }
    
    function updateFormDataAttributes (event: React.ChangeEvent<HTMLInputElement>, index: number) {

        const input = event.target;
        const inputValue = input.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){

            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const pieces = refinedInputValue.split(":");
            const name = pieces[0];
            const values = pieces[1].split(",");

            if(productToBeEdited){

                let exists = false;
                productToBeEdited.attributes.forEach(attribute=>{
                    if(attribute.name === name){
                        alert("Atributo já existe");
                        input.value = "";
                        exists = true;
                        return;
                    }
                });

                if(!exists){
                    const attributes = [...productToBeEdited.attributes];
                    attributes[index] = {name: name, values: values};

                    setProductToBeEdited({
                        ...productToBeEdited,
                        [event.target.name]: attributes,
                        hasAttributes: true
                    });

                    input.disabled = true;
                }

            }
            
        }
    }

    function updateFormDataMidias (event: React.ChangeEvent<HTMLInputElement>, index: number) {

        const input = event.target;
        const inputValue = input.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){

            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const pieces = refinedInputValue.split(":");
            const url = pieces[0];
            const attributeValue = pieces[1];

            if(productToBeEdited){

                let exists = false;
                productToBeEdited.midias.forEach(midia=>{
                    if(midia.attributeValue === attributeValue){
                        alert("Mídia já adicionada a este atributo.");
                        input.value = "";
                        exists = true;
                        return;
                    }
                });

                if(!exists){
                    const midias = [...productToBeEdited.midias];
                    midias[index] = {url: url, attributeValue: attributeValue};

                    setProductToBeEdited({
                        ...productToBeEdited,
                        [event.target.name]: midias
                    });

                    input.disabled = true;
                }
            }
        } 

    }

    function updateFormDataTags (event: React.ChangeEvent<HTMLTextAreaElement>) {

        const input = event.target;
        const inputValue = input.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){
            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const tags = refinedInputValue.split(",");

            if(productToBeEdited)
                setProductToBeEdited({
                    ...productToBeEdited,
                    [event.target.name]: tags
                });

            input.disabled = true;
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
            string += midia.url + ":" + midia.attributeValue;

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
            serverResponseEl.setAttribute("visible", "true");
            setTimeout(()=>{serverResponseEl.setAttribute("visible", "false")}, 3000);
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
                    <select name="productStatus" defaultValue={productToBeEdited?.productStatus} onChange={updateFormDataFromSelect} required>
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
                    <select name="category" defaultValue={productToBeEdited?.category} onChange={updateFormDataFromSelect}>
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
                        <input name="attributes" onChange={(e)=>updateFormDataAttributes(e,0)} defaultValue={convertAttributeToString(productToBeEdited?.attributes[0])}/>
                        <input name="attributes" onChange={(e)=>updateFormDataAttributes(e,1)} defaultValue={convertAttributeToString(productToBeEdited?.attributes[1])}/>
                        <input name="attributes" onChange={(e)=>updateFormDataAttributes(e,2)} defaultValue={convertAttributeToString(productToBeEdited?.attributes[2])}/>
                        <input name="attributes" onChange={(e)=>updateFormDataAttributes(e,3)} defaultValue={convertAttributeToString(productToBeEdited?.attributes[3])}/>
                    </div>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="midias">Mídias (Ex: www.google.com:azul;) (máximo 10)</label>
                    <div className='FormField-inputs'>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,0)} defaultValue={convertMidiaToString(productToBeEdited?.midias[0])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,1)} defaultValue={convertMidiaToString(productToBeEdited?.midias[1])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,2)} defaultValue={convertMidiaToString(productToBeEdited?.midias[2])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,3)} defaultValue={convertMidiaToString(productToBeEdited?.midias[3])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,4)} defaultValue={convertMidiaToString(productToBeEdited?.midias[4])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,5)} defaultValue={convertMidiaToString(productToBeEdited?.midias[5])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,6)} defaultValue={convertMidiaToString(productToBeEdited?.midias[6])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,7)} defaultValue={convertMidiaToString(productToBeEdited?.midias[7])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,8)} defaultValue={convertMidiaToString(productToBeEdited?.midias[8])}/>
                        <input name="midias" onChange={(e)=>updateFormDataMidias(e,9)} defaultValue={convertMidiaToString(productToBeEdited?.midias[9])}/>
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
