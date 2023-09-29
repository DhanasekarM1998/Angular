import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-req-off-bearer-change',
  templateUrl: './req-off-bearer-change.component.html',
  styleUrls: ['./req-off-bearer-change.component.scss']
})
export class ReqOffBearerChangeComponent implements OnInit {
  reqform :FormGroup;
  router: any;
  editform:FormGroup;
  date_of_birth :string;
  age : number;
  hidden:boolean=true;
  district: any;
  constituency: any;
  districtname: any;
  tableshow: boolean=false;
  spinner: boolean;
  requeststatus:string="Pending";
  isButtonDisabled: boolean=false;
 
  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder,private spinnerService: NgxSpinnerService)
    {   this.login_user_detail=JSON.parse(localStorage.getItem('login_user_details'));
        console.log(this.login_user_detail);

        this.add_roleform = this.fb.group({ //angForm
          da_name: [this.login_user_detail['firstname'], [Validators.required]],
          da_district_name:[this.login_user_detail['district'],[Validators.required]],
          district_catagory:['',[Validators.required]],
          role_name:['துணை அமைப்பாளர்',Validators.required],
          });

      this.reqform= this.fb.group({
        name: [''],
        email1:[''],
        old_designation:[''],
       new_designation1:['',Validators.required],
       reason:['',Validators.required],
       district:[''],
        user_id:[''],});
    }
  customers:any=[];
  statusapproval:any=[];
  officebearerform !:FormGroup;
  dtOptions: DataTables.Settings = {};
  emparr:any=[];  
  check_data:number;
  add_post_btn:boolean;
  login_user_detail:object;
  add_roleform :FormGroup;
  //district_catagory:any;

  dropdown_list:any;
  dropdown_map:object={'மாவட்டம்':'','மாநகரம்':'','ஒன்றியம்':'','நகரம்':'','பகுதி':'','பேரூர்':''};
  catagory:any=this.ApiService.catagory;
  PreviousAdd_PostReq:string[]=[];

  ngOnInit(): void {
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
    this.postdata_request(this.requeststatus);
    this.districtname=JSON.parse(localStorage.getItem('user_district'));
    this.ApiService.datablelogin(this.districtname).subscribe((data:any) => {
            console.log(data);
      let obj= data;
      this.customers=obj.data;
      this.tableshow=true;
      console.log(obj.data.length);
      this.check_data=obj.data.length;
      if(this.check_data<28)
      {
        this.add_post_btn=true;
      }
      else{
        this.add_post_btn=false;
      }
      this.tableshow=true;
      ;})
    // this.getdata();
    this.getPosting(this.districtname);
 
    this.ApiService.AddRole_Button(this.districtname).subscribe((data:any) => {
      //console.log(data.data[0]);
      console.log(data.data);
      if(data){
        for(let i in data.data[0]){
        this.PreviousAdd_PostReq.push(data.data[0][i]);
        }
        
        console.log(this.PreviousAdd_PostReq);
      }
      else{
        this.PreviousAdd_PostReq=[];
        console.log(this.PreviousAdd_PostReq);
      }
      

    })
    

this.ApiService.roledatablelogin(this.districtname).subscribe((data:any) => {
      console.log(data);
        if(data!=null){
          let obj= data;
          this.customers=obj.data;
          this.tableshow=true;
          console.log(obj.data.length);
        }
})


//     this.ApiService.viewtableOBapprove().subscribe((data:any) => {
//       console.log(data);
// let obj= data;
// this.statusapproval=obj.data;
// for(let i in this.statusapproval){
//   //console.log(this.statusapproval[i].user_maser_id);
//   this.emparr.push(this.statusapproval[i].user_maser_id);
// }
// console.log( this.emparr);

// this.tableshow=true;
// // console.log(obj.data.length);
// ;})
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOBapprove();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    // this.date_of_birth.valueChanges.subscribe(date_of_birth => {
    //   this.calculateAge(date_of_birth);
    // });
    this.showSpinner();

  }
  getPosting(t) {
    //this.spinner=true;
    this.ApiService.dropdown(t).subscribe(data=>{
      //console.log(data);
      if(data){
        this.spinner=false;
        for(let i=0;i<this.catagory.length;i++){
          this.dropdown_map[this.catagory[i]]=data[i];
          //console.log(data[i])
        }
        console.log(this.dropdown_map);
      }
      


    })}
  //posting dropdown changes respect to selection
  getPostingDropdown(catagory){
    this.dropdown_list=[];
    let obj=this.dropdown_map;
    
    for (const key in obj[catagory]){
      if(obj[catagory].hasOwnProperty(key)){
        //console.log(obj[catagory][key])
        this.dropdown_list.push(obj[catagory][key]);
      }
    }
  }

  public showSpinner(): void {
    this.spinnerService.show();
  }
  /*calculateAge(date_of_birth: string) {
    if (!date_of_birth) {
      this.age.setValue(null);
      return;
    }

    const dobDate = new Date(date_of_birth);
    const today = new Date();
    const ageInMilliseconds = today.getTime() - dobDate.getTime();
    const age = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    this.age.setValue(age.toString());

  }*/

  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledataOB) {
            this.customers.push(this.ApiService.tabledataOB[prop])
          }
          this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    //this.ApiService.viewtableOB();

  }
 
  // postdata(officebearerform : any) //officebearerform
  // {

  //   //if()
  //   if(this.officebearerform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null && this.applied_role!=null)
  //   {
  //       this.ApiService.create_office_bearers(officebearerform.value.mode,officebearerform.value.email,officebearerform.value.firstname,officebearerform.value.lastname,officebearerform.value.age,officebearerform.value.father_name,officebearerform.value.mother_name,officebearerform.value.educational_qualification,officebearerform.value.date_of_birth,officebearerform.value.additional_qualification,officebearerform.value.contact_no,officebearerform.value.whatsapp_no,officebearerform.value.profession,officebearerform.value.address1,officebearerform.value.applied_role,
  //         officebearerform.value.party_comments,officebearerform.value.location_id,this.district,this.constituency)
  //       .subscribe(
  //       data => {
  //           window.location.reload();
  //           alert("Request has been sented successfully!")
  //       //this.router.navigate(['']);
  //       officebearerform.reset();
  //       },

  //       error => {
  //           console.log(error);
  //       });
  //   }
  //   else{
  //       this.hidden=false;
  //   }

  // }
  // delete_ob(user_id : any)
