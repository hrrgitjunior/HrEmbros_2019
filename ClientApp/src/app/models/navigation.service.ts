import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Repository } from "../models/repository";
import { filter, map } from "rxjs/operators";

@Injectable()

export class NavigationService {
    breadcrumbList: Array<any> = [];

    constructor(private repo: Repository, private router: Router,
      private route: ActivatedRoute) {
            router.events
            .pipe(
            filter(event => event instanceof NavigationEnd),
              map(() => this.rootRoute(this.route)),
            filter((route: ActivatedRoute) => route.outlet === 'primary'),)
            .subscribe((route: ActivatedRoute) => {
                this.handleNavigationChange(route);
    })
    }

    private rootRoute(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

  private handleNavigationChange(route) {
    /*    console.log("HANDLE NAVIGATION ROUTE ===", route);
        console.log("HANDLE NAVIGATION CATEGORY ===", route.snapshot.paramMap.get('category'));
        console.log("HANDLE NAVIGATION PAGE ===", route.snapshot.paramMap.get('page'));
        console.log("HANDLE NAVIGATION URL PATH ===", route.url.value);*/

        let routeCategory: string = route.snapshot.paramMap.get('category')
        let routePage: number = route.snapshot.paramMap.get('page');
        let routerList: Array<any>, target: any;



        switch (route.url.value[0].path) {
            case "store":
                if (this.repo.currentCategory != routeCategory)
                {
                    this.repo.currentCategory = routeCategory;
                    this.repo.currentPage = 1; 
                    this.repo.isLoaded = false;
                    this.repo.isLoadedStitches = false;
            }
                this.breadcrumbList.length = 0;     
                break;

            case "introduction":
                this.repo.currentCategory = "";
                this.repo.currentPage = 1; 
                break;

            case "designs":
                if (this.repo.currentCategory != routeCategory)
                {
                    this.repo.currentCategory = routeCategory;
                    this.repo.isLoaded = false;
                    this.repo.isLoadedStitches = false;
                }
                if (!this.repo.isLoaded) {
                    this.repo.getProducts(this.repo.currentCategory);
                    //this.repo.currentPage = 1; 
                    //it sets in repo.getProducts, asynchrounus subscribe
                }
                // set new page
                if (this.repo.currentCategory == routeCategory &&
                    routePage != undefined) {
                    this.repo.currentPage = routePage;
            }
            break;
    }
    if (route.url.value[0].path) {
      let item: string;
      item = route.url.value[0].path;
      const i = this.breadcrumbList.findIndex(e => e.name === item);
      if (i === -1) {
        this.breadcrumbList.push({ name: item, path: ["/category/" + item, this.currentCategory] });
      } else {
        this.breadcrumbList = this.breadcrumbList.slice(0, i+1);
      }

    }

    }

    get currentCategory(): string {
        return this.repo.currentCategory;
    }

  set currentCategory(newCategory: string) {
    if (newCategory == "")
      this.router.navigateByUrl(`/introduction`);
    else {
      //this.router.navigateByUrl(`/store/${newCategory}`)
      this.router.navigate(['/category/store', newCategory], { relativeTo: this.route });

    }
    
    }

    get currentPage(): number {
        return this.repo.currentPage;
    }
    set currentPage(newPage: number) {
        this.router.navigateByUrl(`/category/designs/${this.repo.currentCategory}/${newPage}`);
    }

}
