import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private httpclient:HttpClient) { }

 
  customers="";
  msg:string="";
  //get all datas from database

  ngOnInit() {

    this.getCustomer();
   
  }
    

  getCustomer(){

    this.httpclient.get(`http://localhost:3000/api/customers`)
    .subscribe(
      (data:any)=> {
        this.customers=data;
        
      })
  }

    //save customer to database


    saveCustomer(user){

      this.httpclient.post(`http://localhost:3000/api/customers`,{
        name:user.name,
        phone:user.phone
      })
      .subscribe(
        (res:Response)=>{
          this.getCustomer();
          this.msg="succesfully inserted";
          console.log(res);
        })
        
    }


    //delete customer from database

    deleteCustomer(id){
     
  
      if(confirm('Are you sure')){
      this.httpclient.delete(`http://localhost:3000/api/customers/`+id)
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.msg="succesfully deleted";
          this.getCustomer();
        });
      } 
    }


    //update customer

    
  updateCustomer(user){
    this.editValues={
      "name":user.name,
      "phone":user.phone
    }
  
    this.httpclient.put(`http://localhost:3000/api/customers/`+this.id,this.editValues)
    .toPromise()
    .then(()=>{this.router.navigate['']})
      
  }

}
