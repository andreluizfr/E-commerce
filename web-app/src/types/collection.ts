import Product from "./product";

type Collection = {
    collectionId?: string,
    title: string,
    description: string,
    products: Product[],
    created_at?: Date;
};

export default Collection;