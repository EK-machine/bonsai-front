'use client';

import Image from 'next/image';
import React from 'react';
import styles from './admin-content-item.module.css';

export interface IAdminContentItem {
    activeNav: number;
    id?: number;
    name?: string;
    img_path_1?: string;
}


export const AdminContentItem: React.FC<IAdminContentItem> = ({ name, img_path_1, activeNav, id }) => {
    const getImgAlt = () => {
        if (activeNav === 0) return `картинка бонсая ${name}`;
        if (activeNav === 1) return `картинка грунта ${name}`;
        if (activeNav === 2) return `картинка горшка ${name}`;
        if (activeNav === 3) return `картинка инструмента ${name}`;
        if (activeNav === 4) return `картинка услуги ${name}`;
        if (activeNav === 5) return `картинка статьи ${name}`;
    }

    return (
        <li className={styles.admin_content_item_body}>
            {id ? (
                <>
                    <div className={styles.admin_content_item_content}>
                        <Image
                            className={styles.admin_content_item_img}
                            src={`/${img_path_1}`} // change here
                            alt={getImgAlt() as string}
                            width={80}
                            height={80}
                            priority
                        />
                        <p className={styles.admin_content_item_name}>{name}</p>
                    </div>
                    <button className={styles.admin_content_change_btn}>Изменить</button>
                </>
            ) : (
                <div className={styles.admin_content_item_nocontent}>
                    <button className={styles.admin_content_create_btn}>Создать</button>
                </div>
            )}
        </li>
    )
}
