import { Article } from "./article.interface";
import { Client } from "./client.interface";

export interface OrderCreate {
    orderNum: string;
    clientId: number;
    storeId: number;
    orderDetailList: OrderDetailCreate[];
}

export interface OrderDetailCreate {
    count: number;
    total: number;
    articleId: number;
}


export interface Order {
    id: number;
    orderNum: string;
    client: Client;
    ordersDetail: OrderDetail[];
}

export interface OrderDetail {
    id: number;
    count: number;
    total: number;
    article: Article;
}



