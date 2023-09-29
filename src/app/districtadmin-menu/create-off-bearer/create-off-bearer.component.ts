import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';

@Component({
  selector: 'app-create-off-bearer',
  templateUrl: './create-off-bearer.component.html',
  styleUrls: ['./create-off-bearer.component.scss']
})
export class CreateOffBearerComponent implements OnInit {
  reqform :FormGroup;
  router: any;
  editform:FormGroup;

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder) 
    { 
      this.officebearerform = this.fb.group({ //angForm
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
        firstname:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        lastname:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
        age:['',Validators.required],
        father_name:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        mother_name:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        educational_qualification:['',Validators.required],
        date_of_birth:[''],
        additional_qualification:[''],
        contact_no:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
        whatsapp_no:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
        profession:[''],
        address1:[''],
        applied_role:['',Validators.required],
        party_comments:[''],
        location_id:['1',Validators.required],
        mode:['2',Validators.required]
      });


      this.editform = this.fb.group({ //angForm
        email1: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
        firstname1:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        lastname1:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
        age1:['',Validators.required],
        father_name1:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        mother_name1:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        educational_qualification1:['',Validators.required],
        date_of_birth1:[''],
        additional_qualification1:[''],
        contact_no1:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
        whatsapp_no1:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
        profession1:[''],
        address1:[''],
        applied_role1:['',Validators.required],
        party_comments1:[''],
        location_id1:['1',Validators.required],
        mode1:['2',Validators.required]
      });

      this.reqform= this.fb.group({
        name: [''],
        email1:[''],
        old_designation:[''],
       new_designation1:[''],
       reason:[''],
        user_id:[''],});
    }
  customers:any=[];
  officebearerform !:FormGroup;
  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.getdata();
    this.ApiService.viewtableOB();
    this.ApiService.viewtableDA();
    this.ApiService.viewtableSA();
    this.ApiService.viewtableOBapprove();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
   
  }
  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledataOB) {
            this.customers.push(this.ApiService.tabledataOB[prop])
          }
          this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    //this.ApiService.viewtableOB();

  }
  postdata(officebearerform : any) //officebearerform
  {

    //if()
    // if(this.officebearerform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null && this.applied_role!=null)
    // {
    //     this.ApiService.create_office_bearers(officebearerform.value.mode,officebearerform.value.email,officebearerform.value.firstname,officebearerform.value.lastname,officebearerform.value.age,officebearerform.value.father_name,officebearerform.value.mother_name,officebearerform.value.educational_qualification,officebearerform.value.date_of_birth,officebearerform.value.additional_qualification,officebearerform.value.contact_no,officebearerform.value.whatsapp_no,officebearerform.value.profession,officebearerform.value.address1,officebearerform.value.applied_role,officebearerform.value.party_comments,officebearerform.value.location_id)
    //     .subscribe(
    //     data => {
    //         alert("Office bearers user has been created successfully!")
    //     //this.router.navigate(['']);
    //     officebearerform.reset();
    //     },

    //     error => {
    //         console.log(error);
    //     });
    // }
    // else{
    //     alert("Please enter the valid details")
    // }

  }
  delete_ob(user_id : any)
    {
        console.log(user_id)
            this.ApiService.delete_admin(user_id)
            .pipe()
            .subscribe(
            data => {

                //this.router.navigate(['uikit/formlayout']);
                alert("Office Bearer detail has been deleted !")
            },

            error => {
                console.log(error);
            });

    }
    get email() { return this.officebearerform.get('email'); }
    get firstname() { return this.officebearerform.get('firstname'); }
    get lastname() { return this.officebearerform.get('lastname'); }
    get applied_role() { return this.officebearerform.get('applied_role'); }
  

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
    OBnew_designation:any;
    OBreason:any;
    fullname1:any;
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
         
        this.fullname1=a.name;

         this.reqform.patchValue({
          id1:this.OBid,
          email1:this.OBmail,
          name:this.fullname1,       
          old_designation:this.OBold_designation,
          new_designation1:"",
          reason:""
         });
  this.editform.patchValue({
          id1:this.OBid,
          email1:this.OBmail,
          firstname1:this.OBname,
          lastname1:this.OBlastname,
          age1:this.OBage,
          designation1:this.OBdesig,
          party_designation1:this.OBparty_desig,
          approval_status1:this.OBstatus,
        father_name1:this.OBfathername,
        mother_name1:this.OBmothername,
        educational_qualification1:this.OBprofession,
        date_of_birth1:this.OBdateofbirth,
        additional_qualification1:this.OBaddtionaldegree,
        contact_no1:this.OBphonenumber,
        whatsapp_no1:this.whatsappnumner,
        profession1:this.OBprofession,
        address1:this.OBaddress,
        applied_role1:this.OBold_designation,
        party_comments1:this.OBcomments,
        location_id1:'1',
        mode1:'2'


        });
}
updatedata(updateform: any){
  console.log(updateform.value);
  // this.ApiService.updateOB('0', this.OBid, updateform.get('email1').value,updateform.get('firstname1').value, updateform.get('lastname1').value,
  // updateform.get('age1').value,
  //   updateform.get('father_name1').value,
  //   updateform.get('mother_name1').value,
  //   updateform.get('educational_qualification1').value,
  //   updateform.get('date_of_birth1').value,
  //   updateform.get('additional_qualification1').value,
  //   updateform.get('contact_no1').value,
  //   updateform.get('whatsapp_no1').value,
  //   updateform.get('profession1').value,
  //   updateform.get('address1').value,
  //   updateform.get('applied_role1').value,
  //   updateform.get('party_comments1').value,
  //   '1')
  //   .pipe()
  //   .subscribe(
  //       data => {
  //           alert("State admin detail was updated!");
  //       },

  //       error => {
  //           console.log(error);
  //       });
}


postdata1(angForm1) //angForm1
{
     console.log(angForm1);
    if( angForm1.status="valid" )
    {
        this.ApiService.rq_form(angForm1.get('name').value,this.OBid,angForm1.get('email1').value,angForm1.get('old_designation').value,angForm1.get('new_designation1').value,angForm1.get('reason').value,angForm1.get('district').value)
        .pipe()
        .subscribe(
        data => {
          // console.log(angForm1.value.name,angForm1.value.user_id,angForm1.value.new_designation,angForm1.value.old_designation,angForm1.value.reason );
            alert("Request has been created successfully!")
   
        this.router.navigate(['superadmin/Approve-Reject']);
        angForm1.reset();
        },

        error => {
            console.log(error);
        });
    }
    else{
        alert("Please enter the valid details");
    }
}





get user_id() { return this.reqform.get('user_id'); }
get email1() { return this.reqform.get('email1'); }
get name() { return this.reqform.get('name'); }
get  new_designation() { return this.reqform.get('new_designation'); }
get old_designation() { return this.reqform.get(' old_designation'); }
get responcibility() { return this.reqform.get(' responcibility'); }
// get reason1() { return this.reqform.get('reason1'); }

}
