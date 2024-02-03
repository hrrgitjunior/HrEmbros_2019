using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Models;
using System.IO;


namespace ServerApp.Controllers
{
    [Route("api/embroidery")]
    [ApiController]
    public class EmbroideryController : Controller
    {
        private DataContext context;
        IMyLogger _mylogger;
       

        public EmbroideryController (DataContext ctx, IMyLogger mylogger)
        {
            context = ctx;
            _mylogger = mylogger;
        }
        [HttpGet, DisableRequestSizeLimit]
        [Route("fetchstitches")]

        public async Task<string> fetchstitches([FromQuery] long id)
        {
            return await Task.Run(() =>
            {
                var FilteredProduct = context.Designs
                            .Where(p => p.PId == id)
                            .Select(p => new Product
                            {
                                EmbFile = p.EmbFile
                            }).ToList().First();

                /*HrEmbrosLogger hrembros_log = new HrEmbrosLogger();
                hrembros_log.WriteLog(HttpContext, "Embroidery file = " + FilteredProduct.EmbFile);*/
                _mylogger.WriteLog(HttpContext, "Embroidery file = " + FilteredProduct.EmbFile);

                string dstPath =
                Path.Combine(Directory.GetCurrentDirectory() + "\\wwwroot\\Files\\", FilteredProduct.EmbFile);

                List<DstFormat> dstList = DstFile.ReadDst(dstPath);
                CatObj.FCatStArray.Clear();
                CatObj.LoadFromDstStream(CatObj.FCatStArray, dstList);

                //Thread.Sleep(300);
                List<object> embData = new List<object>();
                embData.Add(CatObj.FCatStArray);
                embData.Add(CatObj.FTitle);
                return Newtonsoft.Json.JsonConvert.SerializeObject(embData);
                //return Json(embData);

                //return Json(new { foo = "bar", baz = "Blech", emb_id = id });

            });
        }

    }
}