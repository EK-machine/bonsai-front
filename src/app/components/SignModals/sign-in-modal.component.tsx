'use client';

import React from 'react';
import { MODAL } from '../../../consts/modal';
import { ModalPopup, ModalSignIn, ModalSignUp } from '../index';

export const SignModals: React.FC = () => {
    return (
      <>
        <ModalPopup name={MODAL.SIGN_IN} >
          <ModalSignIn />
        </ModalPopup>
        <ModalPopup name={MODAL.SIGN_UP} >
          <ModalSignUp />
        </ModalPopup>
      </>
    );
};