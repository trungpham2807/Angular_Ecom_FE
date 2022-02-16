import { Component, OnInit } from '@angular/core';
import {CategoriesService, Category} from '@bluebits/products';
@Component({
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
categories: Category [] = [];
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

}
