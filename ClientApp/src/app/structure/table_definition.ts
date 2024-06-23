import * as $ from 'jquery';

export let data = [{ 'employeeId': 1, 'name': 'Hristo', 'city': 'Gabrovo' },
{ 'employeeId': 2, 'name': "Simeon", 'city': 'Ruse' },
{ 'employeeId': 3, 'name': "Ivan", 'city': 'Plovdiv' }]

export let columns = [{ 'data': 'select', 'title': "Select" },
{ 'data': 'employeeId', 'title': 'Id' },
{ 'data': 'name', 'title': 'Name' },
    { 'data': 'city', 'title': 'City' }]

export let product_data =
    [
        { 'pId': 1, 'name': 'Hristo', 'size': 'Gabrovo' },
        { 'pId': 1, 'name': 'Hristo', 'size': 'Gabrovo' },
        { 'pId': 1, 'name': 'Hristo', 'size': 'Gabrovo' }]


export let product_columns = [
{'data': 'select', 'title': 'Select' },
{'data': 'pId', 'title': 'Id'},
{'data': 'name', 'title': 'Name'},
{'data': 'size', 'title': 'Size'}]


interface IJQDataTable {
    rowClick(self): void;
    updateCheckBox(new_selection: string[]): void;
}

export class JQDataTable implements IJQDataTable {
    tableId: string;
    tableAPI: any;
    ajaxUrl: string
    repo: any;
    public rowClick(self): void {
        let row_data = this.tableAPI.row(self).data();
        let is_find_id = Boolean(this.repo.selected_rows.find(x => x === row_data.pId.toString()));
        let new_selected_rows: string[] = [];
        if (is_find_id) {
            new_selected_rows = this.repo.selected_rows.filter(x => x !== row_data.pId.toString());
        } else {
            new_selected_rows = this.repo.selected_rows;
            new_selected_rows.push(row_data.pId.toString())
        }
        this.updateCheckBox(new_selected_rows);
        this.repo.selected_rows = new_selected_rows;
    }

    public updateCheckBox(new_selection: string[]): void {
        let check_bs: any = $("tbody input[type = \"checkbox\"");
        Array.from(check_bs).map(function (check_b: any)
        {
            let is_find_id = Boolean(new_selection.find(id => id === check_b.id));
            if (is_find_id)
                check_b.checked = true;
            else
                check_b.checked = false;
        })
    }

    constructor(tId: string, tAPI: any, ajUrl: string, repo: any) {
        this.tableId = tId;
        this.ajaxUrl = ajUrl;
        this.tableAPI = tAPI;
        this.repo = repo;
    }
}