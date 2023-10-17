import { Component } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: "product-detail",
    templateUrl: "./productDetail.component.html"

})

export class ProductDetailComponent {
    flLoading: boolean = false;
    constructor(private repo: Repository,
                private router: Router,
                private activeRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        let id = Number.parseInt(this.activeRoute.snapshot.params["id"]);
        if (id) {
            this.repo.getProduct(id);
        } else {
            this.router.navigateByUrl("/");
        }
    }
    get product(): Product {
        return this.repo.product;
    }

    get isLoaded(): boolean {
        return this.repo.isLoaded;
    }

    download(embFile: string) {
        this.repo.download(embFile);
    }

    goBack() {
        this.location.back(); // <-- go back to previous location on cancel
    }
}
