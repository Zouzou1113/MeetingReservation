using NFluent;
using NUnit.Framework;

namespace Domain.Test
{
    class SlotShould
    {
        [Test]
        public void Not_reserve_slot_when_this_one_is_busy()
        {
            var reservationService = new ReservationService();
            var slotShouldBeAvailable = reservationService.GetSlotFor(1,  13);
            Check.That(slotShouldBeAvailable.IsAvailable).IsFalse();

            var reserveSlotFor = reservationService.ReserveSlotFor(1, "Zhang Li", 13);
            Check.That(reserveSlotFor.Hour).IsEqualTo(13);

            var slotShouldBeBusy = reservationService.GetSlotFor(1,  13);
            Check.That(slotShouldBeBusy.IsAvailable).IsTrue();
        }
        
    }
}
