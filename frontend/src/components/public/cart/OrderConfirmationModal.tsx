'use client';

import { Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

interface OrderConfirmationModalProps {
  show: boolean;
  onClose: () => void;
}

export default function OrderConfirmationModal({ show, onClose }: OrderConfirmationModalProps) {
  const router = useRouter();

  const handleGoToOrders = () => {
    onClose(); // opcional: cerrar modal antes de redirigir
    router.push('/myOrders');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Encargo confirmado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Revisa tu bandeja de entrada del correo para ver los detalles del encargo.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleGoToOrders}>
          Ver mis encargos
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
