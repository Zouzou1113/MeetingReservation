import * as React from 'react';
import { RoomReservation } from '../services/reservation.mapping';
import { Row, Col, Button } from 'react-bootstrap';
import './ReservationItem.css';

interface ReservationItemProps {
    slot: RoomReservation;
    onDeleteClick: (roomnumber: string, startHour: string) => void;
}

const ReservationItem : React.FC<ReservationItemProps> = ({slot, onDeleteClick}) => {

    return (
        <Row className="itemrow">
        <Col className="itemcol">
          {slot.roomName}
        </Col>
        <Col className="itemcol">
        {slot.roomNumber}
        </Col>
        <Col className="itemcol">
        {slot.startHour}
        </Col>
        <Col xs={6} md={4} className="itemcol">
        <Button variant="danger" onClick={() => onDeleteClick(slot.roomNumber, slot.startHour)}>Delete</Button>
        </Col>
      </Row>
    );
}


export default ReservationItem;