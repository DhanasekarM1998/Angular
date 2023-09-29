import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiServiceService } from 'src/app/_service/api-service.service';


@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.scss']
})
export class SADashboardComponent implements OnInit {
  // chart: Chart string[], string>;
  public chart: any;
  barchat: any;
  piechartdata: any;
  dashboardcarddata: any;
  regob: any;
  appob: any;
  activeob: any;

  constructor(public ApiService:ApiServiceService,) { }
  ngOnInit(): void {
    // chartdatasa()
    this.ApiService.chartdatasa().subscribe((data:any) => {     
      this.barchat=data;    
      console.log(this.barchat);
        this.createChart(this.barchat);     
     
        ;})
        this.ApiService.piedatasa().subscribe((piedate:any) => {
           console.log('hipie');
         this.piechartdata=piedate;
           this.piechart(this.piechartdata);
  
           ;})

           this.ApiService.carddatasa().subscribe((cardata:any) => {
            console.log('card');
           this.dashboardcarddata=cardata;
           console.log(this.dashboardcarddata);
           let obj= this.dashboardcarddata;
         this.regob=obj.REGOB;
         this.appob=obj.APPOB;
         this.activeob=obj.ACTIVEOB;
  
             ;})
    //  this.piechart()
    
  }
    createChart(data){

      const barchatgraph = data;    
      console.log()
            const district = [];
        const counts = [];
        
        for (let i = 0; i < barchatgraph.length; i++) {
          district.push(barchatgraph[i].district);
          counts.push(barchatgraph[i].count);
        }
     
      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels:district, 
          datasets: [
            {
              label: "Number of engineers in district-wise",
              backgroundColor:["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00","#CCFF00","#6633FF","#66FF99","#808080"],
              // hoverBackgroundColor: "#2e59d9",
              // borderColor: "#4e73df",
              data: counts,
              
            },
          ]
        },
        options: {
          aspectRatio:2.0,
          
        }
        
      });

    }

    piechart(data){

      let values = [];
      
            let keys = Object.keys(data);
            for (let key in data) {
              values.push(data[key]);
            }
            console.log(data);
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