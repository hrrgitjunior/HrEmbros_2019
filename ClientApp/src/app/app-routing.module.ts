import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from "./structure/mainLayout";
import { StoreLayoutComponent } from "./structure/storeLayout";
import { IntroductionComponent } from "./structure/introduction";
import { ContactsComponent } from "./structure/contacts";
import { CategoryProductsComponent } from "./structure/categoryProducts";
import { DesignsCategoryComponent } from "./structure/designsCategory";
import { ProductDetailComponent } from "./structure/productDetail";
import { EmbroiderySimulatorComponent } from "./structure/embroiderySimulator";
import { CategoryWrapperComponent } from "./structure/categoryWrapper";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '', component: StoreLayoutComponent,
        children: [
          { path: '', redirectTo: 'introduction', pathMatch: 'full' },
          { path: "introduction", component: IntroductionComponent },
          { path: "wrapper", component: CategoryWrapperComponent,
            children: [
          //  { path: '', redirectTo: "store", pathMatch: 'full' },
          //  { path: "store", component: CategoryProductsComponent },
            { path: "store/:category", component: CategoryProductsComponent },
            { path: "designs/:category", component: DesignsCategoryComponent },
            { path: "designs/:category/:page", component: DesignsCategoryComponent },
            { path: "detail/:id", component: ProductDetailComponent },
            { path: "embroidery/:id", component: EmbroiderySimulatorComponent }
            ]
          },
     /*     { path: "designs/:category", component: DesignsCategoryComponent,
            children: [
              { path: "detail/:id", component: ProductDetailComponent},
              ]
          },*/
        //  { path: "designs/:category/detail/:id", component: ProductDetailComponent },

          //{ path: "detail/:id", component: ProductDetailComponent },
       //   { path: "embroidery/:id", component: EmbroiderySimulatorComponent }
        ]
      },
      {
        path: "contacts", component: ContactsComponent
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
