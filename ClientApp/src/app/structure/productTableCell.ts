import { Component, Input } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "product-cell",
    templateUrl: "./productCell.component.html"

})

export class ProductCellComponent {
    @Input() product: Product = null;
    constructor(private repo: Repository) { }

    getAltImage(altImage: string) {
        if (altImage != '' && altImage != null)
            return altImage;
        else
            return "Готов проект за машинна бродерия";
    }
  }
