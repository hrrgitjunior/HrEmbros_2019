import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModelModule } from "./models/module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from "./structure/mainLayout";
import { StoreLayoutComponent } from "./structure/storeLayout";
import { CategoryFilterComponent } from "./store/categoryFilter.component";
import { CategoryProductsComponent } from "./structure/categoryProducts";
import { HttpClientModule } from '@angular/common/http';

import { IntroductionComponent } from "./structure/introduction";
import { TextDesignsComponent } from "./structure/textDesigns";
import { FolcklorDesignsComponent } from "./structure/folcklorDesigns";
import { PhotoDesignsComponent } from "./structure/photoDesigns";
import { AdobeDesignsComponent } from "./structure/adobeDesigns";
/*import { ProductListComponent } from "./structure/productList";
import { HistogramPlotComponent } from "./structure/histogramPlot";*/

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    StoreLayoutComponent,
    CategoryFilterComponent,
    CategoryProductsComponent,
    IntroductionComponent,
    TextDesignsComponent,
    FolcklorDesignsComponent,
    PhotoDesignsComponent,
    AdobeDesignsComponent
/*    ProductListComponent,
    HistogramPlotComponent*/
  ],
  imports: [
    BrowserModule,
    ModelModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
