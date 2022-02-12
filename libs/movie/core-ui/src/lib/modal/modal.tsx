import { useEffect, useState } from "react";
import styled from "styled-components";

/* eslint-disable-next-line */
export interface ModalProps {
  isOpen: boolean;
  children?: any;
  width?: string;
}

const Background = styled.div`
  z-index: 999999999;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0 0 0 0;
  display: grid;
  place-items: center;
`;

const Inner = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background.primary};
  border-radius: 10px;
  width: ${({ width = "10" }: ModalProps) => `${width}rem`};
  max-width: 85vw;
`;

export function Modal(props: ModalProps) {
  return props.isOpen ? (
    <Background {...props}>
      <Inner {...props}>{props.children}</Inner>
    </Background>
  ) : null;
}

export default Modal;
