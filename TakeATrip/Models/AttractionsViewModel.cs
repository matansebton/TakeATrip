﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TakeATrip.Models
{
    public class AttractionsViewModel
    {
        public List<Attractions> AttrList { get; set; }
        public int SelectedCatId { get; set; }
        public IEnumerable<SelectListItem> CatList { get; set; }
        public string City;
    }
}