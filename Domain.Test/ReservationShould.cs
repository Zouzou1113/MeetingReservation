using System;
using NFluent;
using NUnit.Framework;

namespace Domain.Test
{
    public class ReservationShould  
    {
        [Test]
        public void Return_all_rooms_free_when_just_start_reservation_service()
        {
            var reservationService = new ReservationService();

            var allRooms = reservationService.GetAllRooms();

            Check.That(allRooms).ContainsExactly(
                new Room(0), 
                new Room(1), 
                new Room(2),
                new Room(3),
                new Room(4),
                new Room(5),
                new Room(6),
                new Room(7),
                new Room(8),
                new Room(9)
            );
        }

        [Test]
        public void Reserve_room_for_a_slot_when_is_one_is_available()
        {
            var reservationService = new ReservationService();

            var roomFound = reservationService.GetSlotForRoom(5, 16);
            Check.That(roomFound.Slots[16].IsAvailable).IsFalse();

            var room = reservationService.ReserveRoomFor(5, "Zhang Li", 16);
            Check.That(room.Slots[16].IsAvailable).IsTrue();
        }

        [Test]
        public void Remove_reservation_for_a_slot_when_is_one_is_busy()
        {
            var reservationService = new ReservationService();
            
            var room = reservationService.ReserveRoomFor(5, "Zhang Li", 16);
            Check.That(room.Slots[16].IsAvailable).IsTrue();

            reservationService.RemoveReservationFor(5, 16);
            Check.That(room.Slots[16].IsAvailable).IsFalse();
        }
    }
}