//     {
//         console.log(user_id)
//             this.ApiService.delete_admin(user_id)
//             .pipe()
//             .subscribe(
//             data => {

//                 //this.router.navigate(['uikit/formlayout']);
//                 alert("Office Bearer detail has been deleted !")
//             },

//             error => {
//                 console.log(error);
//             });

//     }
//     get email() { return this.officebearerform.get('email'); }
//     get firstname() { return this.officebearerform.get('firstname'); }
//     get lastname() { return this.officebearerform.get('lastname'); }
//     get applied_role() { return this.officebearerform.get('applied_role'); }


    OBid:any;
    OBname: any;
    OBlastname: any;
    OBdesig: any;
    OBparty_desig: any;
    OBmail: any;
    OBstatus: any;
    OBage: any;
    OBdateofbirth: any;
    OBfathername: any;
    OBmothername: any;
    OBdegree: any;
    OBaddtionaldegree: any;
    OBphonenumber: any;
    whatsappnumner: any;
    OBprofession: any;
    OBaddress: any;
    OBold_designation: any;
    OBcomments: any;
    OBnew_designation1:any;
    OBreason:any;
    fullname1:any;
    OBDistrict:any;
    OBConstituency:any;
    OBapplied_posting: any;
    

    editbuttonviewOB(a:any){
      //console.log(a);
      let fullname=a.name.split(" ");
      this.OBid=a.id;
      this.OBname=fullname[0];
      this.OBlastname=fullname[1];
         this.OBage=a.age;
         this.OBdateofbirth=a.date_of_birth;
         this.OBfathername=a.father_name;
         this.OBfathername=a.mother_name;
         this.OBdegree=a.educational_qualification;
         this.OBaddtionaldegree=a.additional_qualification;
         this.OBphonenumber=a.contact_no;
         this.whatsappnumner=a.whatsapp_no;
         this.OBmail=a.email;
         this.OBprofession=a.profession;
         this.OBaddress=a.address1;
         this.OBold_designation=a.applied_role;
         this.OBcomments=a.party_comments;
         this.OBapplied_posting = a.applied_posting;
        this.fullname1=a.name;
        this.OBDistrict=a.district;
        this.OBConstituency=a.constituency;
        

         this.reqform.patchValue({
          id1:this.OBid,
          email1:this.OBmail,
          name:this.fullname1,
          old_designation:this.OBold_designation,
          new_designation1:"",
          reason:"",
          district:this.OBDistrict,
         });

  // this.editform.patchValue({
  //         id1:this.OBid,
  //         email1:this.OBmail,
  //         firstname1:this.OBname,
  //         lastname1:this.OBlastname,
  //         age1:this.OBage,
  //         district1:this.OBDistrict,
  //         designation1:this.OBdesig,
  //         party_designation1:this.OBparty_desig,
  //         approval_status1:this.OBstatus,
  //       father_name1:this.OBfathername,
  //       mother_name1:this.OBmothername,
  //       district:this.OBDistrict,
  //       educational_qualification1:this.OBprofession,
  //       date_of_birth1:this.OBdateofbirth,
  //       additional_qualification1:this.OBaddtionaldegree,
  //       contact_no1:this.OBphonenumber,
  //       whatsapp_no1:this.whatsappnumner,
  //       profession1:this.OBprofession,
  //       address1:this.OBaddress,
  //       applied_role1:this.OBold_designation,
  //       party_comments1:this.OBcomments,
  //       location_id1:'1',
  //       mode1:'2'


  //       });
}
// updatedata(updateform: any){
//   console.log(updateform.value);
//   this.ApiService.updateOB('0', this.OBid, updateform.get('email1').value,updateform.get('firstname1').value, updateform.get('lastname1').value,
//   updateform.get('age1').value,
//     updateform.get('father_name1').value,
//     updateform.get('mother_name1').value,
//     updateform.get('educational_qualification1').value,
//     updateform.get('date_of_birth1').value,
//     updateform.get('additional_qualification1').value,
//     updateform.get('contact_no1').value,
//     updateform.get('whatsapp_no1').value,
//     updateform.get('profession1').value,
//     updateform.get('address1').value,
//     updateform.get('applied_role1').value,
//     updateform.get('party_comments1').value,
//     '1',this.OBDistrict,this.OBConstituency)
//     .pipe()
//     .subscribe(
//         data => {
//             window.location.reload();
//             alert("State admin detail was updated!");
//         },

