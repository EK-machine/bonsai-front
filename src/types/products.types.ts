export interface Bonsai {
    id: number;
    name: string;
    level: string;
    price: number;
    category: string;
    in_stock: boolean;
    descr: string | null;
    img_path_1: string;
    img_path_2: string | null;
    img_path_3: string | null;
}

export interface Article {
    id: number;
    name: string;
    text: string;
    img_path_1: string;
}

export interface Service {
    id: number;
    name: string;
    price: number;
    descr: string | null;
    img_path_1: string;
}

export interface Soil {
    id: number;
    name: string;
    price: number;
    descr: string | null;
    img_path_1: string;
}

export interface Instrument {
    id: number;
    name: string;
    price: number;
    descr: string | null;
    img_path_1: string;
    in_stock: boolean;
}

export interface Pot {
    id: number;
    name: string;
    size: string;
    shape: string;
    color: string;
    price: number;
    descr: string | null;
    img_path_1: string;
    in_stock: boolean;
}