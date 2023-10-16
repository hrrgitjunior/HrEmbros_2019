import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "adobe-designs",
    templateUrl: "./adobeDesigns.component.html"

})

export class AdobeDesignsComponent {
    selectedCategory: string;
    message: string;
    constructor(private repo: Repository,
        private router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.selectedCategory = params.category;
        });
    }

    btnClick = function () {
        this.router.navigate(['/designs', this.selectedCategory]);
    };

}
