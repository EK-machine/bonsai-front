'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { ErrorObj, RootState } from '../../../types/index';
import { ModalErrors } from '../index';
import styles from './modal-input.module.css';

export interface IModalInput {
    setData: React.Dispatch<React.SetStateAction<string>>
    labelText: string;
    type: string;
    htmFor: string;
    name: string;
    outerErrors?: ErrorObj[];
}

export const ModalInput: React.FC<IModalInput> = ({setData, labelText, type, htmFor, name, outerErrors}) => {
    const adminErrors = useSelector((state: RootState) => state.admin.errors);
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setData(e.target.value);
    return (
        <div className={styles.modal_input_wrapper}>
            <div className={styles.input_wrapper}>
                <label htmlFor={htmFor} className={styles.label}>
                    {labelText}
                </label>
                <input name={name} id={htmFor} autoComplete="off" className={styles.input} onChange={inputHandler} type={type} />
            </div>
            <ModalErrors name={name} errors={outerErrors && outerErrors.length > 0 ? outerErrors : adminErrors} />
        </div>
    )
}
