'use client';

import React from 'react';
import { ErrorObj } from '../../../types/index';
import { getAdminErrors } from '../../../utils/index';
import styles from './modal-errors.module.css';

export interface IModalErrors {
    errors: ErrorObj[];
    name: string;
}

export const ModalErrors: React.FC<IModalErrors> = ({ name, errors }) => {
    return (
        <>
            {getAdminErrors(name, errors).map(element => {
                return (
                    <div className={styles.err_message_wrapper} key={element}>{element}</div>
                    )
                })}
        </>
    )
}
