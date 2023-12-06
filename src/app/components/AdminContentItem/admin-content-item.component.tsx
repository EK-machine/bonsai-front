'use client';

import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal, removeEditBonsai, setEditBonsai } from '../../../redux/slices/index';
import { AppDispatch, Article, Bonsai, EventTargetWithDataSetTagName, Instrument, Pot, Service } from '../../../types/index';
import { getModalImgAlt, getModalName } from '../../../utils/index';
import { AdminBtn, ModalsEdit } from '../index';
import styles from './admin-content-item.module.css';

export interface IAdminContentItem {
    activeNav: number;
    entity?: Bonsai | Article | Instrument | Pot | Service;
}

export const AdminContentItem: React.FC<IAdminContentItem> = ({ activeNav, entity }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (e: React.MouseEvent<HTMLElement>, entity?: Bonsai) => {
        const eTerget = e.target as EventTargetWithDataSetTagName;
        const {dataset: {openModalName}} = eTerget;
        e.preventDefault();
        dispatch(openModal(openModalName));
        if (activeNav === 0) {
            if (entity && Object.values(entity).length > 0) {
                dispatch(setEditBonsai(entity as Bonsai));
            } else {
                dispatch(setEditBonsai({} as Bonsai));
            }
        }
    }

    const addOnCloseAction = () => {
        if (activeNav === 0) {
            dispatch(removeEditBonsai());
        }
    }

    return (
        <li className={styles.admin_content_item_body}>
            {entity && Object.values(entity).length > 0 ? (
                <>
                    <div className={styles.admin_content_item_content}>
                        <Image
                            className={styles.admin_content_item_img}
                            src={`/${entity && Object.keys(entity).length > 0 && entity.img_path_1}`} // change here
                            alt={getModalImgAlt(activeNav, entity) as string}
                            width={80}
                            height={80}
                            priority
                        />
                        <p className={styles.admin_content_item_name}>{entity && Object.keys(entity).length > 0 && entity.name}</p>
                    </div>
                    <AdminBtn dataOpenName={getModalName(activeNav)} text='Изменить' type='button' onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e, entity as Bonsai)} />
                </>
            ) : (
                <div className={styles.admin_content_item_nocontent}>
                    <AdminBtn type='button' text='Создать' dataOpenName={getModalName(activeNav)} onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClick(e)} />
                </div>
            )}
            <ModalsEdit addOnCloseAction={addOnCloseAction} activeNav={activeNav} />
        </li>
    )
}
