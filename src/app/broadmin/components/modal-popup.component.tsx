'use client';

import React, { JSXElementConstructor, ReactElement, ReactNode, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Icon } from '../../../components/svg/index';
import { closeModal } from '../../../redux/slices/modal.slice';
import { RootState } from '../../../redux/store/store';

export interface IModalPopup {
  children: ReactNode;
  name: string;
}

export const ModalPopup: React.FC<IModalPopup> = memo((props) => {
  const { children, name } = props;

  const activeModal = useSelector((state: RootState) => state.modal.name);

  const dispatch = useDispatch();

  const isVisible = activeModal === name;
  const defaultClassNames = {
    modal: 'white-popup__close-btn',
    closeIcon: 'white-popup__close-btn',
  };

  const handleCloseCB = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <Modal
      center={true}
      open={isVisible}
      closeOnEsc={true}
      focusTrapped={false}
      closeIcon={<Icon.Close/>}
      closeOnOverlayClick={true}
      reserveScrollBarGap={true}
      classNames={defaultClassNames}
      onClose={handleCloseCB}
    >
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {...props});
        })
      }
    </Modal>
  );
});

ModalPopup.displayName = 'ModalPopup';
