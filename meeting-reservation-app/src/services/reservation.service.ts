import { fetchOnly, FetchOptions } from "./fetch";
import { RoomDTO } from "./typing.dto";
import { getSavingReservtionDTO, RoomAvailability, getRemoveReservationDTO } from "./reservation.mapping";

const BASE_URL = '/api/reservation';


export const getRoomList = async (): Promise<RoomDTO[]> => {
    return await fetchOnly<RoomDTO[]>(BASE_URL);
};

export const saveNewReservation = async (room: RoomAvailability, hour: string, user: string): Promise<string> => {
    const RoomSavingDTO = getSavingReservtionDTO(room, hour, user);
    const requestOptions: FetchOptions = {
        method: "POST",
        body: RoomSavingDTO
    }

    return await fetchOnly<string>(BASE_URL, requestOptions);
};

export const deleteReservation = async (roomNumber: string, startHour: string): Promise<string> => {
    const reservationRemoveDTO = getRemoveReservationDTO(roomNumber, startHour);
    const requestOptions: FetchOptions = {
        method: "DELETE",
        body: reservationRemoveDTO
    }

    return await fetchOnly<string>(BASE_URL, requestOptions);
}