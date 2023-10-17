using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace HrEmbros.Models
{
    public class DataContext : DbContext
    {
       public DataContext(DbContextOptions<DataContext> opts)
            : base(opts) { }
            public DbSet<Product> Designs { get; set; }
        }
}
