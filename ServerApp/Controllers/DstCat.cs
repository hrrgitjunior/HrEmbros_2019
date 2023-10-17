using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HrEmbros.Controllers
{
    class DstCat
    {

        static public readonly sbyte[] dst_bt3 = { 1, 1, 81, -81, -81, 81, 1, 1 };
        static public readonly sbyte[] dst_bt2 = { 3, -3, 27, -27, -27, 27, -3, 3 };
        static public readonly sbyte[] dst_bt1 = { 1, -1, 9, -9, -9, 9, -1, 1 };
        static public char[] bit = new char[9];

 
        static public void convrx(sbyte[] p, byte rd_bt, ref CatObj.TCeForm CeForm)
        {
            byte i, k;
            int c;

            for (i = 0; i <= 7; i++)
            {
                k = 1;
                k = Convert.ToByte(k << i);
                if ((byte)(rd_bt & k) == k)
                    bit[i + 1] = '1';
                else
                    bit[i + 1] = '0';
            }
            for (i = 1; i <= 4; i++)
                if (bit[i] == '1')
                    CeForm.rx = (sbyte)(CeForm.rx + p[i - 1]);
            for (i = 5; i <= 8; i++)
                if (bit[i] == '1')
                    CeForm.ry = (sbyte)(CeForm.ry + p[i - 1]);
        }

        static public void convcmn(sbyte[] p, byte rd_bt, ref CatObj.TCeForm CeForm, ref bool fl_Js)
        {
            byte i, k;
            for (i = 0; i <= 7; i++)
            {
                k = 1;
                k = Convert.ToByte(k << i);
                if ((rd_bt & k) == k)
                    bit[i + 1] = '1';
                else
                    bit[i + 1] = '0';
            }

            for (i = 3; i <= 4; i++)
                if (bit[i] == '1')
                    CeForm.rx = (sbyte)(CeForm.rx + p[i - 1]);

            for (i = 5; i <= 6; i++)
                if (bit[i] == '1')
                    CeForm.ry = (sbyte)(CeForm.ry + p[i - 1]);

            if ((bit[8] == '0') && (bit[7] == '0'))
            {
                if (fl_Js) CeForm.cmn = 0x80; else CeForm.cmn = 0x00; fl_Js = false;
            }

            if ((bit[8] == '1') && (bit[7] == '1'))
                CeForm.cmn = 0x40;

            if ((bit[8] == '1') && (bit[7] == '0'))
            {
                CeForm.cmn = 0x80; fl_Js = true;
            }
        }

        static public void Dekod_Dst(DstFormat DstForm, ref CatObj.TCeForm bdst, ref bool fl_Js)
        {
            bdst.cmn = 0;
            bdst.rx = 0; bdst.ry = 0;

            convrx(dst_bt1, DstForm.dst.ch1, ref bdst);
            convrx(dst_bt2, DstForm.dst.ch2, ref bdst);
            convcmn(dst_bt3, DstForm.dst.ch3, ref bdst, ref fl_Js);
        }


    }
}
