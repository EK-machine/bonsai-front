'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL } from '../../consts/index';
import { openModal } from '../../redux/slices/modal.slice';
import { AppDispatch, EventTargetWithDataSetTagName, RootState } from '../../types/index';
import { SignModals } from '../components/index';
import styles from './page.module.css';

export default function BroLogin() {
    const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);
    const accessToken = useSelector((state: RootState) => state.admin.accessToken);
    const dispatch = useDispatch<AppDispatch>()
    const { push } = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const eTerget = e.target as EventTargetWithDataSetTagName;
        const {dataset: {openModalName}} = eTerget;
        e.preventDefault();
        dispatch(openModal(openModalName));
    }

    useEffect(() => {
        if (accessToken && loggedIn) {
            push('/broadmin');
        }
    }, [accessToken, loggedIn, push]);

    return (
        <div className={styles.brologin_page}>
            <h1 className={styles.brologin_heading}>Приветствую!</h1>
            <section className={styles.brologin_btns_wrapper}>
                <button className={styles.brologin_btn} onClick={handleClick} data-open-modal-name={MODAL.SIGN_IN}>Войти</button>
                <button className={styles.brologin_btn} onClick={handleClick} data-open-modal-name={MODAL.SIGN_UP}>Зарегистрироваться</button>
            </section>
            <SignModals />
        </div>
    )
}