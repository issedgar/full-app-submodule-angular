export interface StoreCreate {
    name:     string;
    address: string;
}

export interface StoreUpdate {
    name?:     string;
    address?: string;
}

export interface Store extends StoreCreate {
    id: number;
}



