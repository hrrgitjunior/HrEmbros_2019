using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HrEmbros.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Server.Kestrel.Core;


namespace HrEmbros.Controllers
{
    public class DataTableAjaxPostModel
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public List<Column> columns { get; set; }
        public Search search { get; set; }
        public Filter filter;
      //  public List<Order> order { get; set; }
    }

    public class Column
    {
        public string data { get; set; }
        public string name { get; set; }
        public bool searchable { get; set; }
        public bool orderable { get; set; }
        public Search search { get; set; }
    }

    public class Search
    {
        public string value { get; set; }
        public string regex { get; set; }
    }

    public class Filter
    {
        public string field;
        public string value;
    }

    public static class ProductLocalData
    {
        public static readonly List<Product> productList = new List<Product>
        {
            new Product {
                PId = 1,
                Category = "Lettering",
                Name = "Lettering 1",
                Description = "Color = 1",
                Size = "108 x 87 mm",
                ColorCount = "1",
                UrlSmallImage = "Images/lettering_1_small.jpg",
                EmbFile = "lettering_1.dst"
            },
            new Product {
                PId = 2,
                Category = "Cross",
                Name = "Cross Art 1",
                Description = "Color = 1",
                Size = "94 x 122 mm",
                ColorCount = "7",
                UrlSmallImage = "Images/art_deco_small.bmp",
                EmbFile = "cross_art_1.dst"
            },
            new Product {
                PId = 3,
                Category = "Cross",
                Name = "Cross Folk 1",
                Description = "Color = 1",
                Size = "94 x 122 mm",
                ColorCount = "2",
                UrlSmallImage = "Images/cross_folk_1_small.bmp",
                EmbFile = "cross_folk_1.dst"
            }
        };
    };

    [Route("api/products")]
    [ApiController]

    public class ProductTableController : Controller
    {
        private DataContext context;
        public ProductTableController(DataContext ctx)
        {
            context = ctx;
        }

        [HttpGet("{category}")]
        public IEnumerable<Product> GetProducts(string category)
        {

            /*List<Product> data = ProductData.productList
                                    .Where(p => p.Category == category)
                                    .Select(p => new Product
                                    {
                                        PId = p.PId,
                                        Name = p.Name,
                                        UrlImage = p.UrlImage
                                    }).ToList();*/

                List<Product> data = context.Designs
                                    .Where(p => p.Category == category)
                                    .OrderBy(p => p.Prior)
                                    .Select(p => new Product
                                    {
                                        PId = p.PId,
                                        Name = p.Name,
                                        UrlSmallImage = p.UrlSmallImage,
                                        AltImage = p.AltImage,
                                        EnableDownload = p.EnableDownload
                                    }).ToList();

            /*Thread.Sleep(1000);*/

            return data;
        }

        [HttpPost("{datatableproducts}")]

        public async Task<IActionResult> Datatableproducts([FromForm] DataTableAjaxPostModel model)
        {

                    DataTableAjaxPostModel dtModel;

                    using (var reader = new StreamReader(Request.Body))
                                {
                                    var body = await reader.ReadToEndAsync();
                                    dtModel = JsonConvert.DeserializeObject<DataTableAjaxPostModel>(body);
                                }


                    List<DataTableProduct> tableData = context.Designs
                                            .OrderBy(p => p.PId)
                                            //.Where(p => p.PId == Int32.Parse(dtModel.filter.value))
                                            .Skip(dtModel.start)
                                            .Take(dtModel.length)
                                            .Select(p => new DataTableProduct
                                            {
                                                PId = p.PId,
                                                Name = p.Name,
                                                Size = p.Size
                                            }).ToList();
            //return data;

            return Json(new { data = tableData, reqbody = dtModel.draw});
          //  return Json(new { data = "OK" });
        }
    }



    [Route("api/product")]
    public class ProductDetailController
    {
        private DataContext context;
        public ProductDetailController(DataContext ctx)
        {
            context = ctx;
        }

        [HttpGet("{id}")]
        public Product GetProduct(long id)
        {
            /*  var FilteredProduct = ProductData.productList
                                      .Where(p => p.PId == id)
                                      .Select(p => new Product
                                      {
                                          PId = p.PId,
                                          Name = p.Name,
                                          UrlImage = p.UrlImage,
                                          Category = p.Category,
                                          Size = p.Size,
                                          ColorCount = p.ColorCount,
                                          EmbFile = p.EmbFile
                                      }).ToList().First();*/

              var FilteredProduct = context.Designs
                                               .Where(p => p.PId == id)
                                               .Select(p => new Product
                                               {
                                                   PId = p.PId,
                                                   Name = p.Name,
                                                   UrlBigImage = p.UrlBigImage,
                                                   AltImage = p.AltImage,
                                                   Category = p.Category,
                                                   Size = p.Size,
                                                   ColorCount = p.ColorCount,
                                                   StitchCount = p.StitchCount,
                                                   EmbFile = p.EmbFile,
                                                   EnableDownload = p.EnableDownload
                                               }).ToList().First();

            /*Thread.Sleep(300);*/

            return FilteredProduct;
        }
    }
}