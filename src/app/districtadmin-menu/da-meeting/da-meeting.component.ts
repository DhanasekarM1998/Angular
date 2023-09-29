import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-da-meeting',
  templateUrl: './da-meeting.component.html',
  styleUrls: ['./da-meeting.component.scss']
})
export class DaMeetingComponent implements OnInit {
  MeetingOptions:any;
  participantsptions:any;
  // districts:any=['Salem','Karur','Namakkal','Trichy'];
  createmeetingform !:FormGroup;
  constituencies!:any;
  meeting_name: any;
  meeting_time: any;
  meeting_date: any;
  participants: any;
  meeting_type: any;
  meeting_location: any;
  spinner: boolean;
  hidden:boolean=true;
  dropdownList : string[]= [];
  dropdownSettings:IDropdownSettings={};
 
  selectedItems = [];
  
  dropDownForm: FormGroup;
  tableshow: boolean=false;
  isButtonDisabled :boolean=false;
  CM_id: any;
  editmeetingform !:FormGroup;
  da_district:string;
  district: any;
  


  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
      console.log('onItemDeSelect', item);
  }
  onSelectAll(items: any) {
      console.log('onSelectAll', items);
  }
  onUnSelectAll() {
      console.log('onUnSelectAll fires');
  }


  constructor(private fb: FormBuilder,private ApiService: ApiServiceService,private router:Router,private spinnerService: NgxSpinnerService,
    public datepipe:DatePipe) {
    this.createmeetingform= this.fb.group({
      meeting_name: ['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      meeting_date:[this.current_date,Validators.required ],
      meeting_time:[this.current_time,Validators.required],
      participants:['',Validators.required],
      meeting_type:['',Validators.required],
      comments:[''],
      meeting_location:['',Validators.required],
      meeting_district:['']
    });
    this.editformInitialize('false');
    this.district = JSON.parse(localStorage.getItem('user_district'));

  }


  dtOptions: DataTables.Settings = {};
  date:any;
  ngOnInit():void{
    const userCategory = localStorage.getItem('category');
    console.log(userCategory);
    // Remove double quotation marks from userCategory
    const cleanedUserCategory = userCategory.replace(/"/g, '');
    console.log(cleanedUserCategory);
    if (cleanedUserCategory === 'OB') {
      console.log('Inside if block');
      this.isButtonDisabled = true;
    } else {
      console.log('Inside else block');
      this.isButtonDisabled = false;
    }
  this.date=new Date();
// document.write(today);
    this.customers=[];
    this.showSpinner();
    this.ApiService.datablemeeting(this.district).subscribe((data:any) => {
      let obj= data;
      this.customers=obj.data;
      this.tableshow=true;
      //console.log(this.customers.length);
      //console.log(obj.data.length);
      console.log(this.customers);
      ;})

    // this.getdata();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOBapprove();
    // this.ApiService.viewtablemeeting();
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [2,'asc']
    };

    const all_districts = this.ApiService.meeting_districts;
    this.dropdownList = all_districts;
  
   
    this.selectedItems = [
      { }
    ];
    this.dropDownForm = this.fb.group({
      meeting_district: [this.selectedItems]
  });
  this.da_district=localStorage.getItem('user_district');
 

  }
  //Default date time in form
  current_date:any;
  current_time;any;
  setCurrentdate(){
    this.current_date=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.current_time=this.datepipe.transform(new Date(), 'HH:mm');
    this.createmeetingform.get('meeting_date').setValue(this.current_date);
    this.createmeetingform.get('meeting_time').setValue(this.current_time);
  }
  public showSpinner(): void {
    this.spinnerService.show();
    }

  customers:any=[];
  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledatameeting) {
            this.customers.push(this.ApiService.tabledatameeting[prop])
          }
          this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    //this.ApiService.viewtableOB();
    

  }

  postdata(angForm1 : any) //angForm1
    {
        console.log(this.createmeetingform.status,
          angForm1.status,
          angForm1.value.meeting_name,
          angForm1.value.meeting_date,
       );
        if(angForm1.status == "VALID" &&  angForm1.value.meeting_name!=null  && angForm1.value.meeting_date !=null  && angForm1.value.meeting_time!=null && angForm1.value.participants !=null &&  angForm1.value.meeting_location !=null &&  this.da_district !=null)
        {
          this.spinner=true;

            this.ApiService.dacreate_meeting(angForm1.value.meeting_name,angForm1.value.meeting_date,
              angForm1.value.meeting_time,angForm1.value.participants,
              angForm1.value.meeting_type,
              angForm1.value.meeting_location,angForm1.value.comments, this.da_district)
            .pipe(first())
            .subscribe(
            data => {
              this.spinnerService.hide();
              setTimeout(function(){
                alert("Meeting has been created successfully!")
                window.location.reload();
                },100)
                 
            //this.router.navigate(['superadmin/Meetings']);
             //angForm1.reset();
            },

            error => {
                console.log(error);
            });
         }
        else{
            this.hidden=false;
        }
    }
    delete_CM(id : any){
      console.log(id)
      if(confirm("Are you sure want to cancel this meeting ?")) {
        console.log("Implement delete functionality here");
          this.ApiService.deletemeeting(id)
          .pipe()
          .subscribe(
          data => {
              window.location.reload();
              alert("Meeting has been cancelled!")
          },

          error => {
              console.log(error);
          });

  }
}

    

  radiobutton(option:any){
    this.MeetingOptions=option;
    // console.log(this.MeetingOptions);
  }
  Participants(a:any){
    this.participantsptions=a;
  }
  CM_name:any;
  CM_meeting_location:any;
  CM_date:any;
  CM_time:any;
  CM_meeting_type:any;
  CM_comments:any;
  CM_participants:any;
  CM_constituency:any;


  editfield:boolean=false;
  buttonviewmeeting(a:any,editbutton:any ){
    console.log(a,editbutton);
    //console.log(a.date)
    if(editbutton=='edit'){
      this.editfield=true;
      this.CM_name=a.meeting_name;
          this.CM_meeting_location=a.meeting_location;
          this.CM_date=a.date;
          this.CM_time=a.time;
          this.CM_meeting_type=a.meeting_type;
          this.CM_comments=a.comments;
          this.CM_participants=a.participants;
          this.CM_constituency=a.constituency;
          this.CM_id=a.id;
          console.log(this.CM_name)
          //this.editformInitialize(false);
      }
    else{
      this.editfield=false;
      this.CM_name=a.meeting_name;
          this.CM_meeting_location=a.meeting_location;
          this.CM_date=a.date;
          this.CM_time=a.time;
          this.CM_meeting_type=a.meeting_type;
          this.CM_comments=a.comments;
          this.CM_participants=a.participants;
          this.CM_constituency=a.constituency;
          
          console.log(this.CM_name)
          //this.editformInitialize(false);
    }
    this.editmeetingform.get('meeting_date').setValue(a.date);
    this.editmeetingform.get('meeting_time').setValue(a.time);
          //this.editmeetingform.controls['meeting_date'].disable();
        //  this.editmeetingform.controls['meeting_date'].setValue(this.CM_date);
        //  this.editmeetingform.controls['meeting_date'].setValue(this.CM_time);

    }

          editformInitialize(a){
            this.editmeetingform= this.fb.group({
              meeting_date:[''],
              meeting_time:[''],
          });
          }
        
          updatedata(updateform,id){
            console.log(updateform,id);  
            this.spinner = true;
            this.ApiService.daupdate_meeting(this.CM_id,updateform.value.meeting_date,updateform.value.meeting_time).pipe().subscribe(
              data => {
                console.log(data);
                this.spinnerService.hide();
                    setTimeout(function () {
                      alert("Meeting detail has been updated!");
                      window.location.reload();
                    }, 100)
                },
              
              error => {
                console.log(error);
              });
          }

//reset form values in createform
  Formreset(){
    this.createmeetingform.reset();
    this.hidden=true;
    this.MeetingOptions='';
    //this.participantsptions='';
}

}
