import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-districtadmin',
  templateUrl: './districtadmin.component.html',
  styleUrls: ['./districtadmin.component.scss'],
})
export class DistrictadminComponent implements OnInit {
  selectedLabel: string =
    'Select Party District / மாவட்டத்தின் பெயரைத் தேர்ந்தெடுக்கவும்';
  customers: any = [];
  distadminform!: FormGroup;
  dtOptions: DataTables.Settings = {};
  editform: FormGroup;
  hidden: boolean = true;
  email1: any;
  //email: any;
  party_designation: any;
  message: boolean;
  spinner: boolean;
  tableshow: boolean = false;
  districtadminform: any;
  DAcontact_no: any;

  // firstname1: any;
  //lastname1: any;
  //district1: any;
  // designation1:any;
  //whatsapp_no1:any;

  constructor(
    public ApiService: ApiServiceService,
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) {
    this.FormIntialize();

    this.editform = this.fb.group({
      //angForm
      email1: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')

        ],
      ],
      firstname1: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')],
      ],
      // lastname1: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname1: ['', [Validators.pattern('[A-Za-z ]{1,32}')]],
      district1: ['', Validators.required],
      whatsapp_no1: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      party_designation1: ['', [Validators.required]],
      approval_status1: ['', Validators.required],
      location_id1: ['1', Validators.required],
      mode1: ['1'],
      contact_no1: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      fb_id1: [''],
      twitter_id1: [''],
      profile_status1:['']
    });
  }
  FormIntialize() {
    this.distadminform = this.fb.group({
      //angForm
      email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')

        ],
      ],
      // email:['',]
      firstname: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')],
      ],
      // lastname: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname: ['', [Validators.pattern('[A-Za-z ]{1,32}')]],
      district: ['', Validators.required],

      whatsapp_no: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      party_designation: ['', [Validators.required]],
      approval_status: ['', Validators.required],
      location_id: ['1', Validators.required],
      contact_no: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      fb_id: [''],
      twitter_id: [''],
    });
  }
  district_list: any[] = this.ApiService.all_districts;

  onPartyDesignationChange(event: any) {
    const selectedValue = event.target.value;
    // You can perform actions here based on the selected value
    // For example, you can call the function to update the district_list
    this.updateDistrictListBasedOnPartyDesignation(selectedValue);
  }
  updateDistrictListBasedOnPartyDesignation(partyDesignation: string): void {
    if (partyDesignation === 'District Organiser / மாவட்ட அமைப்பாளர்') {
      this.district_list = this.ApiService.all_districts; // Replace 'yourService' with your actual service name
    } else if (partyDesignation === 'Municipal Organiser / மாநகர அமைப்பாளர்') {
      this.district_list = this.ApiService.all_municipals; // Replace 'yourService' with your actual service name
    } else {
      // Handle other designations or default case
      this.district_list = [];
    }
  }

  ngOnInit(): void {
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
    this.getdata();
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [],
    };
    this.showSpinner();
  }

  public showSpinner(): void {
    this.spinnerService.show();
  }
  getdata() {
    this.ApiService.viewtableDA().subscribe((data) => {
      for (const prop in data) {
        this.customers.push(data[prop]);
      }

      this.tableshow = true;
    });
  }

  username: any;
  user_password: any;
  user_email: any;
  postdata(
    angForm1: any //angForm1
  ) {
    // if (this.distadminform.valid == true && this.email != null && this.firstname != null && this.lastname != null && this.district != null && this.test_email == 'false' && this.test_ph == 'false') {
    if (
      this.distadminform.valid == true &&
      this.email != null &&
      this.firstname != null &&
      this.district != null &&
      this.test_ph == 'false'
    ) {
      this.ApiService.create_dist_admin(
        '1',
        angForm1.value.whatsapp_no,
        angForm1.value.email,
        angForm1.value.firstname,
        angForm1.value.lastname,
        angForm1.value.district,
        angForm1.value.party_designation,
        angForm1.value.approval_status,
        angForm1.value.location_id,
        angForm1.value.contact_no,
        angForm1.value.fb_id,
        angForm1.value.twitter_id
      )
      .subscribe(
        (data) => {
          this.username = data?.whatsapp_no;

          this.user_password = data?.password;

          this.user_email = data?.email;

          // alert("District admin user has been created successfully!")

          // window.location.reload();

          //angForm1.reset();
        },

        (error) => {
          console.log(error);
        }
      );
    } else {
      this.hidden = false;
    }
    this.message = true;
  }
  reload() {
    window.location.reload();
  }
  delete_da(user_id: any) {
    if (confirm('Are you sure want to delete this record ?')) {
      this.ApiService.delete_admin(user_id)
        .pipe()
        .subscribe(
          (data) => {
            window.location.reload();
            alert('District admin detail has been deleted !');
          },

          (error) => {
            console.log(error);
          }
        );
    }
  }
  get email() {
    return this.distadminform.get('email');
  }
  get firstname() {
    return this.distadminform.get('firstname');
  }
  get lastname() {
    return this.distadminform.get('lastname');
  }
  get district() {
    return this.distadminform.get('district');
  }
  get whatsapp_no() {
    return this.distadminform.get('whatsapp_no');
  }
  get contact_no() {
    return this.distadminform.get('contact_no');
  }
  get fb_id() {
    return this.distadminform.get('fb_id');
  }
  get twitter_id() {
    return this.distadminform.get('twitter_id');
  }

  get party_designation1() {
    return this.editform.get('party_designation1');
  }
  get firstname1() {
    return this.editform.get('firstname1');
  }
  get lastname1() {
    return this.editform.get('lastname1');
  }
  get district1() {
    return this.editform.get('district1');
  }
  get contact_no1() {
    return this.distadminform.get('contact_no1');
  }
  get fb_id1() {
    return this.distadminform.get('fb_id1');
  }
  get twitter_id1() {
    return this.distadminform.get('twitter_id1');
  }
  get profile_status1() { return this.editform.get('profile_status1'); }

  DAid: any;
  DAname: any;
  DAlastname: any;
  DAdesig: any;
  DAparty_desig: any;
  DAdistrict: any;
  DAmail: any;
  DAstatus: any;
  DAwhats: any;
  DAfb_id: any;
  DAtwitter_id: any;
  DAprofile:any;

  editbuttonviewDA(a: any) {
    console.log(a);
    //let fullname = a.name.split(" ");
    this.DAid = a.id;
    // this.DAname = fullname[0];
    // this.DAlastname = fullname[1];
    this.DAname = a.firstname;
    this.DAlastname = a.lastname;
    this.DAdesig = a.designation;
    this.DAparty_desig = a.party_designation;
    this.DAdistrict = a.district;
    this.DAmail = a.email;
    this.DAstatus = a.approval_status;
    this.DAwhats = a.whatsapp_no;
    this.DAcontact_no = a.contact_no;
    this.DAfb_id = a.fb_id;
    this.DAtwitter_id = a.twitter_id;
    this.DAprofile=a.profile_status;

    this.editform.patchValue({
      id1: this.DAid,
      email1: this.DAmail,
      firstname1: this.DAname,
      lastname1: this.DAlastname,
      district1: this.DAdistrict,

      party_designation1: this.DAparty_desig,
      approval_status1: this.DAstatus,
      whatsapp_no1: this.DAwhats,
      contact_no1: this.DAcontact_no,
      location_id1: '1',
      mode1: '1',
      fb_id1: this.DAfb_id,
      profile_status1:this.DAprofile,
      twitter_id1: this.DAtwitter_id,
    });
    this.updateDistrictListBasedOnPartyDesignation(this.DAparty_desig);
  }

  formReset() {
    this.distadminform.reset();
    this.FormIntialize();
    this.hidden = true;
    this.test_email = 'false';
    this.test_ph = 'false';
    this.test_email1 = 'false';
    this.test_ph1 = 'false';
  }
  old_mail: any;
  old_whatsapp: any;
  get_oldmail(old_record) {
    this.old_mail = old_record.email;
    this.old_whatsapp = old_record.whatsapp_no;
  }
  test_email = 'false';
  test_email1 = 'false';
  getemail(a, add) {
    if (add == 'ADD') {
      if (this.distadminform.get('email').status == 'VALID') {
        this.ApiService.email_check().subscribe((data) => {
          for (let email in data) {
            let b = data[email];

            if (a == b.email) {
              this.test_email = 'true';
              break;
            } else {
              this.test_email = 'false';
            }
          }
        });
      }
    } else {
      if (this.editform.get('email1').status == 'VALID') {
        if (this.old_mail == a) {
          this.test_email1 = 'false';
        } else {
          this.ApiService.email_check().subscribe((data) => {
            for (let email in data) {
              let b = data[email];

              if (a == b.email) {
                this.test_email1 = 'true';

                break;
              } else {
                this.test_email1 = 'false';
              }
            }
          });
        }
      }
    }
  }
  test_ph = 'false';
  test_ph1 = 'false';
  getphone(c, add) {
    if (add == 'ADD') {
      if (this.distadminform.get('whatsapp_no').status == 'VALID') {
        this.ApiService.ph_check().subscribe((data) => {
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];

            if (c == d.whatsapp_no) {
              this.test_ph = 'true';

              break;
            } else {
              this.test_ph = 'false';
            }
          }
        });
      }
    } else {
      if (this.editform.get('whatsapp_no1').status == 'VALID') {
        if (this.old_whatsapp == c) {
          this.test_ph1 = 'false';
        } else {
          this.ApiService.ph_check().subscribe((data) => {
            for (let whatsapp_no in data) {
              let d = data[whatsapp_no];

              if (c == d.whatsapp_no) {
                this.test_ph1 = 'true';

                break;
              } else {
                this.test_ph1 = 'false';
              }
            }
          });
        }
      }
    }
  }

  updatedata(updateform: any) {
    // if (this.editform.valid == true && this.test_email == 'false' && this.test_ph == 'false') {
    if (this.editform.valid == true && this.test_ph == 'false') {
      this.spinner = true;

      this.ApiService.updateDA(
        '1',
        this.DAid,
        updateform.get('firstname1').value,
        updateform.get('lastname1').value,

        updateform.get('district1').value,
        updateform.get('party_designation1').value,
        updateform.get('email1').value,
        updateform.get('whatsapp_no1').value,
        updateform.get('approval_status1').value,
        '1',
        updateform.get('contact_no1').value,
        updateform.get('fb_id1').value,
        updateform.get('twitter_id1').value,
        updateform.get('profile_status1').value
      )

        .pipe()
        .subscribe(
          (data) => {
            this.spinnerService.hide();
            setTimeout(function () {
              alert('District admin detail was updated!');
              window.location.reload();
            }, 100);
          },

          (error) => {
            console.log(error);
          }
        );
    }
  }
}
