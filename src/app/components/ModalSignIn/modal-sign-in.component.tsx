'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_INPUT_TYPES } from '../../../consts/index';
import { clearAdminErrors, closeModal, signInThunk } from '../../../redux/slices/index';
import { AppDispatch, RootState } from '../../../types/index';
import { getAdminErrors } from '../../../utils/index';
import { AdminBtn, ModalErrors, ModalInput } from '../index';
import styles from './modal-sign-in.module.css';

export const ModalSignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const adminErrors = useSelector((state: RootState) => state.admin.errors);
    const accessToken = useSelector((state: RootState) => state.admin.accessToken);
    const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);


    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(signInThunk({ email, password }));
    }

    useEffect(() => {
        if (accessToken && loggedIn) {
            dispatch(clearAdminErrors());
            dispatch(closeModal());
        }
    }, [accessToken, loggedIn, dispatch]);

    return (
        <form className={styles.sign_in_body}>
            <div className={styles.sign_in_wrapper}>
                <h1 className={styles.sign_in_heading}>Войдите в учётную запись</h1>
                <ModalInput value={email} setStringData={setEmail} labelText={'Email: '} type={MODAL_INPUT_TYPES.TEXT} htmFor='email' name={'email'} />
                <ModalInput value={password} setStringData={setPassword} labelText={'Password: '} type={MODAL_INPUT_TYPES.PASSWORD} htmFor='password' name={'password'} />
                {getAdminErrors('common', adminErrors).length > 0 && <div className={styles.input_errors_wrapper}>
                    <h2 className={styles.sign_in_errors_heading}>повторите попытку</h2>
                    <ModalErrors name={'common'} errors={adminErrors} />
                </div>}
            </div>
            <AdminBtn onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} type='button' text='Войти' />
        </form>
    )
}
