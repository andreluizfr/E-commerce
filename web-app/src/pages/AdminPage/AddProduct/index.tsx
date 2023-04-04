import './styles.css';

import { useEffect, useState } from 'react';

import AddProductQuery from 'queries/Product/admin/AddProduct';
import refreshToken from 'queries/User/public/RefreshToken';

import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import Product from 'types/product';

export default function AddProduct () : JSX.Element {

    const [formData, setFormData] = useState(
        {
            productStatus: "rascunho",
            title: "",
            description: "",
            midias: [],
            price: null,
            comparisonPrice: null,
            costPerProduct: null,
            category: "Roupas masculinas",
            subcategory: "",
            hasAttributes: false,
            attributes: [],
            providerURL: "",
            tags: []
        } as Product
    );
    const addProductQuery = AddProductQuery(formData);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(formData);
    }, [formData]);
    
    function updateFormDataFromSelect (event: React.ChangeEvent<HTMLSelectElement>) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function updateFormData (event: React.ChangeEvent<HTMLInputElement>) {

        const input = event.target;
        let inputValue = input.value as (string | number);
        const inputType = input.getAttribute("type");

        if(inputType === "number")
            inputValue = Number(inputValue);

        setFormData({
            ...formData,
            [event.target.name]: inputValue
        });
    }
    
    function updateFormDataAttributes (event: React.ChangeEvent<HTMLInputElement>) {

        const input = event.target;
        const inputValue = input.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){
            const pieces = inputValue.substring(0, inputValue.length - 1).split(":");
            const name = pieces[0];
            const values = pieces[1].split(",");

            let exists = false;
            formData.attributes.forEach(attribute=>{
                if(attribute.name === name) exists = true;
            });

            if(exists){
                alert("Atributo já existe");
                input.value = "";
            }
            else{
                setFormData({
                    ...formData,
                    [event.target.name]: [...formData.attributes, {name: name, values: values}],
                    hasAttributes: true
                });
                input.disabled = true;
            }
        }
    }

    function updateFormDataMidias (event: React.ChangeEvent<HTMLInputElement>) {

        const input = event.target;
        const inputValue = input.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){

            const pieces = inputValue.substring(0, inputValue.length - 1).split(":");
            const attributeValue = pieces[0];
            const url = pieces[1] + ":" + pieces[2];

            //se for diferente de none tem que fazer as verificações abaixo antes de adicionar
            if(attributeValue !== "none"){
                let exists = false;
                formData.attributes.forEach(attribute=>{
                    if(attribute.values.includes(attributeValue))
                        exists = true;
                });
                if(!exists){ //se não existir esse atributo na lista de atributs, da alerta e limpa input
                    alert("Esse atributo não existe nesse produto.");
                    input.value = "";
                    return ;
                }

                //checando se já não existe outra midia com mesmo valor attributeValue
                let repeated = false;
                formData.midias.forEach(midia=>{
                    if(midia.attributeValue === attributeValue)
                        repeated = true;
                });

                if(repeated){ //se existir midia com mesmo valor da alerta e limpa input
                    alert("Mídia já adicionada a este atributo.");
                    input.value = "";
                    return ;
                }  
            }

            setFormData({
                ...formData,
                [event.target.name]: [...formData.midias, {attributeValue: attributeValue, url: url}]
            });
            input.disabled = true;
        } 
        
    }

    function updateFormDataTags (event: React.ChangeEvent<HTMLTextAreaElement>) {

        const input = event.target;
        const inputValue = input.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){
            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const tags = refinedInputValue.split(",");

            setFormData({
                ...formData,
                [event.target.name]: tags
            });

            input.disabled = true;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        console.log(formData)
        event.preventDefault();
        addProductQuery.refetch();
    }

     //controladora da resposta da query addProductQuery
     useEffect(()=>{

        if(addProductQuery.data)
            console.log(addProductQuery.data?.message);
 
        if(addProductQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) addProductQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 3000);
                }
            });
        else if(addProductQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 3000);
        }
        else if(addProductQuery.data?.success && addProductQuery.data?.product){
            console.log("Produto adicionado - ", addProductQuery.data.product);
            const serverResponseEl = document.getElementsByClassName("ServerResponse")[0];
            serverResponseEl?.setAttribute("visible", "true");
            setTimeout(()=>{serverResponseEl?.setAttribute("visible", "false")}, 3000);
            setTimeout(()=>window.location.reload(), 3500);
        }
            
    }, [dispatch, addProductQuery, addProductQuery.data]);


    return(
        <div className='AddProduct'>

            <header className='ComponentTitle'>Adicionar um produto</header>

            <form className="AddProduct-form" onSubmit={handleSubmit} noValidate>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="productStatus">Status do produto</label>
                    <select name="productStatus" defaultValue="rascunho" onChange={updateFormDataFromSelect} required>
                        <option value="rascunho">Rascunho</option>
                        <option value="ativo">Ativo</option>
                        <option value="desativado">Desativado</option>
                    </select>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="title">Título</label>
                    <input name="title" onChange={updateFormData} required/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="description">Descrição</label>
                    <input name="description" onChange={updateFormData}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="category">Categoria</label>
                    <select name="category" defaultValue="Roupas masculinas" onChange={updateFormDataFromSelect}>
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
                        <input name="attributes" onChange={updateFormDataAttributes}/>
                        <input name="attributes" onChange={updateFormDataAttributes}/>
                        <input name="attributes" onChange={updateFormDataAttributes}/>
                        <input name="attributes" onChange={updateFormDataAttributes}/>
                    </div>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="midias">Mídias (Ex: azul:www.google.com;) (máximo 10)</label>
                    <div className='FormField-inputs'>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                        <input name="midias" onChange={updateFormDataMidias}/>
                    </div> 
                </div>         

                <div className="FormField">
                    <label className="FormField-label" htmlFor="providerURL">Link do provedor</label>
                    <input name="providerURL" onChange={updateFormData}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="price">Preço (Obs:as casas decimais são com ".")</label>
                    <input name="price" type="number" onChange={updateFormData}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="comparisonPrice">Comparação de preço</label>
                    <input name="comparisonPrice" type="number" onChange={updateFormData}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="costPerProduct">Custo por produto</label>
                    <input name="costPerProduct" type="number" onChange={updateFormData}/>
                </div>

                <div className="FormField">
                    <label className="FormField-label" htmlFor="tags">Tags (Ex:roupa,gola;)</label>
                    <textarea 
                        cols={30} 
                        rows={5}
                        className="Tags"
                        name="tags"
                        onChange={updateFormDataTags}
                    ></textarea>
                </div>

                <button className="Submit-button" type="submit">Salvar</button>
                
                <div className="serverResponse">
                    {addProductQuery.data?.message}
                </div>

            </form>

        </div>
    );
}
