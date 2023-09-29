import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import Chart from 'chart.js/auto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-da-dashboard',
  templateUrl: './da-dashboard.component.html',
  styleUrls: ['./da-dashboard.component.scss']
})
export class DaDashboardComponent implements OnInit {public chart: any;
  barchat: any;
  data: any;
  keyvalue:any;
  regob:any
  piechartdata: any;
  dashboardcarddata: any;
  appob: any
  activeob: any;
  districtname: any;
  customers: any;
   spinner: boolean;
  tableshow: boolean = false;
  dtOptions: DataTables.Settings = {};
  uploadFiles: any = [];
  uploadFilename: any = [];
  count: any = 0;
  image: any = '';
  ob_status: string = 'Completed';
  ob_comments: string = '';
  createmeetingform !: FormGroup;
  user_activity_id: any;
  

  // ApiServiceService: any;


   constructor(private fb: FormBuilder,private ApiService: ApiServiceService,private router:Router,private spinnerService: NgxSpinnerService,
     public datepipe: DatePipe, private elementRef: ElementRef, private renderer: Renderer2) { 
     this.createmeetingform= this.fb.group({
      user_name: ['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
       ob_status: ['', Validators.required],
       ob_comments: ['', Validators.required],
      
    });
     }
  user_name: any = this.ApiService.user_details.firstname;
  user_id: any = this.ApiService.user_details.id;


   ngOnInit(): void {
 this.districtname=JSON.parse(localStorage.getItem('user_district'));
 console.log(this.districtname)
 console.log('this.districtname')
    this.ApiService.piedatada(this.districtname).subscribe((data:any) => {
     this.barchat=data;
     console.log(this.barchat);
       this.createChart(this.barchat);

      ;
    })
       this.ApiService.viewTableActivity().subscribe((data: any) => {
      console.log(data,"s,mfdnsd");
     
      this.customers=data;
      this.tableshow=true;
      //console.log(this.customers.length);
      //console.log(obj.data.length);
      console.log(this.customers,"dsdksbk");
      ;})
       this.ApiService.chartdatada(this.districtname).subscribe((piedate:any) => {
        // console.log('hipie');
       this.piechartdata=piedate;
         this.piechart(this.piechartdata);

         ;})
         this.ApiService.dashboardcardda(this.districtname).subscribe((cardata:any) => {
          // console.log('card');
         this.dashboardcarddata=cardata;
         console.log(this.dashboardcarddata);
         let obj= this.dashboardcarddata;
       this.regob=obj.REGOB;
       this.appob=obj.APPOB;
       this.activeob=obj.ACTIVEOB;

           ;})
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

   }
  
  selectFiles(event:any) {
    console.log(event.target.files[0].name, "dnjsndk");
    if (event.target.files[0].size < 60000) {
    if (this.uploadFiles.length < 5) {
      $('#title').css('display', 'block');
      $('#list').append(`<label class="form-label">${event.target.files[0].name}</label>`)
      const formData: FormData = new FormData();
      formData.append('file', event.target.files[0]);
      this.ApiService.uploadActivityFile(formData).subscribe((da: any) => {
        this.uploadFiles.push(da);
      })
    } else {
      alert('The file upload should be 5 or less than 5');
    }
    } else {
      alert('The size should be less than 60kb');
      $('#file').val('');
    }
    
  }
  
  handleEdit(editForm: any) {
    console.log(editForm, "dmnsdnksjnsjn");
    this.user_activity_id = editForm.id;

  }
  postdata(form: any) {
    console.log(form.value.ob_status, "sskn"); 

    const array = {
      'status': 'Completed',
      'comments': form.value.ob_comments,
      'user_activity_id': this.user_activity_id,
      'images': this.uploadFiles,
      'user_id': this.user_id,
    }
    this.spinner=true;
    this.ApiService.updateOBActivity(array).subscribe((data) => {
     this.spinnerService.hide();
              setTimeout(function(){
                alert("OB Task/Activity has been created successfully!")
                window.location.reload();
                },100)
    })
  }
    createChart(data){
 console.log(data);
// if(data !=''){
      const barchatgraph = data;

            const months = [];
        const counts = [];

        for (let i = 0; i < barchatgraph.length; i++) {
          months.push(barchatgraph[i].month);
          counts.push(barchatgraph[i].count);
        }


      this.chart = new Chart("MyChart", {

        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: months ,
          // backgroundColor: ["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00"],
          datasets: [
            {                  //
                  // labels: months,
                  label:'Number of engineeers joined' ,
              backgroundColor: ["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00"],
              // hoverBackgroundColor: "#2e59d9",
              // borderColor: ["#4e73df"],
              data:counts,

            },
          ]
        },
        options: {
          aspectRatio:2.0,

        }

      });
    // }
    // else{
    //   MyChart
    // }
    }
    piechart(data){

let values = [];
      let keys = Object.keys(data);
      for (let key in data) {
        values.push(data[key]);
      }
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          // labels: ["Hosur", "Salem", "Trichy", "Madurai", "Kanchipuram", "Chennai"],
          labels:keys,
          datasets: [
            {
               label: "Number of engineers",
              data:values,
              backgroundColor: ['#3B55E6', '#EB4E36', '#43D29E', '#32CBD8', '#E8C63B', '#28C63B',]
            }
          ]
        },
        options: {
          // responsive: true,
          // maintainAspectRatio: false,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                return ctx.chart.data.labels[ctx.dataIndex] + ': ' + value;
              },
              color: 'white'
            }
          }
        },
      //   // plugins: [pluginDataLabels]
       });

    }
  }