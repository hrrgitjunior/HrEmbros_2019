import { Component } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "text-designs",
    templateUrl: "./textDesigns.component.html"
   
})

export class TextDesignsComponent {
    selectedCategory: string;
    message: string;
    constructor(private repo: Repository,
                private router: Router,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
      this.activeRoute.params.subscribe(params => {
            this.selectedCategory = params.category;
        });
    }

  btnClick = function () {
    this.router.navigate(['/wrapper/designs', "Lettering"], { relativeTo: this.activeRoute });
    };

}
