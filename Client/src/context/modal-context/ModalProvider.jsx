import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalPortal } from '@/components/';

export const ModalContext = createContext();
const initialState = { open: false, element: '', title: '', className: '' };

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(initialState);

  const openModal = (element, options = {}) => {
    setModal({
      open: true,
      element,
      title: options.title ?? '',
      className: options.className ?? '',
    });
  };

  const closeModal = () => {
    setModal({ ...initialState });
  };

  const valueMemo = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [modal]
  );

  return (
    <>
      <ModalContext.Provider value={valueMemo}>
        {children}
        <ModalPortal
          show={modal.open}
          title={modal.title}
          handleClose={closeModal}
          className={modal.className}
        >
          {modal.element}
        </ModalPortal>
      </ModalContext.Provider>
    </>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node,
};
