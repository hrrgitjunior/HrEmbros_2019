using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HrEmbros.Models;
//using HrEmbros.DependencyInjection;

namespace HrEmbros.Controllers
{


    [Route("api/categories")]
    [ApiController]

    public class CategoriesController : ControllerBase
    {
        //public string[] categories = { "Начало", "Текст", "Фолк/кръстат бод", "Фото" };
        //private IShoppingCartService _shoppingCartService;
        public List<Category> categories = new List<Category>
            { new Category {CId = "Lettering", Name = "Текст"},
              new Category {CId = "Cross", Name = "Фолк/Кръстат бод" },
              new Category {CId = "Photo", Name = "Фото бод" },
              new Category {CId = "Adobe", Name = "Adobe Ai" },
              new Category {CId = "Product_list", Name = "Списък с продукти" },
              new Category {CId = "Histogram_plot", Name = "Статистика" }};


//        public CategoriesController(IShoppingCartService shoppingCartService)
        public CategoriesController()
        {
            //_shoppingCartService = shoppingCartService;
        }


        [HttpGet]
        public IActionResult GetCategories()
        {
            //return categories;
            //return Json(categories);
            //return new JsonResult(new { categories = categories, user = (_shoppingCartService as ShoppingCartService).User});
            return new JsonResult(new { categories = categories, user = "" });
            //return new JsonResult(new { foo = "bar", baz = "Blech", emb_id = 10 });
        }

    }
}