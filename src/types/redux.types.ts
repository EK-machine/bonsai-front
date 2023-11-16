import { ApplicationDispatch, RootReducerState } from '../redux/store/store';

export enum SliceStateStatus {
    Loading = 'Loading',
    Fulfilled = 'Fulfilled',
    Rejected = 'Rejected'
}

export interface UserStateInitial {
    access_token: string;
    status: string;
    error: string[];
}

export interface RootState extends RootReducerState {}
export interface AppDispatch extends ApplicationDispatch {}

export interface UserStateInitial {
    access_token: string;
    status: string;
    error: string[];
}