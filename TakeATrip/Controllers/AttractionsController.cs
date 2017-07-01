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
            AttractionsSearchModel model = new AttractionsSearchModel();
            model.AttrList = new List<Attractions>();
            var rand = new Random();
            for (int i=0; i<3; i++)
            {
                model.AttrList.Add(db.Attractions.OrderBy(a => a.Id).Skip(rand.Next(db.Attractions.Count())).First());
            }
            return View(model);
        }
        [HttpPost]
        public ActionResult Index(AttractionsSearchModel model)
        {
            Attractions attr = new Attractions();
            attr = model.Attr;
            attr.Location = db.Attractions.Find(model.Attr.Id).Location;
            attr.Ranks=db.Attractions.Find(model.Attr.Id).Ranks;
            attr.Category = db.Attractions.Find(model.Attr.Id).Category;
            return View("Details", attr);
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
            Attractions attr = new Attractions();
            attr = db.Attractions.Find(model.Id);
            return View(attr);
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
            var result = db.Attractions.Find(id).Ranks.Select(d => new { Name = d.Websites.Name, Rank = d.Rank, Logo = d.Websites.Logo, Weight = d.Websites.Weight, Scale = d.Websites.Scale }).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
