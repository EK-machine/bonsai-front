'use client';

import React from 'react';
import { getModalName } from '../../../utils/index';
import { ModalBonsai, ModalPopup } from '../index';

export interface IModalsEdit {
  activeNav: number;
  addOnCloseAction?: () => void;
}

export const ModalsEdit: React.FC<IModalsEdit> = ({ activeNav, addOnCloseAction }) => {
    return (
      <>
        <ModalPopup addOnCloseAction={addOnCloseAction ? addOnCloseAction : null} name={getModalName(activeNav) as string} >
          <ModalBonsai />
        </ModalPopup>
      </>
    );
};