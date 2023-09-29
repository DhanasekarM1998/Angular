import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-stateadmin',
  templateUrl: './stateadmin.component.html',
  styleUrls: ['./stateadmin.component.scss']
})
export class StateadminComponent implements OnInit {
  customers: any[] = [];
  stateadminform !: FormGroup;
  editform: FormGroup;
  hidden: boolean = true;
  updateform: FormGroup;
  message: boolean;
  username: any;
  user_password: any;
  spinner: boolean;
  tableshow: boolean = false;
  email_check1: any;

  constructor(public ApiService: ApiServiceService, private fb: FormBuilder, private spinnerService: NgxSpinnerService) {
    this.FormInilialize();

    this.editform = this.fb.group({ //angForm
      email1: [this.SAfirstname, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
    ]],
      firstname1: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname1: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      //district:['',Validators.required],
      whatsapp_no1: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      party_designation1: ['', [Validators.required]],
      approval_status1: ['', Validators.required],
      location_id1: ['1'],
      contact_no1:['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      mode1: ['0'],
      profile_status1:[''],
    });




  }
  FormInilialize() {
    this.stateadminform = this.fb.group({ //angForm
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
    ]],
      firstname: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      //district:['',Validators.required],
      whatsapp_no: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      party_designation: ['', [Validators.required]],
      approval_status: ['', Validators.required],
      location_id: ['1'],
      mode: ['0'],
      contact_no:['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]]
    });
  }
  FormReset() {
    this.stateadminform.reset();
    this.FormInilialize();
    this.hidden = true;
    this.test_email1 = "false";
    this.test_email = "false";
    this.test_ph = 'false';
    this.test_ph1 = 'false';
  }
  //firstname1=new FormControl('hu');


  // updateName() {
  //   this.firstname1.setValue('Nancy');
  // }



  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
    this.getdata();
    //this.ApiService.viewtableSA();
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: []
    };
    this.showSpinner();

    //this.getphone();


  }
  public showSpinner(): void {
    this.spinnerService.show();
  }

  getdata() {
    this.ApiService.viewtableSA().subscribe(data => {
      console.log(data)
      for (const prop in data) {
        this.customers.push(data[prop])
      }
      console.log(this.customers);
      this.tableshow = true;
    });



    // this.customers=[];
    //     for(const prop in this.ApiService.tabledata) {
    //         this.customers.push(this.ApiService.tabledata[prop])
    //       }
    //       this.customers.pop();

    //console.log(this.ApiService.tabledata)
  }
  // getdataarray(){
  //   console.log("2st");
  //   this.customers=[];
  //       for(const prop in this.ApiService.tabledata) {
  //           this.customers.push(this.ApiService.tabledata[prop])
  //         }
  //         this.customers.pop();

  // }
  postdata(angForm1: any) //angForm1
  {
    console.log(angForm1);
    //if(this.stateadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null)
    if (this.stateadminform.valid == true && this.email != null && this.firstname != null && this.lastname != null && this.test_email == 'false' && this.test_ph == 'false') {
      this.ApiService.create_state_admin(angForm1.value.mode, angForm1.value.email, angForm1.value.firstname,
        angForm1.value.lastname, angForm1.value.whatsapp_no, angForm1.value.party_designation, angForm1.value.approval_status, angForm1.value.location_id,angForm1.value.contact_no)
        .subscribe(
          data => {
            console.log(data)
            this.username = data.whatsapp_no;
            console.log(angForm1.value.whatsapp_no)
            this.user_password = data.password;
            // window.location.reload();
            //alert("State admin user has been created successfully!");

            //  angForm1.reset();
          },

          error => {
            console.log(error);
          });
    }
    else {
      this.hidden = false;
    }
    this.message = true;
  }
  reload() {
    window.location.reload();

  }
  delete_sa(user_id: any) {
    console.log(user_id)
    if (confirm("Are you sure want to delete this record ?")) {
      console.log("Implement delete functionality here");


      this.ApiService.delete_admin(user_id)
        .pipe()
        .subscribe(
          data => {
            window.location.reload()
            alert("State Body detail was successfully Deleted !")

          },

          error => {
            console.log(error);
          });
    }
  }

  get email() { return this.stateadminform.get('email'); }
  get firstname() { return this.stateadminform.get('firstname'); }
  get lastname() { return this.stateadminform.get('lastname'); }

  SAid: any;
  SAfirstname: any;
  SAlastname: any;
  SAdesig: any;
  SAwhatsapp_no: any;
  SAparty_desig: any;
  SAmail: any;
  SAstatus: any;
  SAcontact_no:any;
  SAprofile_status:any;
  editbuttonviewSA(a: any) {
    //  let fullname=a.name.split(" ");
    this.SAid = a.id;
    //  alert(this.SAid);
    this.SAfirstname = a.firstname;
    this.SAlastname = a.lastname;
    this.SAdesig = a.designation;
    this.SAwhatsapp_no = a.whatsapp_no;
    this.SAparty_desig = a.party_designation;
    this.SAmail = a.email;
    this.SAstatus = a.approval_status;
    this.SAcontact_no=a.contact_no;
    this.SAprofile_status=a.profile_status;

    this.editform.patchValue({
      id1: this.SAid,
      email1: this.SAmail,
      firstname1: this.SAfirstname,
      lastname1: this.SAlastname,
      designation1: this.SAdesig,
      whatsapp_no1: this.SAwhatsapp_no,
      party_designation1: this.SAparty_desig,
      approval_status1: this.SAstatus,
      contact_no1:this.SAcontact_no,
      profile_status1:this.SAprofile_status


    })
  }


  updatedata(updateform: any) {
    if (this.editform.valid == true && this.test_email == 'false' && this.test_ph == 'false') {
      this.spinner = true;
      console.log(updateform.value);
      this.ApiService.updateSA('0', this.SAid, updateform.get('firstname1').value, updateform.get('lastname1').value,
        updateform.get('whatsapp_no1').value,
        updateform.get('party_designation1').value,
        updateform.get('email1').value,
        updateform.get('approval_status1').value,'',
        updateform.get('contact_no1').value,
        updateform.get('profile_status1').value
        )
        .pipe()
        .subscribe(
          data => {
            this.spinnerService.hide();
            setTimeout(function () {
              alert("State Body detail was updated!");
              window.location.reload();
            }, 100)


          },

          error => {
            console.log(error);
          });
    }


  }
  old_mail: any;
  old_whatsapp: any;
  get_oldmail(old_record) {
    this.old_mail = old_record.email;
    this.old_whatsapp = old_record.whatsapp_no;
    console.log(this.old_whatsapp );
  }
  email_1: any = [];
  test_email = "false";
  test_email1 = "false";
  getemail(a, add) {
    if (add == 'ADD') {
      // console.log(add);
      // console.log('old_em')
      // console.log( this.SAmail)
      if (this.stateadminform.get('email').status == "VALID") {
         console.log(a);
        this.ApiService.email_check().subscribe(data => {

          for (let email in data) {
            let b = data[email];
            // Do something with value
            if (a == b.email) {
              //console.log("tttt")
              this.test_email = "true";
              break;
            }
            else {
              this.test_email = 'false';
            }
          }

        });
      }
    }
    else {
      if (this.editform.get('email1').status == "VALID") {
        // console.log("edit");
        // console.log(a);
        // console.log(this.old_mail);

        if (this.old_mail == a) {
          this.test_email1 = "false";
        }
        else {
          this.ApiService.email_check().subscribe(data => {
            for (let email in data) {
              let b = data[email];
              // Do something with value
              if (a == b.email) {
                //console.log("tttt")
                this.test_email1 = "true";
                break;
              }
              else {

                this.test_email1 = 'false';
              }
            }

          });
        }
      }
    
    }

  }

  test_ph = "false";
  test_ph1 = "false";
  getphone(c, add) {
    if (add == 'ADD') {
      if (this.stateadminform.get('whatsapp_no').status == "VALID") {
        // console.log(c);
        this.ApiService.ph_check().subscribe(data => {
          //  console.log(data);
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];
            // console.log(d.whatsapp_no );
            // Do something with value
            if (c == d.whatsapp_no) {
              //console.log("tttt")
              this.test_ph = "true";
              break;
            }
            else {
              //console.log("esle")
              this.test_ph = 'false';
            }
          }
        });
      }
    }
    else{
      if (this.editform.get('whatsapp_no1').status == "VALID") {
      
        // console.log("edit");      
        // console.log(this.old_whatsapp);
        // console.log(c);
        if (this.old_whatsapp == c) {
          this.test_ph1 = "false";
          console.log(this.test_ph)

        }
        else{
        this.ApiService.ph_check().subscribe(data => {
          console.log(data);
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];
            
            if (c == d.whatsapp_no) {
              
              this.test_ph1 = "true";
              // console.log(this.test_ph)
              break;
            }
            else {
            
              this.test_ph1 = 'false';
              // console.log("else")
              // console.log(this.test_ph)
            }
          }
        });
        // console.log(this.test_ph)
      }
    }
    }
  }

}