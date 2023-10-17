using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace HrEmbros
{
    struct IpInfo
    {
        public string ip;
        public bool is_not_allowed;
    }

    public class HrEmbrosLogger
    {
        //string logFile = @"Log\hrembros_log.txt";
        //string logFile = Path.Combine(Directory.GetCurrentDirectory() + "\\Log\\","hrembros_log.txt");

        private string logFile = "hrembros_log.txt";
        string[] not_allowed = { "46.10.", "87.126.", "90.154.", "151.251.", "66.249."};

        public HrEmbrosLogger()
        {
            
            if (!(File.Exists(logFile)))
            {
                File.Create(logFile);
            }
        }

        private IpInfo GetUserIP(Microsoft.AspNetCore.Http.HttpContext context)
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

        public static void Log(string logMessage, TextWriter w)
        {
            w.Write($"{DateTime.Now}");
            w.WriteLine($"  :{logMessage}");
            w.WriteLine("-----------------");
        }
    }
}

