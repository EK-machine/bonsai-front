'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticlesThunk, getAllBonsaisThunk, getAllInstrumentsThunk, getAllPotsThunk, getAllServicesThunk, getAllSoilsThunk } from '../../redux/slices/index';
import { AppDispatch, RootState } from '../../types/index';
import { AdminLayout } from '../components/index';
import styles from './page.module.css';

export default function BroAdmin() {
    const [activeNav, setActiveNav] = useState<number>(0);
    const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);
    const accessToken = useSelector((state: RootState) => state.admin.accessToken);
    const bonsais = useSelector((state: RootState) => state.bonsais.bonsais);
    const articles = useSelector((state: RootState) => state.articles.articles);
    const instruments = useSelector((state: RootState) => state.instruments.instruments);
    const pots = useSelector((state: RootState) => state.pots.pots);
    const services = useSelector((state: RootState) => state.services.services);
    const soils = useSelector((state: RootState) => state.soils.soils);

    const dispatch = useDispatch<AppDispatch>()
    const { push } = useRouter();

    const navHandler = (ind: number) => {
        setActiveNav(ind);
        if (ind === 0 && bonsais.length === 0) dispatch(getAllBonsaisThunk());
        if (ind === 1 && soils.length === 0) dispatch(getAllSoilsThunk());
        if (ind === 2 && pots.length === 0) dispatch(getAllPotsThunk());
        if (ind === 3 && instruments.length === 0) dispatch(getAllInstrumentsThunk());
        if (ind === 4 && services.length === 0) dispatch(getAllServicesThunk());
        if (ind === 5 && articles.length === 0) dispatch(getAllArticlesThunk());
    }

    useEffect(() => {
        if (!accessToken && !loggedIn) {
            push('/');
        }
    }, [accessToken, loggedIn, push]);

    useEffect(() => {
        navHandler(0);
    }, []);

    return (
        <div className={styles.brologin_page}>
            <AdminLayout setActiveNav={navHandler} activeNav={activeNav}>
                <>{activeNav}</>
            </AdminLayout>
        </div>
    )
}