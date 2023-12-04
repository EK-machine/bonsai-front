'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAdminErrors, closeModal, signInThunk } from '../../../redux/slices/index';
import { AppDispatch, RootState } from '../../../types/index';
import { getAdminErrors } from '../../../utils/index';
import { ModalErrors, ModalInput } from '../index';
import styles from './sign-in.module.css';

export const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const adminErrors = useSelector((state: RootState) => state.admin.errors);
    const accessToken = useSelector((state: RootState) => state.admin.accessToken);
    const loggedIn = useSelector((state: RootState) => state.admin.loggedIn);
    const { push } = useRouter();


    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signInThunk({ email, password }));
    }

    useEffect(() => {
        if (accessToken && loggedIn) {
            dispatch(clearAdminErrors());
            dispatch(closeModal());
            push('/broadmin');
        }
    }, [accessToken, loggedIn, dispatch, push]);

    return (
        <form className={styles.sign_in_body} onSubmit={handleSubmit}>
            <div className={styles.sign_in_wrapper}>
                <h1 className={styles.sign_in_heading}>Войдите в учётную запись</h1>
                <ModalInput setData={setEmail} labelText={'Email: '} type={'text'} htmFor='email' name={'email'} />
                <ModalInput setData={setPassword} labelText={'Password: '} type={'password'} htmFor='password' name={'password'} />
                {getAdminErrors('common', adminErrors).length > 0 && <div className={styles.input_errors_wrapper}>
                    <h2 className={styles.sign_in_errors_heading}>повторите попытку</h2>
                    <ModalErrors name={'common'} errors={adminErrors} />
                </div>}
            </div>
            <button type='submit'>Войти</button>
        </form>
    )
}
