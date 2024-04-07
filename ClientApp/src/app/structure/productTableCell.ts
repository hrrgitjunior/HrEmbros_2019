import { Component, Input } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InteractiveImage3DModalComponent } from './interactiveImage3D.modal';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "product-cell",
    templateUrl: "./productCell.component.html"

})

export class ProductCellComponent {
  @Input() product: Product = null;

  constructor(private repo: Repository,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal)
  { }

    getAltImage(altImage: string) {
        if (altImage != '' && altImage != null)
            return altImage;
        else
            return "Готов проект за машинна бродерия";
    }

  openInteractiveImage3D() {
    console.log('Here will open interactive image');
    const modalRef = this.modalService.open(InteractiveImage3DModalComponent);
    modalRef.result.then((color) => {
          }, () => { });
  }

  }
