'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL } from '../../../consts/index';
import { closeModal, nullRegisterMessage, openModal, signUpThunk } from '../../../redux/slices/index';
import { AppDispatch, ErrorObj, RootState } from '../../../types/index';
import { getAdminErrors } from '../../../utils/index';
import styles from '../SignIn/sign-in.module.css';
import { ModalErrors, ModalInput } from '../index';

export const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<ErrorObj[]>([]);

    const adminErrors = useSelector((state: RootState) => state.admin.errors);
    const registerMessage = useSelector((state: RootState) => state.admin.registerMessage);

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!repeatPassword) {
            setRepeatPasswordError([{message: 'Укажите пароль повторно', property: 'repeat_password'}]);
        }
        if (password !== repeatPassword) {
            setRepeatPasswordError([{message: 'Пароли не одинаковы', property: 'repeat_password'}]);
        }
        dispatch(signUpThunk({ email, password }));
    }

    useEffect(() => {
        if (repeatPassword) {
            setRepeatPasswordError([]);
        }
    }, [repeatPassword]);

    useEffect(() => {
        if (registerMessage === 'Успешно') {
            setTimeout(() => {
                setRepeatPasswordError([]);
                dispatch(nullRegisterMessage());
                dispatch(closeModal());
                dispatch(openModal(MODAL.SIGN_IN));
            }, 500)
        }
    }, [registerMessage, dispatch]);

    return (
        <form className={styles.sign_in_body} onSubmit={handleSubmit}>
            <div className={styles.sign_in_wrapper}>
                <h1 className={styles.sign_in_heading}>Зарегистрируйтесь</h1>
                <ModalInput setData={setEmail} labelText={'Email: '} type={'text'} htmFor='email' name={'email'} />
                <ModalInput setData={setPassword} labelText={'Password: '} type={'password'} htmFor='password' name={'password'} />
                <ModalInput
                    type={'password'}
                    htmFor='repeat_password'
                    name={'repeat_password'}
                    setData={setRepeatPassword}
                    labelText={'Repeat password: '}
                    outerErrors={repeatPasswordError}
                />
                {getAdminErrors('common', adminErrors).length > 0 && <div className={styles.input_errors_wrapper}>
                    <h2 className={styles.sign_in_errors_heading}>неудачно</h2>
                    <ModalErrors name={'common'} errors={adminErrors} />
                </div>}
                {registerMessage && <div className={styles.register_message_wrapper}>{registerMessage}</div>}
            </div>
            <button type='submit'>Зарегистрироваться</button>
        </form>
    )
}
