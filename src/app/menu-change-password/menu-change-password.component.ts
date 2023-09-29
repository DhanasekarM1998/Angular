// import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';


// @Component({
//   selector: 'app-menu-change-password',
//   templateUrl: './menu-change-password.component.html',
//   styleUrls: ['./menu-change-password.component.scss']
// })
// export class MenuChangePasswordComponent implements OnInit {
//   resetpassword:FormGroup;
//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-menu-change-password',
  templateUrl: './menu-change-password.component.html',
  styleUrls: ['./menu-change-password.component.scss']
})
export class MenuChangePasswordComponent implements OnInit {
  checkpassword:FormGroup;
    id:any;
    


  constructor(public ApiService:ApiServiceService,
    private route:ActivatedRoute,
    private fb: FormBuilder, private router:Router,public datepipe:DatePipe

    ) {
      this.id= JSON.parse(localStorage.getItem('login_user_details'));
      console.log(this.id);
      
      this.checkpassword = this.fb.group({
        id: [this.id, [Validators.required]],
        password:['',[Validators.required]],
        cpassword:['',[Validators.required]],
        oldPassword:['',[Validators.required]],
        });
        
    }
    submitpassword =true
    submitnewpassword =true
    
checkoldpassword(){
  console.log(this.checkpassword.value.oldPassword);
  console.log(this.checkpassword.value.id.password);
  if(this.checkpassword.value.oldPassword==this.checkpassword.value.id.password){
    this.submitpassword=true
  }
else{
  this.submitpassword=false
}
}
checknewpassword(){
  if(this.checkpassword.value.password==this.checkpassword.value.cpassword){
    this.submitnewpassword=true
  }
else{
  this.submitnewpassword=false
}
}
  ngOnInit(): void {

    //this.getdata();

  }
  postdata(forgotForm : any)
  {
    console.log(forgotForm.value);
    
    // console.log(forgotForm.value.cpassword);
    // console.log("forgotForm.value.email");

    if(forgotForm.value.password==forgotForm.value.cpassword)
    {
      if(forgotForm.value.password != '' && forgotForm.value.cpassword!= '' ){
        console.log(this.id.id);
      this.ApiService.checkpassword(this.id?.id,forgotForm.value.password,forgotForm.value.cpassword)
      .subscribe( data => {
console.log(data);
                      alert("Your Password has been updated");
                      this.checkpassword.reset();
                      this.router.navigate(['']);
                    },
                  error => {
                      console.log(error)});
      // console.log('if');
    }
    else{
    alert("Please enter password");
    }
  }
    else{
      alert("Password and confirm password not same");
      window.location.reload()

    }
  }
// get email() { return this.resetpassword.get('email'); }
// get password() { return this.resetpassword.get('password'); }
// get cpassword() { return this.resetpassword.get('cpassword'); }

// customers: any[] = [];
// // ex_time:string;
form_hidden:boolean;
// // content_hidden:boolean;
// getdata() {
//   this.ApiService.check_token(this.sent_email).subscribe(data => {
//     for (const prop in data) {
//       this.customers.push(data[prop])
//     }
//     console.log(this.customers);
//      this.db_token=this.customers[0][0].token;
//    // alert(this.db_token);
//     // this.ex=this.datepipe.transform(this.today,"YYYY-MM-dd HH:MM:ss");
//     // //alert(this.ex);
//     // this.ex_time=this.datepipe.transform(this.expiry_date,"YYYY-MM-dd HH:MM:ss");
//      if(this.db_token==this.token)
//      {
//        this.form_hidden=false;
//        this.content_hidden=true;
//      }
//      else{
//        this.form_hidden=true;
//        this.content_hidden=false;
//      }
//   });
// }

}
