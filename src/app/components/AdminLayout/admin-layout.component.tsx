'use client';

import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useRefresh } from '../../../hooks/index';
import { logoutThunk } from '../../../redux/slices/index';
import { AppDispatch } from '../../../types/index';
import { Header } from '../index';
import styles from './admin-layout.module.css';

export interface IAdminLayout {
    children: ReactNode
}

export const AdminLayout: React.FC<IAdminLayout> = ({children}) => {
    const dispatch = useDispatch<AppDispatch>();

    useRefresh();

    const logOutHandler = () => {
        dispatch(logoutThunk());
    }

    return (
        <div className={styles.admin_layout_body}>
            <div className={styles.admin_layout_header_wrapper}>
                <Header>
                    <button onClick={logOutHandler} className={styles.logout_btn}>logout</button>
                </Header>
            </div>
            <div className={styles.admin_layout_content_wrapper}>
                <div className={styles.admin_layout_content_nav_wrapper}>navigation</div>
                <div className={styles.admin_layout_content_edit_wrapper}>{children}</div>
            </div>
        </div>
    )
}
