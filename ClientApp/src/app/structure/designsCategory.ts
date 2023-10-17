import { Component, Input } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "designs-category",
    templateUrl: "./designsCategory.component.html"

})

export class DesignsCategoryComponent {
    selectedCategory: string;
    currentPage: number;

    constructor(private repo: Repository,
        private route: Router,
        private _route: ActivatedRoute) {
    }

    get pages(): number[] {
        if (this.repo.isLoaded) {
            return Array(this.repo.pageCount()).fill(0).map((x, i) => i + 1);
        } else {
            return [];
        };
    }

    get viewPages(): boolean {
       if (this.repo.isLoaded && this.repo.pageCount() > 1)
          return true; else return false;
      }
  
}
