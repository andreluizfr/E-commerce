type Rating = {
    id: string;
    userId: string;
    productId: string;
    variation: {
        [key: string]: string | undefined;
    };
    rating: number;
    comment: string;
    hasMidia: boolean;
    midias: {type: string, url: string}[];
    created_at: Date;
};

export default Rating;