using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;
using ServerApp.Models;
using System.IO;


namespace ServerApp.Controllers
{
    public class AccountController : Controller
    {
        private const string adminUser = "hr67";
        private const string adminPassword = "2209";

        private readonly ILogger _logger;
        IMyLogger _mylogger;

        public AccountController(ILogger<HomeController> logger, IMyLogger mylogger)
        {
            _logger = logger;
            _mylogger = mylogger;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel creds,
                                               string returnUrl)
        {
            /*            HrEmbrosLogger hrembros_log = new HrEmbrosLogger();
                        hrembros_log.WriteLog(creds.Name + ":" + creds.Password);*/

            if ((creds.Name == adminUser) && (creds.Password == adminPassword))
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "MyLogger.txt");
                //Server.MapPath("~/Files/") + EmbFile;

                //Read the File data into Byte Array.
                byte[] bytes = System.IO.File.ReadAllBytes(path);

                //Send the File to Download.
                return File(bytes, "application/octet-stream", "MyLogger.txt");

            }
            else
            {
             /*   HrEmbrosLogger hrembros_log = new HrEmbrosLogger();
                hrembros_log.WriteLog(HttpContext, "Incorrect admin authentication " + creds.Name + ":" + creds.Password);*/
                _mylogger.WriteLog(HttpContext, "Incorrect admin authentication " + creds.Name + ":" + creds.Password);
                return View(creds);
            }

        }
    }

    public class LoginViewModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
    }
}