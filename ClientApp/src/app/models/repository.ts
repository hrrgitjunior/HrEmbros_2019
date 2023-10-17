import { Product } from "./product";
import { Category } from "./navigation";
import { Injectable } from "@angular/core";
//import { Http, Headers, RequestMethod, Request, Response } from "@angular/http";
//import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
//import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/map";
import { Observable } from "rxjs";

const productsUrl = "/api/products";
const url_category_map: Map<string, string> = new Map([
    ['/store/Lettering', 'Lettering'],
    ['/store/Cross', 'Cross'],
    ['/store/Photo', 'Photo'],
    ['/designs/Lettering', 'Lettering'],
    ['/designs/Cross', 'Cross'],
    ['/designs/Photo', 'Photo']
]);

// TODO Uses later, when there are pagination
const url_expressions = [
    "^/software/Lettering$",
    "^/software/Cross$",
    "^/designs/Lettering/[0-9]$",
    "^/designs/Cross/[0-9]$"];


type productsMetadata = {
    data: Product[],
    categories: string[];
}

type point = {
    x: number;
    y: number;
}

type TCCEtitle = {
        absSP: point;
        sz_x: number;
        sz_y: number;
    }

@Injectable()
export class Repository {
    message: string;
    product: Product;
    products: Product[];
    categories: Category[] = [];
    currentCategory: string;
    currentPage: number = 1;
    productsPerPage: number = 4;
    isLoaded: boolean = false;
    isLoadedStitches = false;
    fileUrl: string = "/api/file/";
    embStitches: any[];
    embTitle: TCCEtitle;
    selected_rows: string[] = [];
    histogramplotOptions: any;
   

    constructor(private http: HttpClient) {
    }

  
/*    getProduct(id: number) {
        this.isLoaded = false;
        this.sendRequest(RequestMethod.Get, "/api/product/" + id)
            .subscribe(response => {
            this.product = response;
            this.isLoaded = true;});
    }*/

      getProduct(id: number) {
        this.isLoaded = false;
        this.http.get<Product>("/api/product/" + id)
            .subscribe(response => {
            this.product = response;
            this.isLoaded = true;});
    }



    /*private sendRequest(verb: RequestMethod, url: string,
                        data?: any): Observable<any> {
            return this.http.request(new Request({
                        method: verb, url: url, body: data
            })).map(response => response.json());
    }*/

    pageCount(): number {
        return Math.ceil(this.products.length / this.productsPerPage);
    }

    getProducts(category: string) {
          if (!this.isLoaded)
            //this.sendRequest(RequestMethod.Get, "/api/products/" + category)
            this.http.get<Product[]>("/api/products/" + category)
              .subscribe(response => {
                    this.products = response
                    if (this.pageCount() < this.currentPage)
                       this.currentPage = 1;
                    this.isLoaded = true;
                }); else {
              this.isLoaded = true;
        }
            
    }

    getCategories() {
      //this.sendRequest(RequestMethod.Get, "/api/categories/")
      this.http.get<any>("/api/categories/")
            .subscribe(response => {
                this.categories = response.categories;
            });
    }

    add_record(prod: Product) {
        let data = {
            name: prod.name,
            description: "",
            urlSmallImage: prod.urlSmallImage,
            urlBigImage: prod.urlBigImage,
            category: prod.category,
            size: prod.size,
            colorCount: prod.colorCount,
            stitchCount: prod.stitchCount,
            embFile: prod.embFile,
            enableDownload: prod.enableDownload
        }
        this.http.post("api/admin", data)
            .subscribe(name => {
                console.log("Repo Add Record ===", name);
            });
     }

    download(file: string) {
      this.http.get<Blob>("api/file/download?file=" + file, { responseType: 'blob' as 'json'})
            .subscribe(res=> {
                var a = document.createElement("a");
                a.href = URL.createObjectURL(res);
                a.download = file;
                // start download
                a.click();
            });
    }

    fetch_stitches(id: number) {
        this.isLoadedStitches = false;
      //this.sendRequest(RequestMethod.Get, "api/embroidery/fetchstitches?id=" + id)
      this.http.get<any>("api/embroidery/fetchstitches?id=" + id)
            .subscribe(response => {
                this.embStitches = response[0];
                this.embTitle = response[1];
                this.isLoadedStitches = true;
            });
    }


    currentUrl_to_currentCategory(url: string) {
        let category = url_category_map.get(url)
        if (category === undefined) {
            return ""
        } else {
            return category
        }
    }

    fetch_histogram_plot_options() {
      //this.sendRequest(RequestMethod.Get, "api/histgramchartplot/histogramplot")
      console.log("FETCH HIST PLOT ===");
      this.http.get<any>("api/histgramchartplot/histogramplot")
            .subscribe(response => {
                console.log("HISTOGRAM PLOT OPTIONS ===", response);
                this.histogramplotOptions = response;
            });


    }
    

}



