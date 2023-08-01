import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public fb:FormBuilder){}
  SubmitForm = this.fb.group({
    Name: ['', Validators.compose([Validators.required])],
    Email: ['', Validators.compose([Validators.required])],
    Salary: ['', Validators.compose([Validators.required])]
  })

  Data:any=[];
  saveItem:any;
  OnSubmit(){
    const getDataIndex = this.Data.findIndex((data: any) => data.Email === this.saveItem);
    if (getDataIndex !== -1) {
    this.Data[getDataIndex].Name = this.SubmitForm.value.Name;
    this.Data[getDataIndex].Email = this.SubmitForm.value.Email;
    this.Data[getDataIndex].Salary = this.SubmitForm.value.Salary;
    }else{
    this.Data.push(this.SubmitForm.value);
    }
    this.onReset();
  }

  onEdit(item:any){
    this.saveItem = item;
    const getData = this.Data.find((data:any) => data.Email==item);
    this.SubmitForm.patchValue({
      Name: getData.Name,
      Email: getData.Email,
      Salary: getData.Salary,
    });
  }

  onDelete(item:any){
    this.Data = this.Data.filter((data:any) => data.Email !== item);
  }

  onReset(){
    this.SubmitForm.reset();
    this.saveItem = "";
  }
}
