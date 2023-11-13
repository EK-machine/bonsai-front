'use client';

import React from "react";
import { useDispatch } from "react-redux";
import { MODAL } from "../../consts/modal";
import { openModal } from "../../redux/slices/modal.slice";
import { EventTargetWithDataSetTagName } from "../../types/index";
import { SignModals } from './components/index';
import styles from './page.module.css';

export default function BroAdmin() {
    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const eTerget = e.target as EventTargetWithDataSetTagName;
        const {dataset: {openModalName}} = eTerget;
        e.preventDefault();
        dispatch(openModal(openModalName));
    }

    return (
        <div className={styles.broadmin_page}>
            <section className={styles.broadmin_btns_wrapper}>
                <button className={styles.broadmin_btn} onClick={handleClick} data-open-modal-name={MODAL.SIGN_IN}>Войти</button>
                <button className={styles.broadmin_btn} onClick={handleClick} data-open-modal-name={MODAL.SIGN_UP}>Зарегистрироваться</button>
            </section>
            <SignModals />
        </div>
    )
}