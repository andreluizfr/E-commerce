import { HTMLAttributes } from "react";


interface Props extends HTMLAttributes<HTMLElement> {
    queryObject: {
        status: string;
        category: string;
        keyword: string;
        order: string;
    };
    setQueryObject: React.Dispatch<React.SetStateAction<{
        status: string;
        category: string;
        keyword: string;
        order: string;
    }>>
}

export default function Toolbar ({queryObject, setQueryObject}: Props) : JSX.Element {

    function setKeywordQuery (event: React.ChangeEvent <HTMLInputElement>){
        const keywordValue = (event.target as HTMLInputElement).value;

        setQueryObject({
            ...queryObject,
            keyword: keywordValue
        });
    }

    function setOrderQuery (event: React.ChangeEvent <HTMLSelectElement>){
        const orderValue = (event.target as HTMLSelectElement).value;

        setQueryObject({
            ...queryObject,
            order: orderValue
        });
    }

    return (
        <header className="Toolbar">
            <input className="KeywordInput" placeholder='keyword' onChange={setKeywordQuery}/>
            <select className="OrderSelect" defaultValue="ascendente" onChange={setOrderQuery}>
                <option value="ASC">ascendente</option>
                <option value="DESC">descendente</option>
            </select>
        </header>
    );
} 