//         error => {
//             console.log(error);
//         });
// }


postdata1(angForm1) //angForm1
{
  console.log(angForm1.status);
     console.log(angForm1.get('user_id').value);
    if( angForm1.status =="VALID" )
    {
      this.spinner = true;
        this.ApiService.rq_form(angForm1.get('name').value,this.OBid,angForm1.get('email1').value,angForm1.get('old_designation').value,angForm1.get('new_designation1').value,angForm1.get('reason').value,angForm1.get('district').value)
        .pipe()
        .subscribe(
        data => {
          this.spinnerService.hide();
          setTimeout(function () {
      
          // console.log(angForm1.value.name,angForm1.value.user_id,angForm1.value.new_designation,angForm1.value.old_designation,angForm1.value.reason );
        alert("Request has been sent successfully!")
        window.location.reload();
      }, 100)

        //this.router.navigate(['superadmin/Approve-Reject']);
        angForm1.reset();
        },

        error => {
            console.log(error);
        });
    }
    else{
     this.hidden=false;
     this.nopost_Error_msg=false;
        // alert("Please enter the valid details");
    }
}


// calculateAge() {
//   console.log(this.date_of_birth);
//   console.log("i m in");

//   const today = new Date();
//   const birthdate = new Date(this.date_of_birth);
//   this.age = today.getFullYear() - birthdate.getFullYear();
//   const m = today.getMonth() - birthdate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
//     this.age--;
//   }

