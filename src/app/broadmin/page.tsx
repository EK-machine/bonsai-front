'use client';

import React from "react";
import { useDispatch } from "react-redux";
import { MODAL } from "../../consts/modal";
import { openModal } from "../../redux/slices/modal.slice";
import { EventTargetWithDataSetTagName } from "../../types/index";
import { SignModals } from "./components/sign-in-modal.component";

export default function BroAdmin() {
    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const eTerget = e.target as EventTargetWithDataSetTagName;
        const {dataset: {openModalName}} = eTerget;
        e.preventDefault();
        dispatch(openModal(openModalName));
    }

    return (
        <div>
            <button onClick={handleClick} data-open-modal-name={MODAL.SIGN_IN}>Войти</button>
            <button onClick={handleClick} data-open-modal-name={MODAL.SIGN_UP}>Зарегистрироваться</button>
            <SignModals />
        </div>
    )
}