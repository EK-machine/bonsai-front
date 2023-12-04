'use client';

import React from 'react';
import { MODAL } from '../../../consts/modal';
import { ModalPopup, SignIn, SignUp } from '../index';

export const SignModals: React.FC = () => {
    return (
      <>
        <ModalPopup name={MODAL.SIGN_IN} >
          <SignIn />
        </ModalPopup>
        <ModalPopup name={MODAL.SIGN_UP} >
          <SignUp />
        </ModalPopup>
      </>
    );
};