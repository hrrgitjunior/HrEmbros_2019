using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace ServerApp.Models
{
    public class MyDependencyInjection
    {
    }

    public interface ILog
    {
        void info(string str);
    }

    class MyConsoleLogger : ILog
    {
        public void info(string str)
        {
            Console.WriteLine(str);
        }
    }


    public struct IpInfo
    {
        public string ip;
        public bool is_not_allowed;
    }

    public interface IMyLogger
    {
        IpInfo GetUserIP(Microsoft.AspNetCore.Http.HttpContext context);
        void WriteLog(Microsoft.AspNetCore.Http.HttpContext context, string log_text);
        void Log(string logMessage, TextWriter w);
    }

    public class MyLogger: IMyLogger
    {
        //string logFile = @"Log\hrembros_log.txt";
        //string logFile = Path.Combine(Directory.GetCurrentDirectory() + "\\Log\\","hrembros_log.txt");

        private string logFile = "MyLogger.txt";
        string[] not_allowed = { "46.10.", "87.126.", "90.154.", "151.251.", "66.249." };

        public MyLogger()
        {

            if (!(File.Exists(logFile)))
            {
                File.Create(logFile);
            }
        }

        public IpInfo GetUserIP(Microsoft.AspNetCore.Http.HttpContext context)
        {
            //TODO Can I get remote client ip addres;
            IpInfo ipInfo;
            ipInfo.ip = Convert.ToString(context.Connection.RemoteIpAddress);
            ipInfo.is_not_allowed = false;

            for (int i = 0; i <= not_allowed.Length - 1; i++)
            {
                ipInfo.is_not_allowed = ipInfo.ip.Contains(not_allowed[i]);
                if (ipInfo.is_not_allowed)
                {
                    break;
                }

            }
            return ipInfo;
        }



        public async void WriteLog(Microsoft.AspNetCore.Http.HttpContext context, string log_text)
        {
            IpInfo ipInfo = GetUserIP(context);
            if (!ipInfo.is_not_allowed)
            {
                using (StreamWriter w = File.AppendText(logFile))
                {
                    await Task.Run(() => Log(log_text + " :ip = " + ipInfo.ip, w));
                }

            }
            else
            {
                using (StreamWriter w = File.AppendText(logFile))
                {
                    await Task.Run(() => Log(log_text + " :ip = " + ipInfo.ip + " :self or google", w));
                }
            }
        }

        public void Log(string logMessage, TextWriter w)
        {
            w.Write($"{DateTime.Now}");
            w.WriteLine($"  :{logMessage}");
            w.WriteLine("-----------------");
        }
    }
}
