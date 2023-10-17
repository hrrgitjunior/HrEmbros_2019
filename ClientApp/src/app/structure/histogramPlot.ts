import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import * as Highcharts from 'highcharts';
import { Options, chart } from "highcharts";
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
/*require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);*/
let chartHolder;


@Component({
    selector: "histogram-plot",
    templateUrl: "./histogramPlot.Component.html"

})

export class HistogramPlotComponent {
    options: any;
    constructor(private repo: Repository,
        private router: Router,
        private _route: ActivatedRoute,
        private http: HttpClient) {
    }
    ngOnInit() {
        
    }
    ngAfterViewInit() {
        this.create_plot();
    }
    create_plot() {
        let that = this;
        this.http.get("api/histgramchartplot/histogramplot")
            .subscribe((response:any) =>
            {
                //response.plot.chart.renderTo = "container";
                that.options = response;
                that.options.chart.renderTo = "container";
                var my_chart = Highcharts.chart('container', that.options);
            });
    }

}

    
