import { RoomDTO, Slot, ReservationDTO, RemoveReservationDTO } from "./typing.dto";

export interface RoomReservation {
    roomName: string;
    roomNumber: string;
    user: string;
    startHour: string;
};

export interface RoomAvailability{
  isBusyNow: boolean;
  roomName: string;
  roomNumber: string;
}

const getListSlot = (slots: Slot[], room: RoomDTO, currentUserName: string): RoomReservation[]=> {
    
    return slots.filter(slot => !slot.isAvailable && slot.name=== currentUserName)
                .map(slot => {return {user: slot.name, startHour: slot.hour, roomNumber:room.roomNumber, roomName: room.name}; });
}
export const getAllslotsByUsers = (roomDtos: RoomDTO[], currentUserName: string): RoomReservation[] => {

   const result =  roomDtos.flatMap(room => getListSlot(room.slots, room, currentUserName))
   return result;
};

export const getcurrentSlotForEachRoom = (roomDtos: RoomDTO[]): RoomAvailability[] => {
    const result =  roomDtos.map(room => {return {roomName: room.name, roomNumber: room.roomNumber, isBusyNow: room.slots.filter(slot => !slot.isAvailable).length > 0};});
    return result;
}

export const getSavingReservtionDTO = (room: RoomAvailability, hour: string, user: string): ReservationDTO => (
 {
        roomNumber: parseInt(room.roomNumber),
        timeSlot: parseInt(hour),
        userName: user
 });

export const getRemoveReservationDTO = (roomNumber: string, hour: string): RemoveReservationDTO => (
{
           roomNumber: parseInt(roomNumber),
           timeSlot: parseInt(hour),
    });
