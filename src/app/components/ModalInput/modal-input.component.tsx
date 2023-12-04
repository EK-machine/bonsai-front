'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/index';
import { getAdminErrors } from '../../../utils/index';
import styles from './modal-input.module.css';

export interface IModalInput {
    setData: React.Dispatch<React.SetStateAction<string>>
    labelText: string;
    type: string;
    htmFor: string;
    name: string;
}

export const ModalInput: React.FC<IModalInput> = ({setData, labelText, type, htmFor, name}) => {
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
            {getAdminErrors(name, adminErrors).map(element => {
                return (
                    <div className={styles.err_message_wrapper} key={element}>{element}</div>
                    )
                })}
        </div>
    )
}
