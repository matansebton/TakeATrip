using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TakeATrip.Models;

namespace TakeATrip.Controllers
{
    public class TracksController : Controller
    {
        // GET: Tracks
        [HttpPost]
        public ActionResult Index(string[] placesIdArray)
        {
            TracksViewModel model = new TracksViewModel
            {
                placesId = placesIdArray
            };
            return View(model);
        }
    }
}