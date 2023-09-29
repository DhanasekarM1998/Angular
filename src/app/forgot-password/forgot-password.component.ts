import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sendmail:FormGroup;
  btnDisable=true;

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder, private router:Router, private spinnerService: NgxSpinnerService,) {
      this.sendmail = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
        });
    }

  ngOnInit(): void {
    this.showSpinner();
  }
//Loading screen Intialization
  public showSpinner(): void {
    this.spinnerService.show();
    }


  test_email = "false";
  getemail(a) {
    
       console.log(a);
      // console.log('old_em')
      // console.log( this.SAmail)
      if (this.sendmail.get('email').status == "VALID") {
        // console.log(a);
        this.ApiService.email_check().subscribe(data => {
console.log(data);
          for (let email in data) {
            let b = data[email];
            // Do something with value
            if (a == b.email) {
              //console.log("tttt")
              this.test_email = "true";
              this.btnDisable=false;
              break;
            }
            else {
              this.test_email = 'false';
              this.btnDisable=true;
            }
          }
          // console.log(this.test_email)
        });
      }
    }
  
    spinner:boolean;
   postdata(forgotForm : any)
    {   if(forgotForm.status=='VALID' && this.test_email=='true'){
        this.spinner=true;
        this.ApiService.sendmail(forgotForm.value.email)
          .subscribe(
          data => {
            this.spinnerService.hide();
              setTimeout(function(){
                alert("The password reset link has been sent to your registered mail!")
                this.router.navigate(['']);
                },100)
            },
          error => {
              ///console.log(error)
              alert("The password reset link has been sent to your registered mail!");
              this.sendmail.reset();
              this.router.navigate(['']);
          }
          );
        }
        else{
          alert('Enter Valid details');
        }
  }
      
  get email() { return this.sendmail.get('email'); }
  

}