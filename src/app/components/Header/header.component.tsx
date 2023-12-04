'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
import logo from '../../../../public/bonsi-logo.svg';
import styles from './header.module.css';

export interface IHeader {
    children: ReactNode;
}

export const Header: React.FC<IHeader> = ({children}) => {
    return (
        <header className={styles.header_body}>
            <div className={styles.header_content_wrapper}>
                <div className={styles.header_logo_wrapper}>
                    <Image
                        className={styles.logo}
                        src={logo}
                        alt='bonsai-logo'
                        width={60}
                        height={60}
                        priority
                    />
                </div>
                <div className={styles.header_nav_wrapper}>{children}</div>
            </div>
        </header>
    )
}
