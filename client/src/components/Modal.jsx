// Modal.js
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

function CustomModal({ isOpen, onClose, title, children }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" >
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Title:  {children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}

export default CustomModal;
