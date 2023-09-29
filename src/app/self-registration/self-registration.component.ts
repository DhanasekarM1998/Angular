import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss'],

})
export class SelfRegistrationComponent implements OnInit {




professionOptions(arg0: string) {
throw new Error('Method not implemented.');
}
  selfregistration: any;
  mydist:any;
  angForm :FormGroup;
  hidden:boolean=true;
  district:any;
  age:number;
  date_of_birth:string;
  educationOptions: any='';
  profession:any;
  degree_major:any;
  imageSrc: string;
  formData = new FormData();
  ln: string='';
  spinner: boolean;
  

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder, private router:Router,public datepipe:DatePipe,private spinnerService: NgxSpinnerService) {
      this.mydist = this.ApiService.mydist;
        this.angForm = this.fb.group({ //angForm
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
            firstname:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
            lastname:['',[Validators.pattern('[A-Za-z ]{1,32}')]],
            father_name:['',[Validators.pattern('[A-Za-z ]{1,32}')]],
            //parent_number:['',Validators.required],
            district:['',Validators.required],
            contact_no:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
            date_of_birth:['2003-03-11',[Validators.required]],
            age:['',Validators.required],
            educational_qualification:['',Validators.required],
            profession:[''],
            address1:[''],
            flat_no:[''],
            town_city:[''],
            taluk:[''],
            pincode:['',[Validators.pattern(/^\d{6}$/)]],
            self_profession:[''],
            location_id:['1',Validators.required],
            other_qualification:[''],
            degree_major:['',Validators.required],
            images:['',Validators.required],
            fb_id:[''],
            twitter_id:['']
            });

    }
    district_list:any[]=this.ApiService.all_districts;
    minAge1:Date;
  ngOnInit(): void {

    var today = new Date();
    var minAge = 20;
    this.minAge1 = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    this.setCurrentdate();
    this.showSpinner();
  }


//Dafault age in form
  current_date:any;
  setCurrentdate(){
    this.current_date=this.datepipe.transform(this.minAge1, 'yyyy-MM-dd');
    this.angForm.get('date_of_birth').setValue(this.current_date);
    this.date_of_birth=this.datepipe.transform(this.minAge1, 'yyyy-MM-dd');
    console.log(this.current_date);
  }
//initiate loading timer screen
  public showSpinner(): void {
    this.spinnerService.show();
  }


  get f(){
    return this.angForm.controls;
  }

//get image from user input
fileFormatStatus:boolean=false;
fileSizeStatus:boolean=false;
onFileChange(event) {
    this.fileFormatStatus=false;
    this.fileSizeStatus=false;
    let ImagesAllowed: Array<string> = ['image/png', 'image/jpg', 'image/jpeg'];

    const reader = new FileReader();
    if(event.target.files.length > 0)
    {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
        //checks if the format is allowed
        if(ImagesAllowed.includes(file.type)==false){
            this.fileFormatStatus=true;
            this.imageSrc=null;
            
        }
        else if(file.size>5000000){
            this.fileSizeStatus=true;
            this.imageSrc=null;
        }
        else{
          this.fileFormatStatus=false;
          this.fileSizeStatus=false;
            reader.onload = () => {

                this.imageSrc = reader.result as string;

                const file = (event.target as HTMLInputElement).files[0];
                this.angForm.patchValue({
                  images: file,
                })
                console.log(file);
        }
  }
  }
  //  this.formData.append('file', this.angForm.get('images').value);

  this.angForm.get('images').updateValueAndValidity();

  this.formData.forEach((value,key) => {

    console.log(key+" "+value)


  });

    }


