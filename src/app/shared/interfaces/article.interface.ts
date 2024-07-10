export interface ArticleCreate {
    code:     string;
    description: string;
    price: number;
    image: string;
    stock: number;
    storeId: number;
}

export interface ArticleUpdate {
    code?:     string;
    description?: string;
    price?: number;
    image?: string;
    stock?: number;
    storeId?: number;
}

export interface Article extends ArticleCreate {
    id: number;
    addItems?: number;
}



