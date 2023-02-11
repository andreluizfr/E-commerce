import Category from "./category";

type Product = {
    productId: string,
    title: string,
    description: string,
    midias: {
                link: string,
                attributeValue: string | null
            }[],
    price: number,
    comparisonPrice: number | null,
    category: Category,
    subcategory: string | null,
    attributes: {
                    name: string,
                    values: string[]
                }[] | null
    rating: number
    ratingNumbers: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number
    }
};

export default Product;