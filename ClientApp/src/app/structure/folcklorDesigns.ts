import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "folcklor-designs",
    templateUrl: "./folcklorDesigns.component.html"

})

export class FolcklorDesignsComponent {
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
