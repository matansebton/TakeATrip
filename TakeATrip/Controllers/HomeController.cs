using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using TakeATrip.Models;

namespace TakeATrip.Controllers
{
    public class HomeController : Controller
    {
        private TakeATripEntitiesConnectionString db = new TakeATripEntitiesConnectionString();

        [HttpGet]
        public ActionResult Index()
        {
            var result = db.Category.Where(c => c.FatherCat == null).Select(c => new SelectListItem { Value = c.Id.ToString(), Text = c.Name });
            HomeDataModel model = new HomeDataModel
            {
                CatList = new SelectList(result,"Value","Text")
            };
            return View(model);
        }

        [HttpPost]
        public ActionResult Index(HomeDataModel model)
        {
            AttractionsViewModel PassModel = new AttractionsViewModel();

            var query = from a in db.Attractions
                        from c in a.Category
                        where a.Category.Where(cc => cc.FatherCat == model.SelectedCatId).Any()
                        select a;

            PassModel.AttrList = new List<Attractions>();

            var cats = db.Category.Where(c => c.FatherCat == model.SelectedCatId).Select(c => new SelectListItem { Value = c.Id.ToString(), Text = c.Name });
            PassModel.CatList = new SelectList(cats, "Value", "Text");
            PassModel.City = model.City;

            foreach (var atr in query)
            {
                var requestUri = string.Format("http://maps.googleapis.com/maps/api/geocode/xml?latlng={0},{1}&sensor=false",atr.Location.Latitude,atr.Location.Longitude);

                var request = WebRequest.Create(requestUri);
                var response = request.GetResponse();
                var xdoc = XDocument.Load(response.GetResponseStream());

                var result = xdoc.Element("GeocodeResponse").Elements("result");
                var Addresses = result.Elements("address_component");
                bool CountryOK = Addresses.Any(a => a.Element("type").Value == "country" && a.Element("long_name").Value == model.Country);
                if (CountryOK)
                {
                    bool CityOk = Addresses.Any(a => a.Element("long_name").Value == model.City);
                    if (CityOk && !PassModel.AttrList.Exists(a => a.Id == atr.Id)) PassModel.AttrList.Add(atr);
                }
            }
            return View("../Attractions/AttrFromHome",PassModel);
        }
        [HttpGet]
        public JsonResult getCountries()
        {
            var list = CultureInfo.GetCultures(CultureTypes.SpecificCultures).
                        Select(p => new RegionInfo(p.Name).EnglishName).
                        Distinct().OrderBy(s => s).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}