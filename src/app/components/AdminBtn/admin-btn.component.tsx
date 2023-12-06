'use client';

import React from 'react';
import styles from './admin-btn.module.css';

export interface IAdminBtn {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string;
    dataOpenName?: string;
    onClick: ((e: React.MouseEvent<HTMLElement>) => void);
}


export const AdminBtn: React.FC<IAdminBtn> = ({onClick, dataOpenName, text, className, type}) => {
    return (
        <button
            type={type}
            data-open-modal-name={dataOpenName ? dataOpenName : ''}
            onClick={(e: React.MouseEvent<HTMLElement>) => onClick(e)}
            className={`${styles.admin_btn} ${className ? className : ''}`}
        >{text}</button>
    )
}
