using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using ServerApp.Models;


namespace ServerApp.Controllers
{
    [Route("api/file")]
    [ApiController]
    public class FileController : Controller
    {
        IMyLogger _mylogger;
        public FileController(IMyLogger mylogger)
        {
            _mylogger = mylogger;
        }


        [HttpGet, DisableRequestSizeLimit]
        [Route("download")]
       // public IActionResult Download(string EmbFile)
   /*     public async Task<IActionResult> download([FromQuery] string file)
        {
            _mylogger.WriteLog(HttpContext, "Download file = " + file);


            //Build the File Path.

            string path = Path.Combine(Directory.GetCurrentDirectory() + "\\wwwroot\\Files\\", file);
            //Server.MapPath("~/Files/") + EmbFile;
   
            //Read the File data into Byte Array.
            byte[] bytes = System.IO.File.ReadAllBytes(path);

            //Send the File to Download.
            return File(bytes, "application/octet-stream", file);
            //return Ok(new { path });
        }*/

        public async Task<IActionResult> download([FromQuery] string file)
        {
            return await Task.Run(() =>
            {
                _mylogger.WriteLog(HttpContext, "Download file = " + file);


                //Build the File Path.

                string path = Path.Combine(Directory.GetCurrentDirectory() + "\\wwwroot\\Files\\", file);
                //Server.MapPath("~/Files/") + EmbFile;

                //Read the File data into Byte Array.
                byte[] bytes = System.IO.File.ReadAllBytes(path);

                //Send the File to Download.
                return File(bytes, "application/octet-stream", file);
                //return Ok(new { path });

            });
        }


    }
}