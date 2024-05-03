import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Repository } from "../models/repository";
import { NavigationService } from "../models/navigation.service";

@Component({
  selector: "category-wrapper",
  templateUrl: "categoryWrapper.component.html"
})

export class CategoryWrapperComponent {

  message: string;
  breadcrumbList: Array<any> = [];
  selectedCategory: string;
  constructor(private repo: Repository,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navigServ: NavigationService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.selectedCategory = this.navigServ.currentCategory;
    });
  }

  btnClick = function () {
    this.router.navigate(['/wrapper/designs', this.navigServ.currentCategory], { relativeTo: this.activeRoute });
  };

}
