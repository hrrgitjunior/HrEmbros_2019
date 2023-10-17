import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import 'datatables.net-dt';
import { data, product_data, columns, product_columns, JQDataTable } from "./table_definition";
//import { DataTableResource } from 'angular-4-data-table';
import persons from './raw_data';

import * as $ from 'jquery';

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
    selector: "product-list",
    templateUrl: "./productList.component.html"

})

export class ProductListComponent {
    //dtOptions: DataTables.Settings = {};
    dTable: any = null;
    hTable: any = null;
    jqDataTable: any = null;
    products: Product[];

    constructor(private repo: Repository,
        private router: Router,
        private _route: ActivatedRoute,
        private http: HttpClient) {
    }

    public render_rows(data, type, row) {
        let row_id = row.employeeId;
        return "<input type=\"checkbox\" name=\"employeeId[]\" id = \"" +
            row_id + "\"" + "checked = true>";
    }

  /*  public create_table(): void {
        let sel_rows: any = this.repo.selected_rows;
        this.dTable = $('#example');
        this.hTable = this.dTable.DataTable({
            columnDefs: this.column_defs(),
            columns: columns,
            data: data,
        });
        this.jqDataTable = new JQDataTable("#example", this.hTable, "", this.repo);
        let jqDT = this.jqDataTable;
        this.hTable.on('click', 'tbody tr', function (e) {
            jqDT.rowClick(this);
        })
    }*/

  ngAfterViewInit() {
      console.log("PRODUCT LIST ===")
      this.create_table();
    }


    public create_table(): void {
        const that = this;
        let sel_rows: any = this.repo.selected_rows;
        this.dTable = $('#example');
        this.hTable = this.dTable.DataTable({
            columnDefs: that.column_defs(),
           //pagingType: 'full_numbers',
            pagingType: 'numbers',
            pageLength: 5,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.filter = { field: "pId", value: 10 };
                console.log("AJAX PARAMS ===", dataTablesParameters);
                that.http
                    .post<DataTablesResponse>('/api/products/datatableproducts', dataTablesParameters, {})
                    .subscribe(resp => {
                        that.products = resp.data;

                        callback({
                            recordsTotal: resp.recordsTotal,
                            recordsFiltered: resp.recordsFiltered,
                            data: resp.data,
                        });
                    });
            },
            responsive: true,
            columns: product_columns,
            data: that.products
        });

        that.jqDataTable = new JQDataTable("#example", this.hTable, "", that.repo);
        let jqDT = this.jqDataTable;
        that.hTable.on('click', 'tbody tr', function (e) {
            jqDT.rowClick(this);
        })

    }

    

    public column_defs(): any[] {
        let sel_rows = this.repo.selected_rows;
        let that = this;
        return [{
            'targets': 0,
            'searcheble': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function (data, type, row) {
                let row_id = row.pId.toString();
                let is_find_id = Boolean(that.repo.selected_rows.find(x => x === row_id));
                if (is_find_id)
                    return "<input type=\"checkbox\" name=\"employeeId[]\" id = \"" +
                        row_id + "\"" + "checked = true>";
                else
                    return "<input type=\"checkbox\" name=\"employeeId[]\" id = \"" +
                        row_id + "\"" + ">";
            }

        }]
    }
}



