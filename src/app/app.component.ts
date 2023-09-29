import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dmk-angular14';

  toggle:any=false;
  menuitem:any=false;

  clickEvent(event:any){
    //if you just want to toggle the class; change toggle variable.
    this.toggle = !this.toggle;       
 }
 ngOnInit(){
   

 }
 ngAfterViewInit() {
  this.data()
   // $(document).ready(function() {
   //   $("#example").DataTable();
   // });
 }
 data(){
  
}

 
}
