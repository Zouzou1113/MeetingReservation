using System;
using System.Collections.Generic;
using Value;

namespace Domain
{
    public class Room: ValueType<Room>
    {
        public string Name => $"room{RoomNumber}";
        public int RoomNumber { get; }
        public List<Slot> Slots{ get; }

        public Room(int roomNumber)
        {
            RoomNumber = roomNumber;
            var slots = new List<Slot>();
            for (var hour = 0; hour < new Slot[24].Length; hour++)
            {
                    slots.Add(new Slot(string.Empty, hour));
            }

            Slots = slots;
        }

        public override string ToString()
        {
            return Name;
        }


        protected override IEnumerable<object> GetAllAttributesToBeUsedForEquality()
        {
            return new object[] { Name };
        }

        public Slot SetSlotFor(string name, int hour)
        {
            foreach (var slot in Slots)
            {
                if (slot.Hour == hour)
                {
                    slot.Name = name;
                    return slot;
                }
            }

            return new SlotNotFound();
        }

        public Slot GetSlotFor(in int hour)
        {
            foreach (var slot in Slots)
            {
                if (slot.Hour == hour)
                {
                    return slot;
                }
            }
            return new SlotNotFound();
        }
    }
}
