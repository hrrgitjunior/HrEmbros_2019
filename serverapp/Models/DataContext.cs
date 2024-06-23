using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ServerApp.Models
{
    public class DataContext : DbContext
    {
       public DataContext(DbContextOptions<DataContext> opts)
            : base(opts) { }
            public DbSet<Product> Designs { get; set; }
            public DbSet<DesignPaths> DesignPaths { get; set; }

    }

 /*   public class DataContext2 : DbContext
    {
        public DataContext2(DbContextOptions<DataContext> opts)
             : base(opts) { }
        public DbSet<DesignPaths> DesignPaths { get; set; }
    }*/
}