// }


get user_id() { return this.reqform.get('user_id'); }
get email1() { return this.reqform.get('email1'); }
get name() { return this.reqform.get('name'); }
get new_designation1() { return this.reqform.get('new_designation1'); }
get old_designation() { return this.reqform.get(' old_designation'); }
get responcibility() { return this.reqform.get(' responcibility'); }
get reason() { return this.reqform.get('reason'); }

get district_catagory() { return this.add_roleform.get('district_catagory'); }

postdata_request(requeststatus:string) //officebearerform
{

    // this.ApiService.request_post_request()
    //   .subscribe(
    //     data => {
    //       console.log(data)
    //     },

    //     error => {
    //       console.log(error);
    //     });
  }
  applied_posting111 = "false";
  applied_posting112 = "false";
  applied_posting113 = "false";
  applied_posting114 = "false";
  applied_posting115 = "false";
  applied_posting116 = "false";
  applied_posting117 = "false";
  applied_posting118 = "false";

  applied_posting119 = "false";
  applied_posting120 = "false";
  applied_posting121 = "false";
  applied_posting122 = "false";
  applied_posting123 = "false";
  applied_posting124 = "false";

  applied_posting125 = "false";
  applied_posting126 = "false";
  applied_posting127 = "false";
  applied_posting128 = "false";

  applied_posting129 = "false";
  applied_posting130 = "false";
  applied_posting131 = "false";
  applied_posting132 = "false";

  applied_posting133 = "false";
  applied_posting134 = "false";
  applied_posting135 = "false";
  applied_posting136 = "false";




  applied_posting137 = "false";
  applied_posting138 = "false";
  applied_posting139 = "false";
  applied_posting140 = "false";



  nopost_Error_msg:boolean=false;
  nopost_msg(){
    this.nopost_Error_msg=true;
    if(this.dropdown_list==''){
        this.hidden=true;
    }
    
  }
  

  getposting1(t ) {
    console.log(t)
    this.ApiService.datablelogin(this.districtname).subscribe(data => {
      ///let object={data:[{id:'000'}]};
      let object: any = data;
      // console.log('ffffff');
      let roles = [];
      object.data.map((data) => {
        roles.push(data.applied_role);
      });
      console.log(roles);
      // let roles2 = [roles];
      // console.log(roles2);
      console.log(t);
      if (roles.length != 0) {
        for (var i = 1; i < t.length; i++) {
          if (t == 'மாவட்டம்') {
            if (t == "மாவட்டம்") {
              console.log(t);
              const value_to_count1: string = "மாவட்ட தலைவர்";
              for (let value of roles) {
                console.log(value)
                if (value == value_to_count1) {
                  this.applied_posting111 = "false";
                  break;
                }
                else {
                  this.applied_posting111 = "true";
                  continue;
                }
              }
              const value_to_count2: string = "மாவட்ட துணை தலைவர்";
              for (let value of roles) {
                if (value === value_to_count2) {
                  this.applied_posting112 = "false";
                  break;
                }
                else {
                  this.applied_posting112 = "true";
                  continue;
                }
              }
              const value_to_count3: string = "மாவட்ட அமைப்பாளர்";
              for (let value of roles) {
                if (value === value_to_count3) {
                  this.applied_posting113 = "false";
                  break;
                }
                else {
                  this.applied_posting113 = "true";
                  continue;
                }
              }
              const value_to_count4: string = "மாவட்ட துணை அமைப்பாளர் 1";
              for (let value of roles) {
                if (value === value_to_count4) {
                  this.applied_posting114 = "false";
                  break;
                }
                else {
                  this.applied_posting114 = "true";
                  console.log(value)
                  continue;
                }
              }
              const value_to_count5: string = "மாவட்ட துணை அமைப்பாளர் 2";
              for (let value of roles) {
                if (value === value_to_count5) {
                  this.applied_posting115 = "false";
                  break;
                }
                else {
                  this.applied_posting115 = "true";
                  continue;
                }
              }
              const value_to_count6: string = "மாவட்ட துணை அமைப்பாளர் 3";
              for (let value of roles) {
                if (value === value_to_count6) {
                  this.applied_posting116 = "false";
                  break;
                }
                else {
                  this.applied_posting116 = "true";
                  continue;
                }
              }
              const value_to_count7: string = "மாவட்ட துணை அமைப்பாளர் 4";
              for (let value of roles) {
                if (value === value_to_count7) {
                  this.applied_posting117 = "false";
                  break;
                }
                else {
                  this.applied_posting117 = "true";
                  continue;
                }
              }
              const value_to_count8: string = "மாவட்ட துணை அமைப்பாளர் 5";
              for (let value of roles) {
                if (value === value_to_count8) {
                  this.applied_posting118 = "false";
                  break;
                }
                else {
                  this.applied_posting118 = "true";
                  continue;
                }
              }
              this.applied_posting119 = "false";
              this.applied_posting120 = "false";
              this.applied_posting121 = "false";
              this.applied_posting122 = "false";
              this.applied_posting123 = "false";
              this.applied_posting124 = "false";
              this.applied_posting125 = "false";
              this.applied_posting126 = "false";
              this.applied_posting127 = "false";
              this.applied_posting128 = "false";
              this.applied_posting129 = "false";
              this.applied_posting130 = "false";
              this.applied_posting131 = "false";
              this.applied_posting132 = "false";
              this.applied_posting133 = "false";
              this.applied_posting134 = "false";
              this.applied_posting135 = "false";
              this.applied_posting136 = "false";
              this.applied_posting137 = "false";
              this.applied_posting138 = "false";
              this.applied_posting139 = "false";
              this.applied_posting140 = "false";
            }
            else {
              console.log("ttttttttt")
            }
          }
          else if (t == 'மாநகரம்') {
            if (t == 'மாநகரம்') {
              console.log(t);
              const value_to_count9: string = "மாநகர அமைப்பாளர்";
              for (let value of roles) {
                // console.log(value)
                if (value == value_to_count9) {
                  this.applied_posting119 = "false";
                  break;
                }
                else {
                  this.applied_posting119 = "true";
                  continue;
                }
              }
              const value_to_count10: string = "மாநகர துணை அமைப்பாளர் 1";
              for (let value of roles) {
                if (value === value_to_count10) {
                  this.applied_posting120 = "false";
                  break;
                }
                else {
                  this.applied_posting120 = "true";
                  continue;
                }
              }
              const value_to_count11: string = "மாநகர துணை அமைப்பாளர் 2";
              for (let value of roles) {
                if (value === value_to_count11) {
                  this.applied_posting121 = "false";
                  break;
                }
                else {
                  this.applied_posting121 = "true";
                  continue;
                }
              }
              const value_to_count12: string = "மாநகர துணை அமைப்பாளர் 3";
              for (let value of roles) {
                if (value === value_to_count12) {
                  this.applied_posting122 = "false";
                  break;
                }
                else {
                  this.applied_posting122 = "true";
                  continue;
                }
              }
              const value_to_count13: string = "மாநகர துணை அமைப்பாளர் 4";
              for (let value of roles) {
                if (value === value_to_count13) {
                  this.applied_posting123 = "false";
                  break;
                }
                else {
                  this.applied_posting123 = "true";
                  continue;
                }
              }
              const value_to_count14: string = "மாநகர துணை அமைப்பாளர் 5";
              for (let value of roles) {
                if (value === value_to_count14) {
                  this.applied_posting124 = "false";
                  break;
                }
                else {
                  this.applied_posting124 = "true";
                  continue;
                }
              }
              this.applied_posting111 = "false";
              this.applied_posting112 = "false";
              this.applied_posting113 = "false";
              this.applied_posting114 = "false";
              this.applied_posting115 = "false";
              this.applied_posting116 = "false";
              this.applied_posting117 = "false";
              this.applied_posting118 = "false";
              this.applied_posting125 = "false";
              this.applied_posting126 = "false";
              this.applied_posting127 = "false";
              this.applied_posting128 = "false";
              this.applied_posting129 = "false";
              this.applied_posting130 = "false";
              this.applied_posting131 = "false";
              this.applied_posting132 = "false";
              this.applied_posting133 = "false";
              this.applied_posting134 = "false";
              this.applied_posting135 = "false";
              this.applied_posting136 = "false";
              this.applied_posting137 = "false";
              this.applied_posting138 = "false";
              this.applied_posting139 = "false";
              this.applied_posting140 = "false";
            }
            // else {

            // }
          }
          else if (t == "ஒன்றியம்") {
            if (t == "ஒன்றியம்") {
              console.log(t);
              const value_to_count15: string = "ஒன்றிய அமைப்பாளர்";
              for (let value of roles) {
                console.log(value)
                if (value == value_to_count15) {
                  this.applied_posting125 = "false";
                  break;
                }
                else {
                  this.applied_posting125 = "true";
                  continue;
                }
              }
              const value_to_count16: string = "ஒன்றிய துணை அமைப்பாளர் 1";
              for (let value of roles) {
                if (value === value_to_count16) {
                  this.applied_posting126 = "false";
                  break;
                }
                else {
                  this.applied_posting126 = "true";
                  continue;
                }
              }
              const value_to_count17: string = "ஒன்றிய துணை அமைப்பாளர் 2";
              for (let value of roles) {
                if (value === value_to_count17) {
                  this.applied_posting127 = "false";
                  break;
                }
                else {
                  this.applied_posting127 = "true";
                  continue;
                }
              }
              const value_to_count18: string = "ஒன்றிய துணை அமைப்பாளர் 3";
              for (let value of roles) {
                if (value === value_to_count18) {
                  this.applied_posting128 = "false";
                  break;
                }
                else {
                  this.applied_posting128 = "true";
                  continue;
                }
              }
              this.applied_posting111 = "false";
              this.applied_posting112 = "false";
              this.applied_posting113 = "false";
              this.applied_posting114 = "false";
              this.applied_posting115 = "false";
              this.applied_posting116 = "false";
              this.applied_posting117 = "false";
              this.applied_posting118 = "false";
              this.applied_posting119 = "false";
              this.applied_posting120 = "false";
              this.applied_posting121 = "false";
              this.applied_posting122 = "false";
              this.applied_posting123 = "false";
              this.applied_posting124 = "false";
              this.applied_posting129 = "false";
              this.applied_posting130 = "false";
              this.applied_posting131 = "false";
              this.applied_posting132 = "false";
              this.applied_posting133 = "false";
              this.applied_posting134 = "false";
              this.applied_posting135 = "false";
              this.applied_posting136 = "false";
              this.applied_posting137 = "false";
              this.applied_posting138 = "false";
              this.applied_posting139 = "false";
              this.applied_posting140 = "false";
            }
          }
          else if (t == "நகரம்") {
            if (t == "நகரம்") {
              console.log(this.applied_posting129);
              const value_to_count19: string = "நகர அமைப்பாளார்";
              for (let value of roles) {
                console.log(roles);
                console.log(value)
                if (value == value_to_count19) {
                  this.applied_posting129 = "false";
                  console
                  break;
                }
                else {
                  this.applied_posting129 = "true";
                  continue;
                }
              }
              console.log(this.applied_posting129);
              const value_to_count20: string = "நகர துணை அமைப்பாளர் 1";
              for (let value of roles) {
                console.log(value);
                if (value === value_to_count20) {
                  console.log("in");
                  this.applied_posting130 = "false";
                  break;
                }
                else {
                  this.applied_posting130 = "true";
                  continue;
                }
              }
              console.log(this.applied_posting130)
              const value_to_count21: string = "நகர துணை அமைப்பாளர் 2";
              for (let value of roles) {
                if (value === value_to_count21) {
                  console.log("hhh");
                  this.applied_posting131 = "false";
                  break;
                }
                else {
                  this.applied_posting131 = "true";
                  continue;
                }
              } console.log(this.applied_posting131)
              const value_to_count22: string = "நகர துணை அமைப்பாளர் 3";

              for (let value of roles) {

                if (value === value_to_count22) {

                  this.applied_posting132 = "false";
                  break;
                }
                else {
                  this.applied_posting132 = "true";
                  continue;
                }
              }
              this.applied_posting111 = "false";
              this.applied_posting112 = "false";
              this.applied_posting113 = "false";
              this.applied_posting114 = "false";
              this.applied_posting115 = "false";
              this.applied_posting116 = "false";
              this.applied_posting117 = "false";
              this.applied_posting118 = "false";
              this.applied_posting119 = "false";
              this.applied_posting120 = "false";
              this.applied_posting121 = "false";
              this.applied_posting122 = "false";
              this.applied_posting123 = "false";
              this.applied_posting124 = "false";
              this.applied_posting125 = "false";
              this.applied_posting126 = "false";
              this.applied_posting127 = "false";
              this.applied_posting128 = "false";
              this.applied_posting133 = "false";
              this.applied_posting134 = "false";
              this.applied_posting135 = "false";
              this.applied_posting136 = "false";
              this.applied_posting137 = "false";
              this.applied_posting138 = "false";
              this.applied_posting139 = "false";
              this.applied_posting140 = "false";
            }
            // else {

            // }
          }
          else if (t == "பகுதி") {
            if (t == "பகுதி") {
              console.log(t);
              const value_to_count23: string = "பகுதி அமைப்பாளர்";
              for (let value of roles) {
                console.log(value)
                if (value == value_to_count23) {
                  this.applied_posting133 = "false";
                  break;
                }
                else {
                  this.applied_posting133 = "true";
                  continue;
                }
              }

              const value_to_count24: string = "பகுதி துணை அமைப்பாளர் 1";

              for (let value of roles) {
                if (value === value_to_count24) {

                  this.applied_posting134 = "false";
                   break;

                }
                else {
                  this.applied_posting134 = "true";
                  continue;
                }
              }
              const value_to_count25: string = "பகுதி துணை அமைப்பாளர் 2";
              for (let value of roles) {
                if (value === value_to_count25) {
                  this.applied_posting135 = "false";
                  break;
                }
                else {
                  this.applied_posting135 = "true";
                  continue;
                }
              }
              const value_to_count26: string = "பகுதி துணை அமைப்பாளர் 3";
              for (let value of roles) {
                if (value === value_to_count26) {
                  this.applied_posting136 = "false";
                  break;
                }
                else {
                  this.applied_posting136 = "true";
                  continue;
                }
              }
              this.applied_posting111 = "false";
              this.applied_posting112 = "false";
              this.applied_posting113 = "false";
              this.applied_posting114 = "false";
              this.applied_posting115 = "false";
              this.applied_posting116 = "false";
              this.applied_posting117 = "false";
              this.applied_posting118 = "false";
              this.applied_posting119 = "false";
              this.applied_posting120 = "false";
              this.applied_posting121 = "false";
              this.applied_posting122 = "false";
              this.applied_posting123 = "false";
              this.applied_posting124 = "false";
              this.applied_posting125 = "false";
              this.applied_posting126 = "false";
              this.applied_posting127 = "false";
              this.applied_posting128 = "false";
              this.applied_posting129 = "false";
              this.applied_posting130 = "false";
              this.applied_posting131 = "false";
              this.applied_posting132 = "false";
              this.applied_posting137 = "false";
              this.applied_posting138 = "false";
              this.applied_posting139 = "false";
              this.applied_posting140 = "false";
            }
            // else {

            // }
          }
          else if (t == "பேரூர்") {
            if (t == "பேரூர்") {
              console.log(t);
              for (let value of roles) {
                const value_to_count27: string = "பேரூர் அமைப்பாளர்";
                console.log(value)
                if (value == value_to_count27) {
                  this.applied_posting137 = "false";
                  break;
                }
                else {
                  this.applied_posting137 = "true";
                  continue;
                }
              }
              const value_to_count28: string = "பேரூர் துணை அமைப்பாளர் 1";
              for (let value of roles) {
                if (value === value_to_count28) {
                  this.applied_posting138 = "false";
                  break;
                }
                else {
                  this.applied_posting138 = "true";
                  continue;
                }
              }
              const value_to_count29: string = "பேரூர் துணை அமைப்பாளர் 2";
              for (let value of roles) {
                if (value === value_to_count29) {
                  this.applied_posting139 = "false";
                  break;
                }
                else {
                  this.applied_posting139 = "true";
                  continue;
                }
              }
              const value_to_count30: string = "பேரூர் துணை அமைப்பாளர் 3";
              for (let value of roles) {
                if (value === value_to_count28) {
                  this.applied_posting140 = "false";
                  break;
                }
                else {
                  this.applied_posting140 = "true";
                  continue;
                }
              }
              this.applied_posting111 = "false";
              this.applied_posting112 = "false";
              this.applied_posting113 = "false";
              this.applied_posting114 = "false";
              this.applied_posting115 = "false";
              this.applied_posting116 = "false";
              this.applied_posting117 = "false";
              this.applied_posting118 = "false";
              this.applied_posting119 = "false";
              this.applied_posting120 = "false";
              this.applied_posting121 = "false";
              this.applied_posting122 = "false";
              this.applied_posting123 = "false";
              this.applied_posting124 = "false";
              this.applied_posting125 = "false";
              this.applied_posting126 = "false";
              this.applied_posting127 = "false";
              this.applied_posting128 = "false";
              this.applied_posting129 = "false";
              this.applied_posting130 = "false";
              this.applied_posting131 = "false";
              this.applied_posting132 = "false";
              this.applied_posting133 = "false";
              this.applied_posting134 = "false";
              this.applied_posting135 = "false";
              this.applied_posting136 = "false";
            }
            else {
              console.log('gggg')

            }
          }       
        

      }}
       });}
  FormReset(){
    this.reqform.reset();
    this.nopost_Error_msg=false;
    this.hidden=true;
    this.add_roleform.markAsUntouched();
    this.add_roleform.controls['district_catagory'].setValue('');
    //this.add_roleform.reset();
  }
  additionalRoleRequest(addpostform){
    console.log(addpostform);
    if(addpostform.invalid){
      this.hidden=false;
    }
    else{
      this.hidden=true;
      this.spinner = true;
      this.ApiService.addtionalPostRequest(this.login_user_detail['id'],this.login_user_detail['firstname'],addpostform.value.da_district_name,addpostform.value.district_catagory,addpostform.value.role_name
      ).subscribe(data=>{
        //console.log(data);
        this.spinnerService.hide();
          setTimeout(function () {
              if(data.hasOwnProperty('applied_role')){
                alert("Additional post request has been sent successfully");
                window.location.reload();
              }
      }, 100)
        
      })
    }
    
  }
}
