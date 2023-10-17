import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModelModule } from "./models/module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { DataTablesModule } from 'angular-datatables';

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
import { ProductListComponent } from "./structure/productList";
import { ProductTableComponent } from "./structure/productTable";
import { ProductCellComponent } from "./structure/productTableCell";
//import { ProductDetailComponent } from "./structure/productDetail";
import { EmbroiderySimulatorComponent } from "./structure/embroiderySimulator";
import { EmbCanvasComponent } from "./structure/embCanvas";
import { ChoiceEmbColorModalComponent } from "./structure/choice.embcolor.modal";
import { HistogramPlotComponent } from "./structure/histogramPlot";
import { DesignsCategoryComponent } from "./structure/designsCategory";
import { DesignsPaginationComponent } from "./structure/designsPagination";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    StoreLayoutComponent,
    CategoryFilterComponent,
    CategoryProductsComponent,
    DesignsCategoryComponent,
    DesignsPaginationComponent,
    IntroductionComponent,
    TextDesignsComponent,
    FolcklorDesignsComponent,
    PhotoDesignsComponent,
    ProductTableComponent,
    ProductCellComponent,
    EmbroiderySimulatorComponent,
    EmbCanvasComponent,
    ChoiceEmbColorModalComponent,
    AdobeDesignsComponent,
    ProductListComponent,
    HistogramPlotComponent
  ],
  entryComponents: [ChoiceEmbColorModalComponent],
  imports: [
    BrowserModule,
    ModelModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
    //NgbModule.forRoot()
    //DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
