﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class TakeATripEntitiesConnectionString : DbContext
    {
        public TakeATripEntitiesConnectionString()
            : base("name=TakeATripEntitiesConnectionString")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Ranks> Ranks { get; set; }
        public virtual DbSet<Websites> Websites { get; set; }
        public virtual DbSet<Attractions> Attractions { get; set; }
        public virtual DbSet<Category> Category { get; set; }
    }
}
