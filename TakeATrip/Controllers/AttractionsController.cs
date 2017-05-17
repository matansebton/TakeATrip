using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TakeATrip.Models;

namespace TakeATrip.Controllers
{
    public class AttractionsController : Controller
    {
        private TakeATripEntitiesConnectionString db = new TakeATripEntitiesConnectionString();

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(Attractions model)
        {
            model.Location = db.Attractions.Find(model.Id).Location;
            model.Ranks=db.Attractions.Find(model.Id).Ranks;
            model.Category = db.Attractions.Find(model.Id).Category;
            return View("Details", model);
        }

        [HttpPost]
        public JsonResult GetAttractionList(string Prefix)
        {
            var result = db.Attractions.Select(d => new { Id = d.Id, Name = d.Name }).Where(d => d.Name.StartsWith(Prefix));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Details(Attractions model)
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllAttraction()
        {
            var result = db.Attractions.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult AttrFromHome()
        {
            AttractionsViewModel model = new AttractionsViewModel();
            model.AttrList = db.Attractions.ToList();
            return View(model);
        }

        public ActionResult GetRanksList(int id)
        {
            var result = db.Attractions.Find(id).Ranks.Select(d => new { Name = d.Websites.Name, Rank = d.Rank, Logo = d.Websites.Logo , Weight = d.Websites.Weight, Scale = d.Websites.Scale}).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
