import { Component } from '@angular/core';
import { Repository } from "./models/repository";
import { RouterModule, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HrEmbros';
  constructor(private repo: Repository, private router: Router, private location: Location) { }

  ngOnInit() {
/*    let category = this.repo.currentUrl_to_currentCategory(this.location.path());
      if (category == "") {
           this.router.navigate([''])
        }*/
  }
}
