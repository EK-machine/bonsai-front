import { ApplicationDispatch, RootReducerState } from '../redux/store/store';
import { Article, Bonsai, Instrument, Pot, Service, Soil } from './index';

export enum SliceStateStatus {
    Loading = 'Loading',
    Fulfilled = 'Fulfilled',
    Rejected = 'Rejected'
}

export interface RootState extends RootReducerState {}
export interface AppDispatch extends ApplicationDispatch {}

export interface AdminStateInitial {
    status: string;
    loggedIn: boolean;
    errors: ErrorObj[];
    accessToken: string;
    refreshBaseTime: number;
    registerMessage: string;
}

export interface BonsaiStateInitial {
    bonsais: Bonsai[];
    bonsaiEdit: Bonsai;
    status: string;
    errors: ErrorObj[];
}

export interface ArticleStateInitial {
    articles: Article[];
    status: string;
    errors: ErrorObj[];
}

export interface PotStateInitial {
    pots: Pot[];
    status: string;
    errors: ErrorObj[];
}

export interface ServiceStateInitial {
    services: Service[];
    status: string;
    errors: ErrorObj[];
}

export interface SoilsStateInitial {
    soils: Soil[];
    status: string;
    errors: ErrorObj[];
}

export interface InstrumentStateInitial {
    instruments: Instrument[];
    status: string;
    errors: ErrorObj[];
}

export interface ErrorObj {
    property: string;
    message: string;
}