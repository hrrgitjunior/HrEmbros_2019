import { Component } from '@angular/core';
import { Category } from "../models/navigation";
import { Repository } from "../models/repository";
import { NavigationService } from "../models/navigation.service";
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
    selector: "category-filter",
    templateUrl: "categoryFilter.component.html"
})
export class CategoryFilterComponent {
  public currentCategory: string;
 constructor(public repo: Repository,
        private router: Router,
        private navigServ: NavigationService) {
   this.repo.getCategories();
   this.repo.currentCategory = navigServ.currentCategory;
 }

    get categories(): Category[] {
        return this.repo.categories;
    }

    setCategory(category: string) {
      this.currentCategory = category;
      this.navigServ.currentCategory = category;
    }

 }
