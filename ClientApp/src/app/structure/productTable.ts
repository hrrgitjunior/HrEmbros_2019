import { Component, Input } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "product-table",
    templateUrl: "./productTable.component.html"
   
})

export class ProductTableComponent {
    selectedCategory: string;
    currentPage: number;

    constructor(private repo: Repository,
                private router: Router,
                private _route: ActivatedRoute) {
    }

  
    get products(): Product[] {
        let pageIndex = (this.repo.currentPage - 1) * this.repo.productsPerPage;
        return this.repo.products.slice(pageIndex, pageIndex + this.repo.productsPerPage);
        //return this.repo.products;
    }


    get isLoaded(): boolean {
        return this.repo.isLoaded;
    }

    selectProduct(id: number) {
        this.repo.getProduct(id);
        this.router.navigateByUrl("/embros/detail");
    }
}
