using System;

using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReservationApp.Request;

namespace ReservationApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly ILogger<ReservationController> _logger;
        private readonly ReservationService _reservationService;

        public ReservationController(ILogger<ReservationController> logger, ReservationService reservationService)
        {
            _logger = logger;
            _reservationService = reservationService;
        }

        [HttpGet]
        public ActionResult<List<Room>> Get()
        {
            return Ok(_reservationService.GetAllRooms().ToArray());
        }

        [HttpPost]
        public ActionResult ReserveRoom(ReservationRoomRequest request)
        {
            var result = _reservationService.ReserveRoomFor(request.RoomNumber, request.UserName, request.TimeSlot);
            if (result is RoomNotAvailable)
            {
                return BadRequest(result);
            }
           
            return Ok(result);
        }

        [HttpDelete]
        public ActionResult RemoveReserveRoom(RemoveReservationRequest request)
        {
            var result = _reservationService.RemoveReservationFor(request.RoomNumber, request.TimeSlot);
            if (result is RoomNotAvailable)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
