import * as React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { RoomAvailability } from '../services/reservation.mapping';

interface ModalProps {
  title: string;
  show : boolean;
  room: RoomAvailability;
  onClickSaving: (hour: string) => void;
  onClose: () => void;
}


const ReservationModal: React.FC<ModalProps> = ({title, show, room, onClickSaving, onClose}) => {
  const textInput = React.createRef<HTMLInputElement>();

  const handleOnSaving = (event: any) => {
    if(textInput.current) {
      onClickSaving(textInput.current.value);
    }
  }
  
    return (
        <Modal show={show} onHide={() => onClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group>
                <Form.Label>User</Form.Label>
                <Form.Control type="text" placeholder="ZHANG" readOnly  />
              </Form.Group>
              <Form.Group>
                <Form.Label>Room </Form.Label>
                <Form.Control type="text" placeholder={room.roomNumber} readOnly  />
              </Form.Group>

              <Form.Group controlId="form">
                <Form.Label>Hours</Form.Label>
                <Form.Control type="text" placeholder="number" 
                 ref={textInput}/>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => onClose()}>
                Close
              </Button>
              <Button variant="primary" onClick={handleOnSaving}>
                Save Changes
              </Button>
            </Modal.Footer>
         </Form>
        </Modal>
    );
}

export default ReservationModal;
