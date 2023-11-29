'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { MODAL } from '../../consts/index';
import { openModal } from '../../redux/slices/modal.slice';
import { EventTargetWithDataSetTagName } from '../../types/index';
import { SignModals } from '../components/index';
import styles from './page.module.css';

export default function BroLogin() {
    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const eTerget = e.target as EventTargetWithDataSetTagName;
        const {dataset: {openModalName}} = eTerget;
        e.preventDefault();
        dispatch(openModal(openModalName));
    }

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