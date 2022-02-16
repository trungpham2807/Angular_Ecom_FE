import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CategoriesService, Category} from '@bluebits/products';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  constructor(private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      // color: ['']
    })
  }
  onSubmit(){
    this.isSubmitted = true;
    // console.log(this.form.controls.name.value)
    // console.log(this.form.controls.icon.value)
    if(this.form.invalid){
      return;
    }
    const category : Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value

    }
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
  get categoryForm(){
    return this.form.controls;
  }

}
