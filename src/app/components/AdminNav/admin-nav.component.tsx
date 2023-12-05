'use client';

import React from 'react';
import { ADMIN_NAV } from '../../../consts/index';
import styles from './admin-nav.module.css';

export interface IAdminNav {
    activeNav: number;
    setActiveNav: (ind: number) => void;
}


export const AdminNav: React.FC<IAdminNav> = ({activeNav, setActiveNav}) => {
    return (
        <ul className={styles.admin_nav_body}>
            {ADMIN_NAV.map((el, ind) => (
                <li
                    onClick={() => setActiveNav(ind)}
                    className={`${styles.admin_nav_btn} ${ind === activeNav ? styles.active: ''}`}
                    key={el.title}
                >
                    {el.title}
                </li>
            ))}
        </ul>
    )
}
