import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindows } from './Modal.styled';

export function Modal({ modalImage, toggleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); /* eslint-disable-line*/

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <Overlay onClick={handleBackDropClick}>
      <ModalWindows>
        <img src={modalImage} alt="LargeImage" />
      </ModalWindows>
    </Overlay>
  );
}

Modal.propTypes = {
  modalImage: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};
