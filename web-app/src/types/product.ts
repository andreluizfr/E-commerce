type Product = {
    productId?: string,
    productStatus?: string,
    title: string,
    description: string,
    midias: {
                url: string,
                attributeValue: string | null
            }[],
    price: number,
    comparisonPrice: number | null,
    costPerProduct?: number | null,
    category: string,
    subcategory?: string | null,
    hasAttributes: boolean,
    attributes: {
                    name: string,
                    values: string[]
                }[] | null
    variation?: {
        [key: string]: string;
    } | null | undefined;
    providerURL?: string,
    tags?: string[] | null,
    rating?: number
    ratingNumbers: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number
    }
};

export default Product;