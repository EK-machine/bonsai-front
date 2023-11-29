import { ApplicationDispatch, RootReducerState } from '../redux/store/store';

export enum SliceStateStatus {
    Loading = 'Loading',
    Fulfilled = 'Fulfilled',
    Rejected = 'Rejected'
}

export interface RootState extends RootReducerState {}
export interface AppDispatch extends ApplicationDispatch {}

export interface UserStateInitial {
    accessToken: string;
    loggedIn: boolean;
    status: string;
    registerMessage: string;
    errors: ErrorObj[];
}

export interface ErrorObj {
    property: string;
    message: string;
}