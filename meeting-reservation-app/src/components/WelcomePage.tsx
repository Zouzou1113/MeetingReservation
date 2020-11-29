import * as React from 'react';
import WithMainlayout from './common/Mainlayout';
import { getRoomList, deleteReservation } from '../services/reservation.service';
import { getAllslotsByUsers, RoomReservation } from '../services/reservation.mapping';
import EmptyState from './common/EmptyState';
import ReservationList from './ReservationList';
import CommonToast from './common/CommonToast';
import { isEmpty } from 'lodash';
import UserContext from './UserContext';

const WelcomePage : React.FC = () => {
   const [listReservations, setListReservations] = React.useState([] as RoomReservation[]);
   const [showNotification, setShowNotification] = React.useState(false);
   const [actionIsSuccess, setActionIsSuccess] = React.useState(false);
   const currentUserName = React.useContext(UserContext);
   const deleteReservationClick = React.useCallback((roomNumber, startHour) => {
    deleteReservation(roomNumber, startHour)
    .then(result => {
      setShowNotification(true);
      setActionIsSuccess(true);
    })
    .catch(_ => {
      setShowNotification(true);
      setActionIsSuccess(false);
    });
}, []);

   React.useEffect(() => {
    getRoomList()
    .then(result => setListReservations(getAllslotsByUsers(result, currentUserName)))
    .catch(_ => {
      setShowNotification(true);
      setActionIsSuccess(false);
    });
  }, [setListReservations, deleteReservationClick]);

    return (
      <>
       { !isEmpty(listReservations) ?
        <ReservationList reservations={listReservations} onDeleteReservation={deleteReservationClick}/>
        : <EmptyState text={"You have not any reservation room"}/>
       }
        <CommonToast     
            contentBody={actionIsSuccess ? "The action is sucssedfully": "Something was wrong"}
            contentTitle= {actionIsSuccess ? "Info": "Error"}
            display= {showNotification}
            onClose= {() => setShowNotification(false)}/>
      </>
    );
}


export default WithMainlayout(WelcomePage);