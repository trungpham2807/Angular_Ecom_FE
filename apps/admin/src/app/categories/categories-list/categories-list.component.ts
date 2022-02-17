import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@bluebits/products';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
categories: Category [] = [];
  constructor(private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }
  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!'
            });
          }
        );
      }
    });
  }
  // call get categories again after delete
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

}
