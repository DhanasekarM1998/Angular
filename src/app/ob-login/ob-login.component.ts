import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ob-login',
  templateUrl: './ob-login.component.html',
  styleUrls: ['./ob-login.component.scss']
})
export class ObLoginComponent implements OnInit {

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

