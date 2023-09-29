import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';
import { data } from 'jquery';
import { IfStmt } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  @Output() districtadmin_constituency: EventEmitter<any> = new EventEmitter();
  failedAttempts = 1;
  numLockedOut: any;
  btnDisable = true;
  count = 6;
  test_ph: string;
  //  count=2;
  spinner: boolean=true;
  

  constructor(private fb: FormBuilder,
    private dataService: ApiServiceService,
    private router: Router, private spinnerService: NgxSpinnerService) {
    sessionStorage.setItem('validUserToken', 'false');
    this.userForm = this.fb.group({
      whatsapp_no: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      password: ['', Validators.required],
    });
    //console.log(this.userForm);
  }

  ngOnInit(): void {
  }
  //   postdata(userForm : any)
  // {
  // this.dataService.userlogin(userForm.value.whatsapp_no,userForm.value.password)
  // .pipe(first())
  // .subscribe(
  // data => {
  //     console.log(data);
  //     console.log(data[0].category)
  //     if(data[0].category=='SAD'){
  // //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'superadmin';
  // //this.router.navigate([redirect]);
  // this.districtadmin_constituency.emit(data[0].district);
  //     }
  //     else if(data[0].category=='SA'){
  //       const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'stateadmin';
  // this.router.navigate([redirect]);
  // this.districtadmin_constituency.emit(data[0].district);
  //     }
  //     else if(data[0].category=='DA'){
  //       const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'districtadmin';
  // this.router.navigate([redirect]);

  // this.districtadmin_constituency.emit(data[0].district);

  //     }

  // },
  // error => {
  // alert("User name or password is incorrect")
  // });
  // }

  getlogincheck(c) {
    console.log(c.length)
    if(c.length==10){
      this.showSpinner();
      this.dataService.logincheck().subscribe(data => {
        //  console.log(data);

        for (let whatsapp_no in data) {
          let a = data[whatsapp_no];
          if (c == a.whatsapp_no) {
            //console.log("tttt")
            this.spinnerService.hide();
            this.test_ph = "false";
            this.btnDisable = false;
            break;
          }
          else {
            this.spinnerService.hide();
            this.test_ph = "true";
            this.btnDisable = false;
            //  console.log( this.test_ph)

          }
        }
      });
    }
  }

  public showSpinner(): void {
    this.spinnerService.show();
  }







  get whatsapp_no() { return this.userForm.get('whatsapp_no'); }
  get password() { return this.userForm.get('password'); }
  attempts: any;
  postdata(userForm: any) {
    console.log(userForm);
    if (userForm.status == "VALID") {

      console.log(this.failedAttempts)
      /* Only attempt login if user has less than 5 login attempts */
      if (this.failedAttempts < this.count) {
        this.showSpinner();
        this.dataService.userlogin(userForm.value.whatsapp_no, userForm.value.password)
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
              console.log(data[0].profile_status)
              if (data[0].profile_status == '0') {
                if (data[0].category == 'SAD') {
                  const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'superadmin';
                  this.router.navigate([redirect]);
                  this.districtadmin_constituency.emit(data[0].district);
                  this.spinnerService.hide();
                }
                else if (data[0].category == 'SA') {
                  const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'stateadmin';
                  this.router.navigate([redirect]);
                  this.districtadmin_constituency.emit(data[0].district);
                  this.spinnerService.hide();
                }
                else if (data[0].category == 'DA') {
                  const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'districtadmin';
                  localStorage.setItem('category', JSON.stringify(data[0].category));
                  this.router.navigate([redirect]);
                  this.districtadmin_constituency.emit(data[0].district);
                  this.spinnerService.hide();
                }
                else if (data[0].category == 'OB') {
                  const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'OB';
                  localStorage.setItem('category', JSON.stringify(data[0].category));
                  this.router.navigate([redirect]);            
                  this.districtadmin_constituency.emit(data[0].district);
                  this.spinnerService.hide();
                }
              }
              else if (data[0].profile_status == '1') {
                alert("Your account has been locked because you have reached the maximum invalid login attempts. Please contact administrator.");
                this.spinnerService.hide();
              }

            }
            , (err) => {

              console.error(err);
              this.attempts = 6 - this.failedAttempts
              alert('Incorrect password.'+' Attempts remaining: '+ this.attempts+'\nWarning: After 6 consecutive unsuccessful login attempts, your account will be locked')
              // alert('Your account has been locked because you have reached the maximum invalid login attempts. Please contact administrator.');
              this.failedAttempts++;
              this.spinnerService.hide();
            });
      }

      else {
        /*increments number of times locked out */
        this.numLockedOut++;
        this.dataService.locked(userForm.value.whatsapp_no)
          .pipe(first())
          .subscribe(
            data => {
              alert("Your account has been locked please contact admin");
            });
        this.spinnerService.hide();
        // alert('Login failed. Invalid email or password. Your account was blocked');
        this.btnDisable = true;

      }
    }

    else {
      alert("Please enter password")
    }

  }
}
