using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ServerApp.Models
{
    public class DesignPaths
    {
        [Key]
        public int Id { get; set; }
        public int DesId { get; set; }
        public string Image3D { get; set; }
        public bool IsImage3D { get; set; }
    }
}
