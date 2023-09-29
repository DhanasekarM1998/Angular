import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtional-post-req-approval',
  templateUrl: './addtional-post-req-approval.component.html',
  styleUrls: ['./addtional-post-req-approval.component.scss']
})
export class AddtionalPostReqApprovalComponent implements OnInit {

  customers:any;
  dtOptions: DataTables.Settings = {};
  tableshow: boolean=false;
  constructor(public ApiService:ApiServiceService,
    public router:Router) { }
    

  ngOnInit(): void {

    this.getdata();
    this.dtOptions = {
      pagingType: 'full_numbers',
      order:[]
    };
  }
  getdata(){
    this.ApiService.addtionalPostReqApproval().subscribe((data:any) => {
      let obj= data;
      this.customers=obj.data;
      console.log(this.customers);
      this.tableshow=true;
      ;})

    }
  
  approve_role_change(da_id : any,status:any)
    { if(status=='reject'){
      confirm("Are you sure you want to reject the request!");
        }  
      
        //console.log(new_role);
        this.ApiService.Add_RoleApproval(da_id,status)
            .pipe()
            .subscribe(
            data => {if(status=='approve'){
             
              alert("Addtional role has been approved !")
              window.location.reload();
            }
            else{
              // this.router.navigate(['superadmin/Dashboard']);
              alert("Addtional role request has been rejected!")
              window.location.reload();
            }

                
            },

            error => {
                console.log(error);
            });
    }

  

}