edit_dateofbirth:string;
editAge:number;
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
test_ph = "false";
getphone(c) {
  // console.log(add)

    if (this.angForm.get('contact_no').status == "VALID") {
      //  console.log(c);
      this.ApiService.ph_check().subscribe(data => {
        //  console.log(data);
        for (let whatsapp_no in data) {
          let d = data[whatsapp_no];
          // console.log("for" );
          //  console.log(d.whatsapp_no );
          // Do something with value
          if (c == d.whatsapp_no) {
            //console.log("tttt")
            this.test_ph = "true";
            // console.log(this.test_ph );
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
  test_email = "false";
  getemail(a) {


    console.log(a)
      if (this.angForm.get('email').status == "VALID") {
        // console.log(a);
        this.ApiService.email_check().subscribe(data => {

          for (let email in data) {
            let b = data[email];
            // Do something with value
            if (a == b.email) {
              //console.log("tttt")
              this.test_email = "true";
              console.log(this.test_email)
              break;
            }
            else {
              this.test_email = 'false';
              console.log(this.test_email)
            }
          }

        });
      }
    }
  postdata(angForm1) //angForm1
  {           
    if(angForm1.valid==true && angForm1.value.email!=null && angForm1.value.firstname!=null && angForm1.value.district!=null && angForm1.value.contact_no!=null && angForm1.value.date_of_birth !=null && angForm1.value.age !=null && angForm1.value.other_qualification !=null 
      && angForm1.value.degree_major !=null && this.imageSrc)
    // if(1>0)
    {
      
    this.formData.append('email', this.angForm.get('email').value);
    this.formData.append('firstname', this.angForm.get('firstname').value);
    this.formData.append('lastname', this.angForm.get('lastname').value);
    this.formData.append('father_name', this.angForm.get('lastname').value);
    this.formData.append('district', this.angForm.get('district').value);
    this.formData.append('contact_no', this.angForm.get('contact_no').value);
    this.formData.append('date_of_birth', this.angForm.get('date_of_birth').value);
    this.formData.append('age', this.angForm.get('age').value);
    this.formData.append('location_id', this.angForm.get('location_id').value);
    this.formData.append('images', this.angForm.get('images').value);
    this.formData.append('contact_no', this.angForm.get('contact_no').value);
    this.formData.append('educational_qualification', this.angForm.get('educational_qualification').value);
    this.formData.append('profession', this.angForm.get('profession').value);
    // this.formData.append('additional_qualification', this.angForm.get('additional_qualification').value);
    this.formData.append('address1', this.angForm.get('address1').value);
    this.formData.append('flat_no', this.angForm.get('flat_no').value);
    this.formData.append('town_city', this.angForm.get('town_city').value);
    this.formData.append('taluk', this.angForm.get('taluk').value);
    this.formData.append('pincode', this.angForm.get('pincode').value);
    this.formData.append('degree_major', this.angForm.get('degree_major').value);
    this.formData.append('other_qualification', this.angForm.get('other_qualification').value);
    this.formData.append('fb_id', this.angForm.get('fb_id').value);
    this.formData.append('twitter_id', this.angForm.get('twitter_id').value);



    if( this.formData!=null )
      // if(1>0)
      {   this.spinner=true;
          this.ApiService.userregistration(
            this.formData)
            .subscribe(
              data => {
                  //alert("Self registration is completed successfully!")
                  // console.log(data);
                  this.spinnerService.hide();
                  setTimeout(function () {
                    alert("உங்கள் விண்ணப்பம் ஏற்று கொள்ளப்பட்டது . விரைவில் நீங்கள் தொடர்பு கொள்ளப்படுவீர்கள்.!")
                    window.location.reload();
                  }, 100)
                  
              },

              error => {
                  console.log(error);
              });
      }

   }
      else{
        alert('Enter Valid Details')
        this.hidden=false;
      }
  }

  professionOption(option:any){
    this.educationOptions=option;
    // console.log(this.MeetingOptions);
  }

  calculateAge() {
    console.log(this.date_of_birth);


    const today = new Date();
    const birthdate = new Date(this.date_of_birth);
    this.age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      this.age--;
    }

  }
}
