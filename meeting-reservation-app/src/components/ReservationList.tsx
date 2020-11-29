import * as React from 'react';
import ReservationItem from './ReservationItem';
import { RoomReservation } from '../services/reservation.mapping';
import { Container, Row, Col } from 'react-bootstrap';

interface ReservationListProps {
    reservations: RoomReservation[];
    onDeleteReservation: (roomNumber: string, startHour: string) => void;
}

const ReservationList : React.FC<ReservationListProps> = ({reservations, onDeleteReservation}) => {

    return (
        <Container>
            <Row className="itemrow">
            <Col className="itemcol">
            Room Name
            </Col>
            <Col className="itemcol">
            Room Number
            </Col>
            <Col className="itemcol">
            StartHour
            </Col>
            <Col xs={6} md={4} className="itemcol">
            </Col>
        </Row>
            {reservations.map(roomSlot =>
                <ReservationItem  slot={roomSlot} onDeleteClick={onDeleteReservation}/>
            )}
      </Container>
        );
}


export default ReservationList;