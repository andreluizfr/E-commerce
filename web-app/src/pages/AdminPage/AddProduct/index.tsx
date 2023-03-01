import './styles.css';

import { useEffect, useState } from 'react';

import AddProductQuery from 'queries/AddProduct';
import refreshToken from 'queries/RefreshToken';

import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';

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
            //subcategory: "",
            hasAttributes: false,
            attributes: [],
            providerURL: null,
            tags: [],
            ratingNumbers: {
                "5": 0,
                "4": 0,
                "3": 0,
                "2": 0,
                "1": 0
            }
        }
    );

    const addProductQuery = AddProductQuery(formData);
    const dispatch = useDispatch();
    //controladora da resposta da query addProductQuery
    useEffect(()=>{
        if(addProductQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) addProductQuery.refetch();
                else {
                    dispatch(removeUser());
                    localStorage.removeItem("x-access-token");
                }
            });
        else if(addProductQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
        }
        else if(addProductQuery.data?.success && addProductQuery.data?.product)
            console.log(addProductQuery.data.product);

    }, [dispatch, addProductQuery, addProductQuery.data]);
    
    
    function updateFormDataFromSelect (event: React.ChangeEvent<HTMLSelectElement>) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function updateFormData (event: React.ChangeEvent<HTMLInputElement>) {

        let value = event.target.value as (string | number);
        const type = (event.target as HTMLElement).getAttribute("type");
        if(type === "number")
            value = Number(value);

        setFormData({
            ...formData,
            [event.target.name]: value
        });
    }
    
    function updateFormDataAttributes (event: React.ChangeEvent<HTMLInputElement>) {

        const inputValue = event.target.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){

            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const pieces = refinedInputValue.split(":");
            const name = pieces[0];
            const values = pieces[1].split(",");

            setFormData({
                ...formData,
                [event.target.name]: [...formData.attributes, {name: name, values: values}]
            });

            setFormData({
                ...formData,
                hasAttributes: true
            });

            (event.target as HTMLElement).setAttribute("disabled", "true");
        }
    }

    function updateFormDataMidias (event: React.ChangeEvent<HTMLInputElement>) {

        const inputValue = event.target.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){

            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const pieces = refinedInputValue.split(":");
            const url = pieces[0];
            const attributeValue = pieces[1];

            setFormData({
                ...formData,
                [event.target.name]: [...formData.midias, {url: url, attributeValue: attributeValue}]
            });

            (event.target as HTMLElement).setAttribute("disabled", "true");
        }

    }

    function updateFormDataTags (event: React.ChangeEvent<HTMLInputElement>) {

        const inputValue = event.target.value;

        if(inputValue.charAt(inputValue.length-1) === ";"){
            const refinedInputValue = inputValue.substring(0, inputValue.length - 1);
            const tags = refinedInputValue.split(",");

            setFormData({
                ...formData,
                [event.target.name]: tags
            });

        }
    }

    function updateFormDataRating (event: React.ChangeEvent<HTMLInputElement>, n: number) {

        const value = Number(event.target.value);

        setFormData({
            ...formData,
            ratingNumbers: {...formData.ratingNumbers, [n]: value}
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        addProductQuery.refetch();
    }


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
                    <label className="FormField-label" htmlFor="midias">Mídias (Ex: www.google.com:azul;) (máximo 10)</label>
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
                    <label className="FormField-label" htmlFor="price">Preço</label>
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
                    <input name="tags" onChange={updateFormDataTags}/>
                </div>

                <div className="FormField">
                    <header className="FormField-label">Quantidade de avaliações</header>

                    <div className='FormField-inputs'>
                        <div>
                            <label className="FormField-label" htmlFor="ratingNumbers5">5 estrelas</label>
                            <input name="ratingNumbers5" onChange={(e)=>updateFormDataRating(e,5)} defaultValue="0" required/>
                        </div>
                        <div>
                            <label className="FormField-label" htmlFor="ratingNumbers4">4 estrelas</label>
                            <input name="ratingNumbers4" onChange={(e)=>updateFormDataRating(e,4)} defaultValue="0" required/>
                        </div>
                        <div>
                            <label className="FormField-label" htmlFor="ratingNumbers3">3 estrelas</label>
                            <input name="ratingNumbers3" onChange={(e)=>updateFormDataRating(e,3)} defaultValue="0" required/>
                        </div>
                        <div>
                            <label className="FormField-label" htmlFor="ratingNumbers2">2 estrelas</label>
                            <input name="ratingNumbers2" onChange={(e)=>updateFormDataRating(e,2)} defaultValue="0" required/>
                        </div>
                        <div>
                            <label className="FormField-label" htmlFor="ratingNumbers1">1 estrela</label>
                            <input name="ratingNumbers1" onChange={(e)=>updateFormDataRating(e,1)} defaultValue="0" required/>
                        </div>
                    </div>
                </div>

                <button className="Submit-button" type="submit">Salvar</button>
                
                <div className="serverResponse">
                    {addProductQuery.data?.message}
                </div>

            </form>

        </div>
    );
}