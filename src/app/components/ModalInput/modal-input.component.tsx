'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { MODAL_INPUT_TYPES } from '../../../consts/index';
import { ErrorObj, RootState } from '../../../types/index';
import { ModalErrors } from '../index';
import styles from './modal-input.module.css';

export interface IModalInput {
    setStringData?: React.Dispatch<React.SetStateAction<string>>;
    setNumData?: React.Dispatch<React.SetStateAction<number>>;
    setBoolData?: React.Dispatch<React.SetStateAction<boolean>>;
    labelText: string;
    type: string;
    htmFor: string;
    name: string;
    outerErrors?: ErrorObj[];
    value: string | number | boolean;
}

export const ModalInput: React.FC<IModalInput> = ({setStringData, setNumData, setBoolData, labelText, type, htmFor, name, outerErrors, value}) => {
    const adminErrors = useSelector((state: RootState) => state.admin.errors);
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (setStringData) {
            setStringData(e.target.value);
        }
        if (setNumData) {
            setNumData(parseInt(e.target.value));
        }
    };

    const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: {checked} } = e;
        if (setBoolData) {
            setBoolData(checked);
        }
    };
    
    return (
        <div className={styles.modal_input_wrapper}>
            <div className={`${styles.input_wrapper} ${type === MODAL_INPUT_TYPES.CHECKBOX ? styles.check : ''}`}>
                {(type === MODAL_INPUT_TYPES.TEXT || type === MODAL_INPUT_TYPES.PASSWORD) && (<>
                    <label htmlFor={htmFor} className={styles.label}>
                        {labelText}
                    </label>
                    <input value={value as string} name={name} id={htmFor} autoComplete="off" className={styles.input} onChange={inputHandler} type={type} />
                </>)}
                {type === MODAL_INPUT_TYPES.NUMBER && (<>
                    <label htmlFor={htmFor} className={styles.label}>
                        {labelText}
                    </label>
                    <input value={value as number} max={999.99} min={0.01} name={name} id={htmFor} autoComplete="off" className={styles.input} onChange={inputHandler} type={type} />
                </>)}
                {type === MODAL_INPUT_TYPES.TEXTAREA && (<>
                    <label htmlFor={htmFor} className={styles.label}>
                        {labelText}
                    </label>
                    <textarea value={value as string} name={name} id={htmFor} autoComplete="off" className={styles.textarea} onChange={inputHandler} />
                </>)}
                {type === MODAL_INPUT_TYPES.CHECKBOX && (<>
                    <label htmlFor={htmFor} className={styles.label}>
                        {labelText}
                    </label>
                    <input checked={value as boolean} name={name} id={htmFor} autoComplete="off" className={styles.checkbox} onChange={checkboxHandler} type={type} />
                </>)}
            </div>
            <ModalErrors name={name} errors={outerErrors && outerErrors.length > 0 ? outerErrors : adminErrors} />
        </div>
        )
}
