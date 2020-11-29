import * as React from 'react';
import WithMainlayout from './common/Mainlayout';
import { getRoomList, saveNewReservation } from '../services/reservation.service';
import { getcurrentSlotForEachRoom, RoomAvailability } from '../services/reservation.mapping';
import { CardColumns } from 'react-bootstrap';
import RoomItem from './RoomItem';
import ReservationModal from './ReservationModal';
import CommonToast from './common/CommonToast';
import UserContext from './UserContext';
import { get } from 'lodash';


const Reservation : React.FC = () => {
   const [listRooms, setListRoomes] = React.useState([] as RoomAvailability[]);
   const [showModal, setShowModal] = React.useState(false);
   const [showNotification, setShowNotification] = React.useState(false);
   const [actionIsSuccess, setActionIsSuccess] = React.useState(undefined);
   const [selectedRoom, setSelectedRoom] = React.useState({} as RoomAvailability);

    const handleOnClick =(room: RoomAvailability) => {
        setShowModal(true);
        setSelectedRoom(room);
    };

    const currentUserName = React.useContext(UserContext);
    const handleSaveOnClick = (selectedHour: string) => {
        saveNewReservation(selectedRoom, selectedHour, currentUserName)
        .then(_=> {
            setActionIsSuccess(undefined);
        })
        .catch(err => {
            setActionIsSuccess(err);
        })
        .finally(() => {
            setShowNotification(true);
            setShowModal(false);
        });
    }

    React.useEffect(() => {
        getRoomList()
        .then(result => setListRoomes(getcurrentSlotForEachRoom(result)))
        .catch(err => {
            setShowNotification(true);
            setActionIsSuccess(err);
        });
      }, [setListRoomes]);

const errorMessage = !actionIsSuccess ? "Your reservation is saved succesfully." 
                      : get(actionIsSuccess, "status") === 400 ? "this time slot is not available" : "Something was wrong";
    return (
        <>
            <CardColumns>
            {listRooms.map(roomSlot =><RoomItem room={roomSlot} key={ roomSlot.roomNumber+"card"} onClickReserveButton={handleOnClick}/>)}
            </CardColumns>
            <ReservationModal 
                title={`Reversation for the room :${selectedRoom.roomName}`}
                show={showModal} 
                onClickSaving={handleSaveOnClick}
                room={selectedRoom}
                onClose={() => setShowModal(false)}/>
            <CommonToast     
            contentBody={errorMessage}
            contentTitle= {!actionIsSuccess ? "Info": "Error"}
            display= {showNotification}
            onClose= {() => setShowNotification(false)}/>
        </>

        );
}


export default WithMainlayout(Reservation);