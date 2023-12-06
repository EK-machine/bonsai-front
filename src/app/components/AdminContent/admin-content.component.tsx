'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NoCategoryProducts } from '../../../consts/index';
import { Article, Bonsai, Instrument, Pot, RootState, Service, Soil } from '../../../types/index';
import { AdminContentItem } from '../index';
import styles from './admin-content.module.css';

export interface IAdminContent {
    activeNav: number;
}


export const AdminContent: React.FC<IAdminContent> = ({activeNav}) => {
    const [activeEntity, setActiveEntity] = useState<Bonsai[] | Article[] | Instrument[] | Pot[] | Service[] | Soil[]>([]);
    const bonsais = useSelector((state: RootState) => state.bonsais.bonsais);
    const articles = useSelector((state: RootState) => state.articles.articles);
    const instruments = useSelector((state: RootState) => state.instruments.instruments);
    const pots = useSelector((state: RootState) => state.pots.pots);
    const services = useSelector((state: RootState) => state.services.services);
    const soils = useSelector((state: RootState) => state.soils.soils);

    useEffect(() => {
        if (activeNav === 0) setActiveEntity(bonsais);
        if (activeNav === 1) setActiveEntity(soils);
        if (activeNav === 2) setActiveEntity(pots);
        if (activeNav === 3) setActiveEntity(instruments);
        if (activeNav === 4) setActiveEntity(services);
        if (activeNav === 5) setActiveEntity(articles);
    }, [activeNav, bonsais, articles, instruments, pots, services, soils]);

    return (
        <ul className={styles.admin_nav_body}>
            {activeEntity.length > 0 ?
                activeEntity.map(el => (
                    <AdminContentItem
                        key={el.id}
                        entity={el}
                        activeNav={activeNav}
                    />))
                    :   (
                    <div>{NoCategoryProducts}</div>
                )}
            <AdminContentItem activeNav={activeNav} />
        </ul>
    )
}
