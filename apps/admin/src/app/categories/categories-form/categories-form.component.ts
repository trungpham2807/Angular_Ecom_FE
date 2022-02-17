import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CategoriesService, Category} from '@bluebits/products';
import { MessageService } from 'primeng/api';
import {Location} from '@angular/common';
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  editMode = false;
  currentCategoryId: string;
  constructor(private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
    this._checkEditMode();
  }
  onSubmit(){
    this.isSubmitted = true;
    // console.log(this.form.controls.name.value)
    // console.log(this.form.controls.icon.value)
    if(this.form.invalid){
      return;
    }
    const category : Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }
    if(this.editMode){
      this._updateCategory(category);
    }else{
      this._addCategory(category);
    }
    
  }
  private _checkEditMode(){
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category=>{
          // data already show
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
  } });
  }
  private _addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe(
      // notification when add form
      (response) =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created!`
        });  
      }, (error) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: `Category is not created!`
        });  
      }
      );
  }
  private _updateCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe(
      // notification when add form
      (response) =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is updated!`
        });  
      }, (error) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: `Category is not updated!`
        });  
      }
      );
  }
  get categoryForm(){
    return this.form.controls;
  }

}
