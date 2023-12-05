'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { ADMIN_NAV } from '../../../consts/index';
import styles from './admin-nav.module.css';

export interface IAdminNav {
    activeNav: number;
    setActiveNav: Dispatch<SetStateAction<number>>
}


export const AdminNav: React.FC<IAdminNav> = ({activeNav, setActiveNav}) => {
    const clickHandler = (ind: number) => {
        setActiveNav(ind);
    }

    return (
        <ul className={styles.admin_nav_body}>
            {ADMIN_NAV.map((el, ind) => (
                <li
                    onClick={() => clickHandler(ind)}
                    className={`${styles.admin_nav_btn} ${ind === activeNav ? styles.active: ''}`}
                    key={el.title}
                >
                    {el.title}
                </li>
            ))}
        </ul>
    )
}
