using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace HrEmbros.Controllers
{
    class CatObj
    {
        public struct TAbsPoint
        {
            public int x, y;
        }

        public struct TCCEtitle
        {
            public TAbsPoint AbsSP;
            public int Sz_x, Sz_y;
        }

        public class TCeForm
        {
            public byte cmn;
            public sbyte rx, ry;
        }

  
        static public TCCEtitle FTitle;
        static public List<TCeForm> FCatStArray = new List<TCeForm>();

        static public void LoadFromDstStream(List<TCeForm> CatList, List<DstFormat> DstList)
        {
            int sz, i, Cind;
            TCeForm StiR = null, FirstStiR = null;
            DstFormat StiDst;
            byte LvlCl;
            int Dst_L = 0, Dst_R = 0, Dst_T = 0, Dst_B = 0, Abs_x = 0, Abs_y = 0;
            bool fl_Js, flBeg, flSti;

            fl_Js = false; flBeg = false; flSti = false;

            LvlCl = 0;
            sz = DstList.Count - 1;
            for (i = 0; i <= sz; i++)
            {
                StiDst = DstList[i];
                StiR = new TCeForm();

                DstCat.Dekod_Dst(StiDst, ref StiR, ref fl_Js);

                if (!flBeg) fl_Js = false;

                if ((StiR.rx != 0) || (StiR.ry != 0))
                {
                    if ((StiR.cmn != 0x40) && (!flBeg))
                    {
                        FirstStiR = new TCeForm();
                        FirstStiR.rx = (sbyte)LvlCl;//=0
                        LvlCl += 1;
                        FirstStiR.ry = (sbyte)LvlCl;//=1
                        FirstStiR.cmn = 0x40;
                        FCatStArray.Add(FirstStiR);
                    }
                    flBeg = true;//begin DST Strem;
                }//init flBeg

                if (flBeg)
                {
                    if (StiR.cmn == 0x40)
                    {
                        StiR.rx = (sbyte)LvlCl;
                        LvlCl += 1;
                        StiR.ry = (sbyte)LvlCl;
                    }

                    FCatStArray.Add(StiR);
                    if ((StiR.cmn == 0x00) ||
                        (StiR.cmn == 0x80))
                    {
                        if (!flSti)
                        {
                            Dst_L = StiR.rx; Dst_R = StiR.rx; Abs_x = StiR.rx;
                            Dst_T = StiR.rx; Dst_B = StiR.rx; Abs_y = StiR.ry;
                            FirstStiR = StiR;
                        }
                        else
                        {
                            Abs_x = Abs_x + StiR.rx; Abs_y = Abs_y + StiR.ry;
                            if (Dst_L > Abs_x) Dst_L = Abs_x;
                            if (Dst_R < Abs_x) Dst_R = Abs_x;
                            if (Dst_T < Abs_y) Dst_T = Abs_y;
                            if (Dst_B > Abs_y) Dst_B = Abs_y;
                        }
                        flSti = true;
                    }
                }//Begin
            }//for
            if (flSti)
            {
                FTitle.AbsSP.x = Dst_L * -1;
                FTitle.AbsSP.y = Dst_B * -1;
                FTitle.Sz_x = Dst_R - Dst_L;
                FTitle.Sz_y = Dst_T - Dst_B;
                //   ConvertStiToEmbEl(Dst);*/
            }//flSti
        }

    }
}
