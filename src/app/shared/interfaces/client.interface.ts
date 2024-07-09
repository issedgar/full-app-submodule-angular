export interface ClientCreate {
    name:     string;
    lastName: string;
    username: string;
    password: string;
}

export interface ClientUpdate {
    name?:     string;
    lastName?: string;
    username?: string;
    password?: string;
}

export interface Client extends Omit<ClientCreate, 'password'> {
    id: number;
    address: string;
}



