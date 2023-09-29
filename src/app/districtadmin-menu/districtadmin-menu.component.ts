import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';

@Component({
  selector: 'app-districtadmin-menu',
  templateUrl: './districtadmin-menu.component.html',
  styleUrls: ['./districtadmin-menu.component.scss']
})
export class DistrictadminMenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    }
  toggle:any=false;
  menuitem:any=false;

  clickEvent(event:any){
    //if you just want to toggle the class; change toggle variable.
    this.toggle = !this.toggle;       
 }

 async signout(){
  this.router.navigate(['']);
    await  window.location.reload();
}

}
