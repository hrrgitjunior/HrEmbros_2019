using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    public class HomeController : Controller
    {
        ILog _log;
        IMyLogger _mylogger;

        public HomeController(ILog log, IMyLogger mylogger)
        {
            _log = log;
            _mylogger = mylogger;
        }

        public IActionResult Index()
        {
            _log.info("Executing /home/index");
            _mylogger.WriteLog(HttpContext, "Homecontroller-index");
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
