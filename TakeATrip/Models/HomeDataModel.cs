using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TakeATrip.Models
{
    public class HomeDataModel
    {
        public int SelectedCatId { get; set; }
        public IEnumerable<SelectListItem> CatList { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}