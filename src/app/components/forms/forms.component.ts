import { Component, Input, Output,EventEmitter } from '@angular/core';
import {FormControl,ReactiveFormsModule,Validators,FormGroup} from '@angular/forms'

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  @Input() show:any;

  @Output() myHide = new EventEmitter();




 @Output() newUser= new EventEmitter();

 myValidation= new FormGroup
 ({
   name: new FormControl("",[Validators.required, Validators.minLength(3),Validators.pattern(/[a-zA-Z]+/)]),
   email: new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
   phone: new FormControl('',[Validators.required, Validators.pattern(/^\+?20\s?(\d{2}|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/)]),
   street: new FormControl('',[Validators.minLength(3),Validators.required]),
   suite: new FormControl('',[Validators.required]),
   city: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(/[a-zA-Z]+/)])
 })

 getData()
 {

   if (this.myValidation.valid)
   {

     this.newUser.emit({name:this.myValidation.value.name,
       email:this.myValidation.value.email,
       phone:this.myValidation.value.phone,
       address:{city:this.myValidation.value.city,street:this.myValidation.value.street,suite:this.myValidation.value.suite}

     })
   }
 }

 nameNotValid()
 {
   return (this.myValidation.controls['name'].invalid && this.myValidation.controls['name'].touched)
 }

 emailNotValid()
 {
   return (this.myValidation.controls['email'].invalid && this.myValidation.controls['email'].touched)
 }
 phoneNotValid()
 {
   return (this.myValidation.controls['phone'].invalid && this.myValidation.controls['phone'].touched)
 }
 streetNotValid()
 {
   return (this.myValidation.controls['street'].invalid && this.myValidation.controls['street'].touched)
 }
 cityNotValid()
 {
   return (this.myValidation.controls['city'].invalid && this.myValidation.controls['city'].touched)
 }
 suiteNotValid()
 {
   return (this.myValidation.controls['suite'].invalid && this.myValidation.controls['suite'].touched)
 }

 hideMe()
 {
  this.myHide.emit();
 }

 getUser()
 {
    this.myHide.emit()
 }


}
