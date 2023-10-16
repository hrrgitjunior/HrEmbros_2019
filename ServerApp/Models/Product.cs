using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HrEmbros.Models
{
 /*   public class Product
    {
        public long PId { get;  set; }
        public string Name { get; set; }
        public string Category { get; set; }
    }*/

    public class Product
    {
        [Key]
        public int PId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Size { get; set; }
        public string ColorCount { get; set; }
        public string StitchCount { get; set; }
        public string Category { get; set; }
        public string UrlSmallImage { get; set; }
        public string UrlBigImage { get; set; }
        public string AltImage { get; set; }
        public string EmbFile { get; set; }
        public bool EnableDownload { get; set; }
        public int Prior { get; set; }
    }

    public class Category
    {
        public string CId { get; set; } //=>[Lettering, Cross]
        public string Name { get; set; } //=>[Текст, Фолк/Кръстат бод]
    }

    public class DataTableProduct
    {
        [Key]
        public int PId { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
    }
}
