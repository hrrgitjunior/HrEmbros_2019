using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HrEmbros.Models;

namespace HrEmbros.Controllers
{
    public class HighChartsController : Controller
    {
    }

    [Route("api/histgramchartplot")]
    [ApiController]

    public class HistogramChartController : Controller
    {

        [HttpGet("{histogramplot}")]
        public async Task<string> HistogramPlot() // here can without async result
        {
            return await Task.Run(() =>
            {
                HistogramChart histogramChart = new HistogramChart();
                PlotSampleData plotSampleData = new PlotSampleData();
                /*   histogramChart.List_Series.Add(plotSampleData.List_1);
                   histogramChart.List_Series.Add(plotSampleData.List_2);
                   histogramChart.List_Series.Add(plotSampleData.List_2);*/
                histogramChart.List_Series.Add(new List<int> { 1, 2, 3, 1, 4, 3, 4 });
                histogramChart.List_Series.Add(new List<int> { 4, 1, 1, 5, 2, 3, 5 });
                histogramChart.List_Series.Add(new List<int> { 7, 1, 2, 2, 5, 3, 2 });
                string[] cities = new string[3] { "Ruse", "Plovdiv", "Gabrovo" };

                /*
                 * There are 7 programs and three cities: Ruse Plovdiv Gabrovo and
                 * three group series about how many time every program had been downloaded
                  */

                for (int i = 0; i < histogramChart.List_Series.Count; i++)
                {
                    histogramChart.series.Add(
                                            new Serie
                                            {
                                                name = cities[i],
                                                borderWidth = 0,
                                                pointPadding = 0,
                                                groupPadding = 0,
                                                data = (List<int>)histogramChart.List_Series[i]
                                                //data = (List<SampleData>)histogramChart.List_Series[i]
                                            }

                        );
                }
                return Newtonsoft.Json.JsonConvert.SerializeObject(histogramChart);
            });
        }
    }
}

 