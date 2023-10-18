import { Component, Input } from '@angular/core';
import { NgModule } from "@angular/core";
import { Repository } from "../models/repository";
import { NavigationService } from "../models/navigation.service";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "designs-pagination",
    templateUrl: "./designsPagination.component.html"

})

export class DesignsPaginationComponent {
    @Input() pages:  number[] = [];
    constructor(private repo: Repository,
        private router: Router,
        private navigServ: NavigationService) {
    }

  setPage(page: number) {
        console.log("SET PAGE ===");
        this.navigServ.currentPage = page;
    }
}
