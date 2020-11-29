using System.Collections.Generic;

namespace Domain
{
    public class ReservationService
    {
        private readonly List<Room> _rooms;

        public ReservationService()
        {
            var rooms = new List<Room>();
            for (int i = 0; i < 10; i++)
            {
                rooms.Add(new Room(i));
            }

            _rooms = rooms;
        }
        public List<Room> GetAllRooms()
        {
            return _rooms;
        }

        public Slot ReserveSlotFor(int roomNumber, string name, int hour)
        {
            foreach (var room in _rooms)
            {
                if (room.RoomNumber == roomNumber)
                {
                    if (room.Slots[hour].IsAvailable)
                        return room.SetSlotFor(name, hour);
                    else
                        return new SlotNotAvailable();
                }
            }

            return new SlotNotFound();
        }

        public Slot GetSlotFor(int roomNumber, int hour)
        {
            foreach (var room in _rooms)
            {
                if (room.RoomNumber == roomNumber)
                {
                    return room.GetSlotFor(hour);
                }
            }

            return new SlotNotFound();
        }

        public Room ReserveRoomFor(int roomNumber, string name, int hour)
        {
            var slotFound = ReserveSlotFor(roomNumber, name, hour);

            if (slotFound == new SlotNotAvailable())
                return new RoomNotAvailable(roomNumber);

            return _rooms[roomNumber];
        }

        public Room GetSlotForRoom(int roomNumber, int hour)
        {
            var slotFound = GetSlotFor(roomNumber, hour);

            if (slotFound == new SlotNotFound())
                return new RoomNotAvailable(roomNumber);

            return _rooms[roomNumber];
        }

        public Room RemoveReservationFor(int roomNumber, int hour)
        {
            var slotFound = GetSlotFor(roomNumber, hour);

            if (slotFound == new SlotNotFound())
                return new RoomNotAvailable(roomNumber);

            _rooms[roomNumber].Slots[hour].Name = string.Empty;

            return _rooms[roomNumber];
        }
    }
}
