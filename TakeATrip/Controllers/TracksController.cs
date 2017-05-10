using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TakeATrip.Controllers
{
    public class TracksController : Controller
    {
        // GET: Tracks
        public ActionResult Index()
        {
            return View();
        }
    }
}