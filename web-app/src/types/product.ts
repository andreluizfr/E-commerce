type Product = {
    productId?: string,
    productStatus?: string,
    title: string,
    description: string,
    midias: {
                url: string,
                attributeValue: string | null
            }[],
    price: number | null,
    comparisonPrice: number | null,
    costPerProduct?: number | null,
    category: string,
    subcategory: string,
    hasAttributes: boolean,
    attributes: {
                    name: string,
                    values: string[]
                }[]
    variation?: {
        [key: string]: string;
    } | null;
    providerURL?: string,
    tags: string[],
    rating?: number
    ratingNumbers?: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number
    },
    sales?: number
};

export default Product;