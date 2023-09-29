import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  district_list: any[] = this.ApiService.all_districts;
  users: any = JSON.parse(localStorage.getItem('login_user_details'));
  district: any;
  constituency: string = '';
  OBConstituency: string;
  user_constituency: any = this.ApiService.all_constituency['Chennai North'];
  assigned_to: any;
  user_name: any = this.ApiService.user_details.firstname;
  user_id: any = this.ApiService.user_details.id;
  activity_type: any;
  activity_date: any;
  activity_time: any;
  activity: any;
  description: any;
  status: any;
  others: any;
  customers:any=[];
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
  dropdownSettings: IDropdownSettings = {};
  add = [];
  
 
  selectedItems = [];
  
  dropDownForm: FormGroup;
  tableshow: boolean=false;
  editmeetingform !:FormGroup;
  CM_id: any;


  getChangeAssignedTo(assigned_to: any) {
    console.log(assigned_to)
    if (assigned_to === 'district') {
      $('#Check1').css('display','flex')
    } else {
       $('#Check1').css('display','none')
    }
  }


  getChangeToConstituey(value: any) {
    console.log(value);
    this.user_constituency = this.ApiService.all_constituency[value];
      this.ApiService.datablelogin(value).subscribe((data: any) => {
      let obj = data;
        this.customers = obj.data;
  
      //console.log(obj.data.length);
    });
  }

  handleActivityTypeChange(value: any) {
    console.log(value);
    if (value === 'Others') {
      $('#others').css('display', 'flex');
    }
  }

  handleAdding() {
    console.log('coming');
    let len = $('.adding').length ;
    let script = '<div class="adding adding_' + len + '"><br/><div class="row"><button class="btn btn-danger btn-sm"  >Cancel</button></div><div class="row"><div class="col-sm-6"><label class="form-label">User Name<span style="color:red">*</span></label>';
    script += '<input type="text" class="form-control" formControlName="add[user_name][]" placeholder="Enter User Name" required /></div><div class="col-sm-6"><label class="form-label">OB Status<span style="color:red">*</span></label>';
    script += '<select class="form-control" formControlName="add[ob_status][]"><option>Open</option><option>Inprogress</option><option>Completed</option></select></div></div><div class="row"><div class="col-md-12"><label class="form-label">OB Comments</label><textarea formControlName="add[comments][]" class="form-control"></textarea></div></div>';
    script += '<div class="row"><div class="col-md-12"><label class="form-label">OB Pictures<span style="color:red">*</span></label><input type="file" class="form-control" formControlName="add[ob_picture][]" /></div></div></div>';
    $('#adding').append(script);
  }


  handleDeleteClick(id: any) {
    
    $(`#adding_${id}`).remove();
  }

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
    public datepipe:DatePipe, private elementRef: ElementRef, private renderer: Renderer2) {
    this.createmeetingform= this.fb.group({
      user_name: ['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      activity_date:[this.current_date,Validators.required,],
      activity_time:[this.current_time,Validators.required],
      activity:['',Validators.required],
      assigned_to:['',Validators.required],
      district:['',Validators.required],
      constituency:['',Validators.required],
      activity_type:['',Validators.required],
      description:['',Validators.required],
      status: ['', Validators.required],
      others: ['', Validators.required],
      user_id: ['', Validators.required],
      
    });
    this.editformInitialize('false');

  }


  dtOptions: DataTables.Settings = {};
  date:any;
  ngOnInit(): void{
    console.log(this.users,this.users.firstname, "sndknsdkjn");
  this.date=new Date();
// document.write(today);
    this.customers=[];
    this.showSpinner();
    this.ApiService.viewTableActivity().subscribe((data: any) => {
      console.log(data,"s,mfdnsd");
     
      this.customers=data;
      this.tableshow=true;
      //console.log(this.customers.length);
      //console.log(obj.data.length);
      console.log(this.customers,"dsdksbk");
      ;})

    // this.getdata();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOBapprove();
    // this.ApiService.viewtablemeeting();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    const all_districts = this.ApiService.meeting_districts;
    this.dropdownList = all_districts;
  
   
    this.selectedItems = [
      { }
    ];
    this.dropDownForm = this.fb.group({
      meeting_district: [this.selectedItems]
  });
  
 

  }
  //Default date time in form
  current_date:any;
  current_time;any;
  setCurrentdate(){
    this.current_date=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.current_time=this.datepipe.transform(new Date(), 'HH:mm');
    this.createmeetingform.get('activity_date').setValue(this.current_date);
    this.createmeetingform.get('activity_time').setValue(this.current_time);
  }
  public showSpinner(): void {
    this.spinnerService.show();
    }

  
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
    console.log(angForm1, "dsnkjkdsjnd");
        console.log(this.createmeetingform.status,
          angForm1,
          angForm1.value.meeting_name,
          angForm1.value.meeting_date,
       );
       
          this.spinner=true;

    this.ApiService.create_activity(angForm1.value).subscribe((d:any) => {
      console.log(d,"sdndsbjbdsskbskj"); 
              this.spinnerService.hide();
              setTimeout(function(){
                alert("Task/Activity has been created successfully!")
                window.location.reload();
                },100)
                 
            //this.router.navigate(['superadmin/Meetings']);
             //angForm1.reset();
            },

            error => {
                console.log(error);
            });
            
         
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
//dropdown overlay reduced for mobileview
    const popupelement = this.elementRef.nativeElement.querySelector('.modal-content');
    if (popupelement) {
      const targetElement = popupelement.querySelector('.dropdown-list');
      if (targetElement) {
        this.renderer.setStyle(targetElement, 'overflow-y', 'hidden');
      }
    }
  }
  CM_name:any;
  CM_meeting_location:any;
  CM_date:any;
  CM_time: any;
  CM_description: any;
  CM_activity_type:any;
  CM_comments:any;
  CM_participants:any;
  CM_constituency: any;
  CM_assigned_to: any;
  CM_status: any;

editfield:boolean=false;
  buttonviewmeeting(a:any,editbutton:any ){
    console.log(a,editbutton,"dsbskdb");
    //console.log(a.date)
    if(editbutton=='edit'){
      this.editfield=true;
      this.CM_name=a.meeting_name;
          this.CM_meeting_location=a.meeting_location;
          this.CM_date=a.date;
          this.CM_time=a.time;
          this.CM_activity_type=a.meeting_type;
          this.CM_comments=a.comments;
          this.CM_participants=a.participants;
      this.CM_constituency = a.constituency;
      this.CM_assigned_to = a.assigned_to;
          this.CM_id=a.id;
          console.log(this.CM_name)
          //this.editformInitialize(false);
      }
    else{
      this.editfield=false;
      this.CM_name = this.user_name;
     //     this.CM_meeting_location=a.meeting_location;
          this.CM_date=a.date;
      this.CM_time = a.time;
      this.CM_description = a.description;
      this.CM_activity_type = a.activity_type;
       this.CM_assigned_to = a.assigned_to;
          this.CM_status=a.status;
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
    this.ApiService.updatemeeting(this.CM_id,updateform.value.meeting_date,updateform.value.meeting_time).pipe().subscribe(
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
      this.participantsptions='';
  }
}
