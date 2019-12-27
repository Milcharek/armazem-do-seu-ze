import React from 'react';
import ReactModal from 'react-modal';
import { Button, Content, Title } from './styles';

// Configurações de estilos do modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Modal = ({ isOpen, onRequestClose, onOpenModal }) => {
  return (
    <>
      <button type="button" onClick={onOpenModal}>
        Finalizar carrinho
      </button>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles} // estiliza o modal de acordo com as propriedades do customStyles
        contentLabel="Example Modal"
      >
        <Title>Compra Finalizada!</Title>
        <Content>
          Obrigado por escolher o <strong>Armazém do Seu Zé</strong>
        </Content>
        <Button type="button" onClick={onRequestClose}>
          Fechar
        </Button>
      </ReactModal>
    </>
  );
};

export default Modal;
