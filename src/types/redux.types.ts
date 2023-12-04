import { ApplicationDispatch, RootReducerState } from '../redux/store/store';

export enum SliceStateStatus {
    Loading = 'Loading',
    Fulfilled = 'Fulfilled',
    Rejected = 'Rejected'
}

export interface RootState extends RootReducerState {}
export interface AppDispatch extends ApplicationDispatch {}

export interface UserStateInitial {
    status: string;
    loggedIn: boolean;
    errors: ErrorObj[];
    accessToken: string;
    refreshBaseTime: number;
    registerMessage: string;
}

export interface ErrorObj {
    property: string;
    message: string;
}