import { Component, Input } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";
import { NavigationService } from "../models/navigation.service";

@Component({
    selector: "category-products",
    templateUrl: "./categoryProducts.component.html"

})

export class CategoryProductsComponent {
    selectedCategory: string;
    constructor(private repo: Repository,
        private router: Router,
      private _route: ActivatedRoute,
      private navigServ: NavigationService) {
    }

    // It is a parrent component and wrap lettering, cross and photo.
    // Does not execute when there is some of products component,Just watches for changing of route.params
    // It is on Top of DOM objects
    ngOnInit() {
        this._route.params.subscribe(params => {
            this.selectedCategory = params.category;
        });
      
    }

}
