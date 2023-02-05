import Category from "./category";

type Product = {
    productId: string,
    title: string,
    description: string,
    midia: string[],
    price: number,
    comparisonPrice: number | null,
    category: Category,
    subcategory: string | null,
};

export default Product;