import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Colors } from 'chart.js';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  customers: any = [];
  partyDesignation: string = '';
  reqform: FormGroup;
  //router: any;
  editform: FormGroup;
  dtOptions: DataTables.Settings = {};
  hidden: boolean = true;
  district: string;
  constituency: string = '';
  date_of_birth: string;
  age: number;
  message: boolean;
  username: any;
  user_password: any;
  spinner: boolean;
  districtname: any;
  approval_status: any;
  tableshow: boolean;
  // applied_posting6: string;
  ln: string;
  roles4: any;
  roles2: any;
  isButtonDisabled: boolean = false;

  degree_major: any;
  educationOptions: any;
  other_qualification: any;
  degree_major_role = 'false';
  dropdown_list: any;
  // fulluserDetails: any;
  loginuser: any;
  dropdown_map: object = {
    மாவட்டம்: '',
    மாநகரம்: '',
    ஒன்றியம்: '',
    நகரம்: '',
    பகுதி: '',
    பேரூர்: '',
  };
  catagory: any = this.ApiService.catagory;
  //image Upload
  imageSrc: any;
  formData = new FormData();
  userImage: any;
  imageField: boolean = false;

  constructor(
    public ApiService: ApiServiceService,
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    public datepipe: DatePipe,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.district = JSON.parse(localStorage.getItem('user_district'));
  }
  FormIntialize() {
    this.officebearerform = this.fb.group({
      //angForm
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
      // constituency:['',Validators.required],
      firstname: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')],
      ],
      lastname: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')],
      ],
      age: ['', Validators.required],
      father_name: [''],
      mother_name: ['', [Validators.pattern('[A-Za-z ]{1,32}')]],
      educational_qualification: ['', Validators.required],
      date_of_birth: [this.current_date, Validators.required],
      additional_qualification: [
        '',
        Validators.pattern('^[a-zA-Z]+[a-zA-Z .,]+$'),
      ],
      contact_no: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      whatsapp_no: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      profession: ['', Validators.pattern('^[a-zA-Z]+[a-zA-Z .,]+$')],
      address: [''],
      // applied_role: ['', Validators.required],
      approval_status: ['', Validators.required],
      party_comments: [''],
      location_id: ['1', Validators.required],
      mode: ['', Validators.required],
      // applied_posting: ['', Validators.required],
      street_name: [''],
      town_city: [''],
      taluk: [''],
      pincode: [
        '',
        Validators.pattern('[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}'),
      ],
      flat_no: [''],
      degree_major: [''],
      other_qualification: [''],
      images: ['', Validators.required],
      fb_id: [''],
      twitter_id: [''],
    });
  }

  officebearerform!: FormGroup;
  district_list: any[] = this.ApiService.all_districts;
  constituency_list: any = this.ApiService.all_constituency;
  user_constituency: any;
  // FormReset() {
  //   this.officebearerform.reset();
  //   this.FormIntialize();
  //   this.hidden = true;
  //   this.test_ph1 = 'false';
  //   this.test_email1 = 'false';
  //   this.nopost_Error_msg = false;
  //   this.fileFormatStatus = false;
  //   this.fileSizeStatus = false;
  //   this.imageSrc = null;
  //   this.imageField = false;
  // }
  minAge1: Date;
  ngOnInit(): void {
    this.FormIntialize();
    //console.log(this.ApiService.all_constituency['CHENGALPATTU'])
    this.districtname = JSON.parse(localStorage.getItem('user_district'));
    let obj = this.constituency_list;
    this.user_constituency = obj[this.district];
    this.showSpinner();
    this.imageField = true;
    this.loginuser = JSON.parse(localStorage.getItem('login_user_details'));
    console.log(this.loginuser.id);
    // console.log(this.current_date);
    // this.spinnerService.show();
    this.spinner=true;
    this.ApiService.profile(this.loginuser.id).subscribe(
      (data) => {
        // this.spinnerService.hide();
        console.log(data);
        this.setCurrentdate();
        this.onSelectChange(data);  
        this.spinner=false;      
      },

      (error) => {
        console.log(error);
      }
    );
    var today = new Date();
    var minAge = 18;
    this.minAge1 = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );

    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      order: [],
    }; 
  }

  fileFormatStatus: boolean = false;
  fileSizeStatus: boolean = false;
  //Get image from user input
  onFileChange(event, formtype) {
    this.fileFormatStatus = false;
    this.fileSizeStatus = false;
    let ImagesAllowed: Array<string> = ['image/png', 'image/jpg', 'image/jpeg'];

    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const [file] = event.target.files;
      console.log(file.size);
      //checks if the format is allowed
      if (ImagesAllowed.includes(file.type) == false) {
        this.fileFormatStatus = true;
        this.imageSrc = null;
        this.userImage = null;
        console.log(file.size);
      } else if (file.size > 60000) {
        this.fileSizeStatus = true;
        this.imageSrc = null;
        this.userImage = null;
      } else {
        this.fileFormatStatus = false;
        this.fileSizeStatus = false;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          const file = (event.target as HTMLInputElement).files[0];

          this.officebearerform.patchValue({
            images: file,
          });

          if (formtype == 'edit') {
            this.userImage = reader.result as string;
            this.editform.patchValue({
              images1: file,
            });
          }
        };
      }
    }

    this.officebearerform.get('images').updateValueAndValidity();

    this.formData.forEach((value, key) => {
      //console.log(key+" "+value)
    });
  }

  //get dropdown from DB with respected district
  // getPosting(t) {
  //   //this.spinner=true;
  //   this.ApiService.dropdown(t).subscribe((data) => {
  //     //console.log(data);
  //     if (data) {
  //       this.spinner = false;
  //       for (let i = 0; i < this.catagory.length; i++) {
  //         this.dropdown_map[this.catagory[i]] = data[i];
  //         //console.log(data[i])
  //       }
  //       console.log(this.dropdown_map);
  //     }
  //   });
  // }

  //posting dropdown changes respect to selection
  getPostingDropdown(catagory) {
    const clearValues = {
      firstname: '',
      lastname: '',
      father_name: '',
      contact_no: '',
      whatsapp_no: '',
      approval_status: '',
      email: '',
      date_of_birth: '',
      mother_name: '',
      educational_qualification: '',
      degree_major: '',
      additional_qualification: '',
      fb_id: '',
      twitter_id: '',
      profession: '',
      flat_no: '',
      street_name: '',
      town_city: '',
      taluk: '',
      pincode: '',
      party_comments: '',
      image: '',
      location_id: 1,
      mode: 2,
    };
    this.imageSrc = '';
    this.partyDesignation = '';
    // Use patchValue to clear the specified values
    this.officebearerform.patchValue(clearValues);
    this.dropdown_list = [];
    let obj = this.dropdown_map;

    for (const key in obj[catagory]) {
      if (obj[catagory].hasOwnProperty(key)) {
        //console.log(obj[catagory][key])
        this.dropdown_list.push(obj[catagory][key]);
      }
    }
  }

  //Dafault age in form
  current_date: any;
  setCurrentdate() {
    this.current_date = this.datepipe.transform(this.minAge1, 'yyyy-MM-dd');
    this.officebearerform.get('date_of_birth').setValue(this.current_date);
    this.imageField = true;
  }
  public showSpinner(): void {
    this.spinnerService.show();
  }
  Constituency_selection(selection: any) {
    //console.log(selection)
    if (selection != 'null') {
      //console.log(this.district);
      let obj = this.constituency_list;
      this.user_constituency = obj[this.district];
    }
  }
  // OBconstituency_change(a: any) {
  //   //this.user_constituency=[];
  //   let obj = this.constituency_list;
  //   this.user_constituency = obj[a];
  //   // this.user_constituency.unshift('Select Option');
  //   this.OBConstituency = '';
  // }
  // getdata() {
  //   // this.customers=[];
  //   //     for(const prop in this.ApiService.tabledataOB) {
  //   //         this.customers.push(this.ApiService.tabledataOB[prop])
  //   //       }
  //   //       this.customers.pop();
  //   //console.log(this.ApiService.tabledataDA)
  //   //this.ApiService.viewtableOB();

  //   this.ApiService.datablelogin(this.districtname).subscribe((data: any) => {
  //     let obj = data;
  //     this.tableshow = true;
  //     // console.log(obj.data);

  //     // for(const prop in obj.data) {
  //     //     this.customers.push(obj.data[prop]);
  //     //   }
  //     console.log(this.customers);
  //   });
  // }

  postdata(
    officebearerform: any //officebearerform
  ) {
    console.log(this.officebearerform);
    console.log(this.email);

    console.log(this.firstname);
    console.log(this.lastname);
    // console.log( this.applied_role);
    console.log(this.district);
    console.log(this.constituency);

    if (
      this.officebearerform.valid == true &&
      this.email != null &&
      this.firstname != null &&
      this.lastname != null &&
      this.district != '' &&
      this.constituency != ''
    ) {
      console.log(officebearerform);

      this.formData.append('district', this.district);

      this.formData.append('constituency', this.constituency);
      this.formData.append('email', this.officebearerform.get('email').value);
      this.formData.append(
        'firstname',
        this.officebearerform.get('firstname').value
      );
      this.formData.append(
        'lastname',
        this.officebearerform.get('lastname').value
      );
      this.formData.append('age', this.officebearerform.get('age').value);
      this.formData.append(
        'father_name',
        this.officebearerform.get('lastname').value
      );
      this.formData.append(
        'mother_name',
        this.officebearerform.get('mother_name').value
      );
      this.formData.append(
        'educational_qualification',
        this.officebearerform.get('educational_qualification').value
      );
      this.formData.append(
        'date_of_birth',
        this.officebearerform.get('date_of_birth').value
      );
      this.formData.append(
        'additional_qualification',
        this.officebearerform.get('additional_qualification').value
      );
      this.formData.append(
        'contact_no',
        this.officebearerform.get('contact_no').value
      );
      this.formData.append(
        'whatsapp_no',
        this.officebearerform.get('whatsapp_no').value
      );
      this.formData.append(
        'profession',
        this.officebearerform.get('profession').value
      );
      this.formData.append(
        'flat_no',
        this.officebearerform.get('flat_no').value
      );
      // this.formData.append(
      //   'applied_role',
      //   this.officebearerform.get('applied_role').value
      // );
      this.formData.append(
        'approval_status',
        this.officebearerform.get('approval_status').value
      );
      // this.formData.append(
      //   'applied_posting',
      //   this.officebearerform.get('applied_posting').value
      // );
      this.formData.append(
        'party_comments',
        this.officebearerform.get('party_comments').value
      );
      this.formData.append(
        'location_id',
        this.officebearerform.get('location_id').value
      );
      this.formData.append('mode', this.officebearerform.get('mode').value);
      this.formData.append(
        'street_name',
        this.officebearerform.get('street_name').value
      );
      this.formData.append(
        'town_city',
        this.officebearerform.get('town_city').value
      );
      this.formData.append('taluk', this.officebearerform.get('taluk').value);
      this.formData.append(
        'pincode',
        this.officebearerform.get('pincode').value
      );
      this.formData.append(
        'other_qualification',
        this.officebearerform.get('other_qualification').value
      );
      this.formData.append(
        'degree_major',
        this.officebearerform.get('degree_major').value
      );
      this.formData.append('images', this.officebearerform.get('images').value);
      if (officebearerform.get('images').value != '') {
        this.formData.append('imagefield', '1');
      } else {
        this.formData.append('imagefield', '0');
      }

      this.formData.append('fb_id', this.officebearerform.get('fb_id').value);
      this.formData.append(
        'twitter_id',
        this.officebearerform.get('twitter_id').value
      );

      // console.log(this.officebearerform.get('mode').value);
      // // if (this.officebearerform.get('mode').value === '1') {
      //   console.log('da');
      this.formData.append('user_id', this.loginuser.id);
      this.ApiService.updateddaSelf(this.formData).subscribe(
        (data) => {
          console.log(data);
          this.spinnerService.hide();

          alert('your detail are updated!');
          this.reload();
        },

        (error) => {
          console.log(error);
        }
      );
      // }
      // else {
      //   console.log('ob');
      //   this.ApiService.create_office_bearers(this.formData).subscribe(
      //     (data) => {
      //       console.log('data');

      //       // alert("Office bearer has been created successfully!")
      //       console.log(data);
      //       this.username = data.whatsapp_no;
      //       console.log(data.whatsapp_no, data.password);
      //       this.user_password = data.password;
      //       //this.router.navigate(['']);
      //       //  officebearerform.reset();
      //     },

      //     (error) => {
      //       console.log(error);
      //     }
      //   );
      // }
      //  officebearerform.reset();
    } else {
      this.hidden = false;
    }
    this.message = true;
  }
  reload() {
    window.location.reload();
  }
  delete_ob(user_id: any) {
    console.log(user_id);
    if (confirm('Are you sure want to delete this record ?')) {
      console.log('Implement delete functionality here');
      this.ApiService.delete_admin(user_id)
        .pipe()
        .subscribe(
          (data) => {
            window.location.reload();
            //this.router.navigate(['uikit/formlayout']);
            alert('Office Bearer detail has been deleted !');
          },

          (error) => {
            console.log(error);
          }
        );
    }
  }
  get email() {
    return this.officebearerform.get('email');
  }
  get firstname() {
    return this.officebearerform.get('firstname');
  }
  get lastname() {
    return this.officebearerform.get('lastname');
  }
  // get constituency() { return this.officebearerform.get('constituency'); }
  // get applied_role() {
  //   return this.officebearerform.get('applied_role');
  // }
  get father_name() {
    return this.officebearerform.get('father_name');
  }
  get mother_name() {
    return this.officebearerform.get('mother_name');
  }
  get educational_qualification() {
    return this.officebearerform.get('educational_qualification');
  }
  get additional_qualification() {
    return this.officebearerform.get('additional_qualification');
  }
  get contact_no() {
    return this.officebearerform.get('contact_no');
  }
  get whatsapp_no() {
    return this.officebearerform.get('whatsapp_no');
  }
  get profession() {
    return this.officebearerform.get('profession');
  }
  get address() {
    return this.officebearerform.get('address');
  }
  get party_comments() {
    return this.officebearerform.get('party_comments');
  }
  get street_name() {
    return this.officebearerform.get('street_name');
  }
  get town_city() {
    return this.officebearerform.get('town_city');
  }
  get taluk() {
    return this.officebearerform.get('taluk');
  }
  get pincode() {
    return this.officebearerform.get('pincode');
  }
  get flat_no() {
    return this.officebearerform.get('flat_no');
  }
  // get applied_posting() {
  //   return this.officebearerform.get('applied_posting');
  // }
  get fb_id() {
    return this.officebearerform.get('fb_id');
  }
  get twitter_id() {
    return this.editform.get('twitter_id');
  }

  get firstname1() {
    return this.editform.get('firstname1');
  }
  get lastname1() {
    return this.editform.get('lastname1');
  }
  get father_name1() {
    return this.editform.get('lastname1');
  }
  get mother_name1() {
    return this.editform.get('mother_name1');
  }
  get educational_qualification1() {
    return this.editform.get('educational_qualification1');
  }
  get additional_qualification1() {
    return this.editform.get('additional_qualification1');
  }
  get contact_no1() {
    return this.editform.get('contact_no1');
  }
  get whatsapp_no1() {
    return this.editform.get('whatsapp_no1');
  }
  get profession1() {
    return this.editform.get('profession1');
  }
  // get applied_role1() {
  //   return this.editform.get('applied_role1');
  // }
  get party_comments1() {
    return this.editform.get('party_comments1');
  }
  get street_name1() {
    return this.editform.get('street_name1');
  }
  get email1() {
    return this.editform.get('email1');
  }
  get flat_no1() {
    return this.officebearerform.get('flat_no1');
  }
  get town_city1() {
    return this.officebearerform.get('town_city1');
  }
  get taluk1() {
    return this.officebearerform.get('taluk1');
  }
  get pincode1() {
    return this.officebearerform.get('pincode1');
  }
  // get applied_posting1() {
  //   return this.editform.get('applied_posting1');
  // }
  get fb_id1() {
    return this.officebearerform.get('fb_id1');
  }
  get twitter_id1() {
    return this.editform.get('twitter_id1');
  }

  // OBid: any;
  // OBname: any;
  // OBlastname: any;
  // OBdesig: any;
  // OBparty_desig: any;
  // OBmail: any;
  // OBstatus: any;
  // OBage: any;
  // OBdateofbirth: any;
  // OBfathername: any;
  // OBmothername: any;
  // OBdegree: any;
  // OBaddtionaldegree: any;
  // OBphonenumber: any;
  // // OBapproval_status:any;
  // whatsappnumner: any;
  // OBprofession: any;
  // OBaddress: any;
  // OBold_designation: any;
  // OBcomments: any;
  // OBnew_designation: any;
  // OBreason: any;
  // fullname1: any;
  // OBDistrict: any;
  // OBConstituency: string;
  // OBflat_no: any;
  // OBstreet_name: any;
  // OBtown_city: string;
  // OBtaluk: string;
  // OBpincode: string;
  // OBapplied_posting: string;
  // OBother_qualification: any;
  // OBdegree_major: any;
  // OBfb_id: any;
  // OBtwitter_id: any;

  // editbuttonviewOB(a: any) {
  //   this.imageField = true;
  //   console.log(a);
  //   this.OBid = a.id;
  //   this.OBname = a.firstname;
  //   this.OBlastname = a.lastname;
  //   this.OBage = a.age;
  //   this.OBdateofbirth = a.date_of_birth;
  //   this.OBfathername = a.father_name;
  //   this.OBmothername = a.mother_name;
  //   this.OBdegree = a.educational_qualification;
  //   this.OBaddtionaldegree = a.additional_qualification;
  //   this.OBphonenumber = a.contact_no;
  //   this.whatsappnumner = a.whatsapp_no;
  //   this.OBmail = a.email;
  //   this.OBprofession = a.profession;
  //   this.OBaddress = a.address1;
  //   this.OBstatus = a.approval_status;
  //   this.OBold_designation = a.applied_role;
  //   this.OBcomments = a.party_comments;
  //   this.fullname1 = a.name;
  //   this.OBDistrict = a.district;
  //   this.OBConstituency = a.constituency;
  //   this.OBflat_no = a.flat_no;
  //   this.OBstreet_name = a.address1;
  //   this.OBtown_city = a.town_city;
  //   this.OBtaluk = a.taluk;
  //   this.OBpincode = a.pincode;
  //   this.OBapplied_posting = a.applied_posting;
  //   this.OBother_qualification = a.other_qualification;
  //   this.OBdegree_major = a.degree_major;
  //   this.OBfb_id = a.fb_id;
  //   this.OBtwitter_id = a.twitter_id;

  //   console.log(this.OBConstituency);
  //   let obj = this.constituency_list;
  //   this.user_constituency = obj[this.OBDistrict];

  //   //API call to get user image
  //   this.spinner = true;
  //   this.ApiService.getImage(a.id).subscribe((data) => {
  //     //console.log(data);
  //     this.spinner = false;
  //     let objectURL = 'data:image/jpeg;base64,' + data.image;
  //     this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //     console.log(this.userImage);
  //   });

  //   this.reqform.patchValue({
  //     id1: this.OBid,
  //     email1: this.OBmail,
  //     name: this.fullname1,
  //     old_designation: this.OBold_designation,
  //     new_designation1: '',
  //     reason: '',
  //   });
  //   this.editform.patchValue({
  //     id1: this.OBid,
  //     email1: this.OBmail,
  //     firstname1: this.OBname,
  //     lastname1: this.OBlastname,
  //     age1: this.OBage,
  //     designation1: this.OBdesig,
  //     party_designation1: this.OBparty_desig,
  //     approval_status1: this.OBstatus,
  //     father_name1: this.OBfathername,
  //     mother_name1: this.OBmothername,
  //     educational_qualification1: this.OBdegree,
  //     date_of_birth1: this.OBdateofbirth,
  //     additional_qualification1: this.OBaddtionaldegree,
  //     contact_no1: this.OBphonenumber,
  //     whatsapp_no1: this.whatsappnumner,

  //     profession1: this.OBprofession,
  //     address1: this.OBaddress,
  //     applied_role1: this.OBold_designation,
  //     party_comments1: this.OBcomments,
  //     location_id1: '1',
  //     mode1: '2',
  //     flat_no1: this.OBflat_no,
  //     street_name1: this.OBstreet_name,
  //     town_city1: this.OBtown_city,
  //     taluk1: this.OBtaluk,
  //     pincode1: this.OBpincode,
  //     applied_posting1: this.OBapplied_posting,
  //     other_qualification1: this.OBother_qualification,
  //     degree_major1: this.OBdegree_major,
  //     fb_id1: this.OBfb_id,
  //     twitter_id1: this.OBtwitter_id,
  //   });
  // }
  // updatedata(updateform: any) {
  //   // console.log(this.OBDistrict,'',this.OBConstituency);
  //   console.log(updateform);

  //   if (updateform.get('degree_major1').value !== 'OTHERS') {
  //     updateform.get('other_qualification1').setValue('');
  //   }
  //   this.formData.append('district', this.OBDistrict);
  //   this.formData.append('constituency', this.OBConstituency);
  //   this.formData.append('email', updateform.get('email1').value);
  //   this.formData.append('firstname', updateform.get('firstname1').value);
  //   this.formData.append('lastname', updateform.get('lastname1').value);
  //   this.formData.append('age', updateform.get('age1').value);
  //   this.formData.append('father_name', updateform.get('lastname1').value);
  //   this.formData.append('mother_name', updateform.get('mother_name1').value);
  //   this.formData.append(
  //     'educational_qualification',
  //     updateform.get('educational_qualification1').value
  //   );
  //   this.formData.append(
  //     'date_of_birth',
  //     updateform.get('date_of_birth1').value
  //   );
  //   this.formData.append(
  //     'additional_qualification',
  //     updateform.get('additional_qualification1').value
  //   );
  //   this.formData.append('contact_no', updateform.get('contact_no1').value);
  //   this.formData.append('whatsapp_no', updateform.get('whatsapp_no1').value);
  //   this.formData.append('profession', updateform.get('profession1').value);
  //   this.formData.append('flat_no', updateform.get('flat_no1').value);
  //   this.formData.append('applied_role', updateform.get('applied_role1').value);
  //   this.formData.append(
  //     'status_approval',
  //     updateform.get('approval_status1').value
  //   );
  //   this.formData.append(
  //     'applied_posting',
  //     updateform.get('applied_posting1').value
  //   );
  //   this.formData.append(
  //     'party_comments',
  //     updateform.get('party_comments1').value
  //   );
  //   this.formData.append('location_id', '1');
  //   this.formData.append('mode', '2');
  //   this.formData.append('address1', updateform.get('address1').value);
  //   this.formData.append('town_city', updateform.get('town_city1').value);
  //   this.formData.append('taluk', updateform.get('taluk1').value);
  //   this.formData.append('pincode', updateform.get('pincode1').value);
  //   this.formData.append(
  //     'other_qualification',
  //     updateform.get('other_qualification1').value
  //   );
  //   this.formData.append('degree_major', updateform.get('degree_major1').value);
  //   this.formData.append('images', updateform.get('images1').value);
  //   this.formData.append('user_id', this.OBid);
  //   this.formData.append('fb_id', updateform.get('fb_id1').value);
  //   this.formData.append('twitter_id', updateform.get('twitter_id1').value);
  //   if (updateform.get('images1').value != '') {
  //     this.formData.append('imagefield', '1');
  //   } else {
  //     this.formData.append('imagefield', '0');
  //   }

  //   console.log(this.formData);

  //   if (
  //     this.OBConstituency != '' &&
  //     this.test_email == 'false' &&
  //     this.test_ph == 'false'
  //   ) {
  //     console.log(updateform);
  //     this.spinner = true;
  //     this.ApiService.updateOB(this.formData)
  //       .pipe()
  //       .subscribe(
  //         (data) => {
  //           console.log(data);
  //           this.spinnerService.hide();
  //           setTimeout(function () {
  //             alert('Office Bearer detail was updated!');
  //             window.location.reload();
  //           }, 100);
  //         },

  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   } else {
  //     this.hidden = false;
  //   }
  // }
  old_mail: any;
  old_whatsapp: any;
  get_oldmail(old_record) {
    this.old_mail = old_record.email;
    this.old_whatsapp = old_record.whatsapp_no;
    // console.log(this.old_whatsapp );
  }
  test_ph = 'false';
  test_ph1 = 'false';
  getphone(c, add) {
    // console.log(add)
    if (add == 'ADD') {
      if (this.officebearerform.get('whatsapp_no').status == 'VALID') {
        // console.log(c);
        this.ApiService.ph_check().subscribe((data) => {
          //  console.log(data);
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];
            // console.log(d.whatsapp_no );
            // Do something with value
            if (c == d.whatsapp_no) {
              //console.log("tttt")
              this.test_ph = 'true';
              break;
            } else {
              //console.log("esle")
              this.test_ph = 'false';
            }
          }
        });
      }
    } else {
      if (this.editform.get('whatsapp_no1').status == 'VALID') {
        // console.log("edit");
        // console.log(this.old_whatsapp);
        // console.log(c);
        if (this.old_whatsapp == c) {
          this.test_ph1 = 'false';
          // console.log(this.test_ph)
        } else {
          this.ApiService.ph_check().subscribe((data) => {
            console.log(data);
            for (let whatsapp_no in data) {
              let d = data[whatsapp_no];

              if (c == d.whatsapp_no) {
                this.test_ph1 = 'true';
                // console.log(this.test_ph)
                break;
              } else {
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
  email_1: any = [];
  test_email = 'false';
  test_email1 = 'false';
  getemail(a, add) {
    if (add == 'ADD') {
      // console.log(add);
      // console.log('old_em')
      // console.log( this.SAmail)
      if (this.officebearerform.get('email').status == 'VALID') {
        // console.log(a);
        this.ApiService.email_check().subscribe((data) => {
          for (let email in data) {
            let b = data[email];
            // Do something with value
            if (a == b.email) {
              //console.log("tttt")
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
        // console.log("edit");
        // console.log(a);
        // console.log(this.old_mail);

        if (this.old_mail == a) {
          this.test_email1 = 'false';
        } else {
          this.ApiService.email_check().subscribe((data) => {
            for (let email in data) {
              let b = data[email];
              // Do something with value
              if (a == b.email) {
                //console.log("tttt")
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

  nopost_Error_msg: boolean = false;
  nopost_msg() {
    this.nopost_Error_msg = true;
  }
  isWhatsAppNumberDisabled: boolean = false;
  onSelectChange(fulluserDetails: any) {
    console.log('fulluserDetails');
    console.log(fulluserDetails.data[0]);
    if (fulluserDetails.data[0].images) {
      this.ApiService.getImage(fulluserDetails.data[0].id).subscribe((data) => {
        //console.log(data);
        this.spinner = false;
        let objectURL =
          'data:image/jpeg;base64,' + fulluserDetails.data[0].images;
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        this.officebearerform.get('images').setErrors(null);
      });
    } else {
      this.imageSrc = '';
    }
    if (fulluserDetails.data[0].email) {
      this.test_email == 'false';
    } else {
      this.test_email == 'true';
    }
    if (fulluserDetails.data[0].whatsapp_no) {
      this.test_ph == 'false';
    } else {
      this.test_ph == 'true';
    }
    this.constituency = fulluserDetails.data[0].constituency || '';
    this.officebearerform.patchValue({
      firstname: fulluserDetails.data[0].firstname || '',
      lastname: fulluserDetails.data[0].lastname || '',
      father_name: fulluserDetails.data[0].lastname || '',
      contact_no: fulluserDetails.data[0].contact_no || '',
      whatsapp_no: fulluserDetails.data[0].whatsapp_no || '',
      approval_status: fulluserDetails.data[0].approval_status || '',
      location_id: fulluserDetails.data[0].location_id || '',
      mode: fulluserDetails.data[0].mode || '',
      email: fulluserDetails.data[0].email || '',
      date_of_birth:
        fulluserDetails.data[0].date_of_birth || this.setCurrentdate(),
      mother_name: fulluserDetails.data[0].mother_name || '',
      educational_qualification:
        fulluserDetails.data[0].educational_qualification || '',
      degree_major: fulluserDetails.data[0].degree_major || '',
      additional_qualification:
        fulluserDetails.data[0].additional_qualification || '',
      fb_id: fulluserDetails.data[0].fb_id || '',
      twitter_id: fulluserDetails.data[0].twitter_id || '',
      profession: fulluserDetails.data[0].profession || '',
      flat_no: fulluserDetails.data[0].flat_no || '',
      street_name: fulluserDetails.data[0].address1 || '',
      town_city: fulluserDetails.data[0].town_city || '',
      taluk: fulluserDetails.data[0].taluk || '',
      pincode: fulluserDetails.data[0].pincode || '',
      party_comments: fulluserDetails.data[0].party_comments || '',

      //  images: this.imageSrc,
    });

    // this.fulluserDetails.

    // this.officebearerform.controls['firstname'].setValue(this.fulluserDetails.firstname);
    this.officebearerform.updateValueAndValidity();
    // this.hidden = true;
    this.isWhatsAppNumberDisabled = true;
    // } else {
    //   const clearValues = {
    //     firstname: '',
    //     lastname: '',
    //     father_name: '',
    //     contact_no: '',
    //     whatsapp_no: '',
    //     approval_status: '',
    //     email: '',
    //     date_of_birth: '',
    //     mother_name: '',
    //     educational_qualification: '',
    //     degree_major: '',
    //     additional_qualification: '',
    //     fb_id: '',
    //     twitter_id: '',
    //     profession: '',
    //     flat_no: '',
    //     street_name: '',
    //     town_city: '',
    //     taluk: '',
    //     pincode: '',
    //     party_comments: '',
    //     images: '',
    //     location_id: 1,
    //     mode: 2,
    //   };
    //   this.partyDesignation = '';
    //   // Use patchValue to clear the specified values
    //   this.officebearerform.patchValue(clearValues);
    //   // this.officebearerform.reset(); // Reset the form to clear values
    //   this.isWhatsAppNumberDisabled = false;
    // }
    // You can perform any actions based on the selected value here
  }

  // postdata1(
  //   angForm1 //angForm1
  // ) {
  //   console.log(angForm1);
  //   if ((angForm1.status = 'valid')) {
  //     this.ApiService.rq_form(
  //       angForm1.get('name').value,
  //       this.OBid,
  //       angForm1.get('email1').value,
  //       angForm1.get('old_designation').value,
  //       angForm1.get('new_designation1').value,
  //       angForm1.get('reason').value,
  //       angForm1.get('district').value &&
  //         this.test_email == 'false' &&
  //         this.test_ph == 'false'
  //     )
  //       .pipe()
  //       .subscribe(
  //         (data) => {
  //           // console.log(angForm1.value.name,angForm1.value.user_id,angForm1.value.new_designation,angForm1.value.old_designation,angForm1.value.reason );
  //           alert('Request has been sended successfully!');

  //           this.router.navigate(['superadmin/Approve-Reject']);
  //           angForm1.reset();
  //         },

  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   } else {
  //     alert('Please enter the valid details');
  //   }
  // }
  professionOption(option: any) {
    this.educationOptions = option;
    // console.log(this.MeetingOptions);
  }

  calculateAge() {
    // console.log(this.date_of_birth);

    const today = new Date();
    const birthdate = new Date(this.date_of_birth);
    this.age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      this.age--;
    }
  }

  edit_dateofbirth: string;
  editAge: number;
  editcalculateAge() {
    //console.log(this.edit_dateofbirth);
    const today1 = new Date();
    const birthdate1 = new Date(this.edit_dateofbirth);
    this.editAge = today1.getFullYear() - birthdate1.getFullYear();
    const i = today1.getMonth() - birthdate1.getMonth();
    if (i < 0 || (i === 0 && today1.getDate() < birthdate1.getDate())) {
      this.editAge--;
    }
    //console.log(this.editAge);
  }

  // get user_id() {
  //   return this.reqform.get('user_id');
  // }
  // //get email1() { return this.reqform.get('email1'); }
  // get name() {
  //   return this.reqform.get('name');
  // }
  // get new_designation() {
  //   return this.reqform.get('new_designation');
  // }
  // get old_designation() {
  //   return this.reqform.get(' old_designation');
  // }
  // get responcibility() {
  //   return this.reqform.get(' responcibility');
  // }
  // get reason1() { return this.reqform.get('reason1'); }

  //To print the viewform
  // isClassEnabled: boolean = true;
  // PrintViewForm() {
  //   this.isClassEnabled = false;
  //   setTimeout(function () {
  //     window.print();
  //   }, 100);
  // }
  // @HostListener('window:afterprint')
  // onAfterPrint() {
  //   location.reload();
  // }

  //show father name in field while entering
  showfathername(fathername: any) {
    this.ln = fathername;
  }

  print() {
    console.log(this.officebearerform);
  }
}
