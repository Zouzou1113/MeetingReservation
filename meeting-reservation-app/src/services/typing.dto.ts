
export interface RoomDTO {
    slots: Slot[];
    roomNumber: string;
    name: string
}

export interface Slot {
  name: string;
  hour: string;
  isAvailable: boolean;
}

export interface ReservationDTO {
  roomNumber: number;
  timeSlot: number;
  userName: string;
}

export interface RemoveReservationDTO {
  roomNumber: number;
  timeSlot: number;
}
