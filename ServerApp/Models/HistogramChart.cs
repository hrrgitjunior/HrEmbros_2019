using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HrEmbros.Models
{
    public class Chart
    {
        public string type;
    }
    public class Title
    {
        public string text;
        public string align;
    }
    public class Subtitle
    {
        public string text;
    }
    public class XAxis
    {
        public string[] categories;
        public Title title;
    }

    public class Labels
    {
        public string overflow;
    }
    public class YAxis
    {
        public int min;
        public Title title;
        public Labels labels;
    }

    public class Tooltip
    {
        public string valueSuffix;
    }

    public class DataLabels
    {
        public bool enabled;
    }

    public class Bar
    {
        public DataLabels dataLabels;
    }

    public class PlotOptions
    {
        public Bar bar;
    }

    public class Legend
    {
        public string layout;
        public string align;
        public string verticalAlign;
        public int x;
        public int y;
        public bool floating;
        public int borderWidth;
        public bool shadow;
        public int symbolRadius;
    }

    /*  public class SampleData
      {
          public double x;
          public double y;
      }*/

    public class Serie
    {
        public string name;
        public int borderWidth;
        public int pointPadding;
        public double groupPadding;
        public List<int> data;
        //public List<SampleData> data;
        public string type;
    }

    public class HistogramChart
    {
        public List<object> List_Series = new List<object>();

        public static string[] genes =
            {"IGHV01-03","IGHV03-25", "IGHV03-72", "IGHV01-18", "IGHV03-13", "IGHV03-or16_12",
            "IGHV03-16", "IGHV_III-47_1", "IGHV03-21", "IGHV03-76", "IGHV07-NL1",
            "IGHV03-71", "IGHV_II-44_2", "IGHV03-09", "IGHV03-64",
            "IGHV01-or15_03", "IGHV03-53", "IGHV03-11", "IGHV04-04",
            "IGHV_II-74_1", "IGHV04-55", "IGHV03-15", "IGHV07-40", "IGHV03-48", "IGHV_II-28_1",
            "IGHV03-43", "IGHV03-33", "IGHV01-68", "IGHV07-27", "IGHV04-28", "IGHV03-or16_07_1" };

        public static string[] programs =
            {"P-1", "P-2", "P-3", "P-4", "P-5", "P-6", "P-7"};

        public Chart chart = new Chart
        {
            type = "column"
        };
        public Title title = new Title
        {
            text = "Histrogram"
        };
        public Subtitle subtitle = new Subtitle
        {
            text = "Source: Hristo Radoev"
        };
        public XAxis xAxis = new XAxis
        {
            categories = programs,
            title = new Title { text = null }
        };
        public YAxis yAxis = new YAxis
        {
            min = 0,
            title = new Title { text = "Sum Frequensy", align = "high" },
            labels = new Labels { overflow = "justify" }
        };
        public Tooltip tooltip = new Tooltip
        { valueSuffix = " " };
        public PlotOptions plotOptions = new PlotOptions
        { bar = new Bar { dataLabels = new DataLabels { enabled = true } } };

        public Legend legend = new Legend
        {
            layout = "vertical",
            align = "right",
            verticalAlign = "top",
            x = -40,
            y = 100,
            floating = true,
            borderWidth = 1,
            shadow = true,
            symbolRadius = 0
        };

        public DataLabels credits = new DataLabels
        {
            enabled = false
        };

        public List<Serie> series = new List<Serie>();

    }

}
