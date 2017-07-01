using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TakeATrip.Models
{
    public class AttractionsSearchModel
    {
        public Attractions Attr { get; set; }
        public List<Attractions> AttrList { get; set; }
    }
}