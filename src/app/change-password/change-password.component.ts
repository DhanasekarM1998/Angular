import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  resetpassword:FormGroup;
    sent_email:string;
    token:string;
    today = new Date();
    ex:string;
    expdate_to_str:string;
    db_token:string;


  constructor(public ApiService:ApiServiceService,
    private route:ActivatedRoute,
    private fb: FormBuilder, private router:Router,public datepipe:DatePipe

    ) {
      this.sent_email=this.route.snapshot.params['email'];
      this.token=this.route.snapshot.params['token'];
      this.resetpassword = this.fb.group({
        email: [this.sent_email, [Validators.required,Validators.minLength(1), Validators.email]],
        password:['',[Validators.required]],
        cpassword:['',[Validators.required]],
        });

    }

  ngOnInit(): void {

    this.getdata();

  }
  postdata(forgotForm : any)
  {
    // console.log(forgotForm.value.password);
    // console.log(forgotForm.value.cpassword);
    // console.log("forgotForm.value.email");

    if(forgotForm.value.password==forgotForm.value.cpassword)
    {
      if(forgotForm.value.password != '' && forgotForm.value.cpassword!= '' ){
        console.log(forgotForm.value.password);
      this.ApiService.resetpassword(forgotForm.value.email,forgotForm.value.password,forgotForm.value.cpassword)
      .subscribe( data => {
                      alert("Password has been updated");
                      this.resetpassword.reset();
                      this.router.navigate(['']);},
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
get email() { return this.resetpassword.get('email'); }
get password() { return this.resetpassword.get('password'); }
get cpassword() { return this.resetpassword.get('cpassword'); }

customers: any[] = [];
ex_time:string;
form_hidden:boolean;
content_hidden:boolean;
getdata() {
  this.ApiService.check_token(this.sent_email).subscribe(data => {
    for (const prop in data) {
      this.customers.push(data[prop])
    }
    console.log(this.customers);
     this.db_token=this.customers[0][0].token;
   // alert(this.db_token);
    // this.ex=this.datepipe.transform(this.today,"YYYY-MM-dd HH:MM:ss");
    // //alert(this.ex);
    // this.ex_time=this.datepipe.transform(this.expiry_date,"YYYY-MM-dd HH:MM:ss");
     if(this.db_token==this.token)
     {
       this.form_hidden=false;
       this.content_hidden=true;
     }
     else{
       this.form_hidden=true;
       this.content_hidden=false;
     }
  });
}

}