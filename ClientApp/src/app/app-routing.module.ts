import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from "./structure/mainLayout";
import { StoreLayoutComponent } from "./structure/storeLayout";
import { IntroductionComponent } from "./structure/introduction";
import { CategoryProductsComponent } from "./structure/categoryProducts";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '', component: StoreLayoutComponent,
        children: [
          { path: '', redirectTo: 'introduction', pathMatch: 'full' },
          { path: "store/:category", component: CategoryProductsComponent },
          { path: "introduction", component: IntroductionComponent }
          /* { path: "designs/:category", component: DesignsCategoryComponent },
           { path: "designs/:category/:page", component: DesignsCategoryComponent },
           { path: "introduction", component: IntroductionComponent },
           { path: "detail/:id", component: ProductDetailComponent },
           { path: "embroidery/:id", component: EmbroiderySimulatorComponent }*/
        ]
      }
    ]
  }

      //{ path: "contacts", component: ContactsComponent }
            //{path: "admin", component: AdminComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
