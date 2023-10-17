using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Runtime.InteropServices;

namespace HrEmbros.Controllers
{
    public struct DstStruct
    {
        public byte ch1;
        public byte ch2;
        public byte ch3;
    }
    public class DstFormat
    {
        public DstStruct dst;
    }

    static class DstFile
    {
       static public List<DstFormat> dstList = new List<DstFormat>();
       static public List<DstFormat> ReadDst(string dstPath)
       {
          // FileStream dstStream = new FileStream(HttpContext.Current.Server.MapPath("~/DstEmb/deep.dst"), FileMode.Open, FileAccess.Read);
           FileStream dstStream = new FileStream(dstPath, FileMode.Open, FileAccess.Read);
           byte[] bytes = new byte[dstStream.Length];
           dstStream.Position = 0x200;
           int numBytesRead = 0;
           int numBytesToRead = (int)dstStream.Length;
           dstStream.Read(bytes, numBytesRead, numBytesToRead);
           int i = 0; dstList.Clear();
           while (i < bytes.Length - 0x200 - 6) // without last two dst records
           {
               DstFormat dstFormat = new DstFormat();
               dstFormat.dst.ch1 = bytes[i];
               dstFormat.dst.ch2 = bytes[i+1];
               dstFormat.dst.ch3 = bytes[i+2];
               dstList.Add(dstFormat);
               i+= 3;
           }
           return dstList;
       }

 
    }

}