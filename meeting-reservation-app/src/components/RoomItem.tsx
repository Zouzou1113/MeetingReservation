import * as React from 'react';
import { Card, Button } from 'react-bootstrap';
import { RoomAvailability } from '../services/reservation.mapping';


interface RoomItemProps {
    room: RoomAvailability;
    onClickReserveButton: (room: RoomAvailability) => void;
}

const RoomItem: React.FC<RoomItemProps> = ({room, onClickReserveButton}) => {
 

    return (
    <Card  border={room.isBusyNow ? "danger": ""} >
    <Card.Header>{room.roomName} - N°{room.roomNumber}</Card.Header>
     <Card.Body>
        <Card.Text>
           capacity : {parseInt(room.roomNumber)+ 5}
        </Card.Text>
        <Card.Text>
         Video conference : yes
        </Card.Text>
    </Card.Body> 
    <Card.Footer>
      <Button variant="primary" onClick={() => onClickReserveButton(room)}>Reserve</Button>
    </Card.Footer>
    </Card>
    );
}
    


export default RoomItem;