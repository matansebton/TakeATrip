//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TakeATrip.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Websites
    {
        public Websites()
        {
            this.Ranks = new HashSet<Ranks>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }
        public string Logo { get; set; }
        public int Weight { get; set; }
        public int Scale { get; set; }
    
        public virtual ICollection<Ranks> Ranks { get; set; }
    }
}
