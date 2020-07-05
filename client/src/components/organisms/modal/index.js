import React from 'react';
import MdModal from '@material-ui/core/Modal';

const Modal = ({ open, children }) => {
  return <MdModal open={open}>{children}</MdModal>;
};


export default Modal