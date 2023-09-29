import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {  Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


import * as am5map from "@amcharts/amcharts5/map";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


//import {Context} from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  private root!: am5.Root;
  barchat: any;
  piechartdata: any;
  dashboardcarddata: any;
  regob: any;
   unique_district_count: any;
  Eng_reg_count:any;
  appob: any;
  activeob: any;
  district_list: any[] = this.ApiService.all_districts;
  hidden: boolean = true;
  district: string = '';
  chartData: any = [];
  arrayData: any = [];
  graphData: any = [];

  constructor(public ApiService: ApiServiceService, @Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }
  
    // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      /* Chart code */
           /* Chart code */
// Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      this.ApiService.getDonutChart().subscribe((d:any) => {

        let data:any = d; 
let root = am5.Root.new("graphDiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
let chart = root.container.children.push(am5percent.PieChart.new(root, {
  radius: am5.percent(90),
  innerRadius: am5.percent(50),
  layout: root.horizontalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
let series = chart.series.push(am5percent.PieSeries.new(root, {
  name: "Series",
  valueField: "count",
  categoryField: "profession"
}));

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll(data);

// Disabling labels and ticks
series.labels.template.set("visible", false);
series.ticks.template.set("visible", false);

// Adding gradients
series.slices.template.set("strokeOpacity", 0);
series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
  stops: [{
    brighten: -0.8
  }, {
    brighten: -0.8
  }, {
    brighten: -0.5
  }, {
    brighten: 0
  }, {
    brighten: -0.5
  }]
}));

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
let legend = chart.children.push(am5.Legend.new(root, {
  centerY: am5.percent(50),
  y: am5.percent(50),
  layout: root.verticalLayout
}));
// set value labels align to right
legend.valueLabels.template.setAll({ textAlign: "right" })
// set width and max width of labels
legend.labels.template.setAll({ 
  maxWidth: 140,
  width: 140,
  oversizedBehavior: "wrap"
});

legend.data.setAll(series.dataItems);


// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      series.appear(1000, 100);
      
      

      });
          })


      this.ApiService.getGlobalEnigneer().subscribe((s:any) => {
      
      console.log(s);
      /* Chart code */
      let data = s;

let root = am5.Root.new("graphDiv1");
root.setThemes([am5themes_Animated.new(root)]);

let chart = root.container.children.push(am5map.MapChart.new(root, {}));

let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am4geodata_worldLow,
    exclude: ["AQ"]
  })
  
);
        
polygonSeries.data.push({
  geometry: am5map.getGeoCircle({ latitude: 48.86, longitude: 2.35 }, 2)
});
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "India",
  templateField: "polygonSettings"
});
polygonSeries.data.setAll([{
  id: "IN",
  polygonSettings: {
    fill: am5.color(0xFF3C38)
  }
}])



let bubbleSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    valueField: "value",
    calculateAggregates: true,
    polygonIdField: "id"
  })
);

let circleTemplate = am5.Template.new({});

bubbleSeries.bullets.push(function(root, series, dataItem) {
  let container = am5.Container.new(root, {});

  let circle = container.children.push(
    am5.Circle.new(root, {
      radius: 20,
      fillOpacity: 0.7,
      fill: am5.color(0xff0000),
      cursorOverStyle: "pointer",
      tooltipText: `{name}: [bold]{value}[/]`
    })
  );

  let countryLabel = container.children.push(
    am5.Label.new(root, {
      text: "{name}",
      paddingLeft: 5,
      populateText: true,
      fontWeight: "bold",
      fontSize: 13,
      centerY: am5.p50
    })
  );

  // circle.on("radius", function(radius) {
  //   countryLabel.set("x", radius);
  // })

  return am5.Bullet.new(root, {
    sprite: container,
    dynamic: true
  });
});

bubbleSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{value.formatNumber('#.')}",
      fill: am5.color(0xffffff),
      populateText: true,
      centerX: am5.p50,
      centerY: am5.p50,
      textAlign: "center"
    }),
    dynamic: true
  });
});



// minValue and maxValue must be set for the animations to work
bubbleSeries.set("heatRules", [
  {
    target: circleTemplate,
    dataField: "value",
    min: 10,
    max: 50,
    minValue: 0,
    maxValue: 100,
    key: "radius"
  }
]);

      bubbleSeries.data.setAll(data);
      
    })
  }

 

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });

  
  }

  ngOnInit(): void {
    
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
          this.unique_district_count=obj.unique_district_count;
         this.Eng_reg_count=obj.Eng_reg_count;
  
             ;
           })
    
  
    
    this.ApiService.getGlobalChart().subscribe((s:any) => {
      
      console.log(s);
      /* Chart code */
      let data = s;

let root = am5.Root.new("chartdiv");
root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(am5map.MapChart.new(root, {
  
      }));
      chart.set("zoomControl", am5map.ZoomControl.new(root, {
        
  x: am5.p100,
  centerX: am5.p100,
  y: am5.p100,
  centerY: am5.p100,

      }));


let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am4geodata_worldLow,
    exclude: ["AQ"],
    
  })
);

      polygonSeries.data.push({
  geometry: am5map.getGeoCircle({ latitude: 48.86, longitude: 2.35 }, 2)
});
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "India",
  templateField: "polygonSettings"
});
polygonSeries.data.setAll([{
  id: "IN",
  polygonSettings: {
    fill: am5.color(0xFF3C38)
  }}])
    
      

      
      
      

// Configure series
// var polygonTemplate = polygonSeries.mapPolygons.template;
// polygonTemplate.tooltipText = "India";
// polygonTemplate.fill = am4core.color("#74B266");

// // Create hover state and set alternative fill color
// var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = am4core.color("#367B25");


let bubbleSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    valueField: "value",
    calculateAggregates: true,
    polygonIdField: "id"
  })
);

let circleTemplate = am5.Template.new({});

bubbleSeries.bullets.push(function(root, series, dataItem) {
  let container = am5.Container.new(root, {});

  let circle = container.children.push(
    am5.Circle.new(root, {
      radius: 20,
      fillOpacity: 0.7,
      fill: am5.color(0xff0000),
      cursorOverStyle: "pointer",
      tooltipText: `{name}: [bold]{value}[/]`
    })
  );

  let countryLabel = container.children.push(
    am5.Label.new(root, {
      text: "{name}",
      paddingLeft: 5,
      populateText: true,
      fontWeight: "bold",
      fontSize: 13,
      centerY: am5.p50
    })
  );

  // circle.on("radius", function(radius) {
  //   countryLabel.set("x", radius);
  // })

  return am5.Bullet.new(root, {
    sprite: container,
    dynamic: true
  });
});

bubbleSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{value.formatNumber('#.')}",
      fill: am5.color(0xffffff),
      populateText: true,
      centerX: am5.p50,
      centerY: am5.p50,
      textAlign: "center"
    }),
    dynamic: true
  });
});



// minValue and maxValue must be set for the animations to work
bubbleSeries.set("heatRules", [
  {
    target: circleTemplate,
    dataField: "value",
    min: 10,
    max: 50,
    minValue: 0,
    maxValue: 100,
    key: "radius"
  }
]);

bubbleSeries.data.setAll(data);

    })

        this.columnChart();

 
    
  //  this.startPieChart();
    
 //   this.startGraphChart();


  }


  columnChart() {
    this.ApiService.getStubbornChart().subscribe((d) => {
      let data2:any = d;
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("chartDiv5");


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      


      // Create wrapper container
      let container = root.container.children.push(am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      }));


      // Create series
      // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
      let series = container.children.push(am5hierarchy.Sunburst.new(root, {
        singleBranchOnly: true,
        downDepth: 10,
        initialDepth: 10,
        valueField: "value",
        categoryField: "name",
        childDataField: "children"
      }));


      // Generate and set data
      // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
      let maxLevels = 2;
      let maxNodes = 3;
      let maxValue = 100;

      console.log(data2, "nskns");
    
      series.data.setAll(data2);
      series.set("selectedDataItem", series.dataItems[0]);
      // Make stuff animate on load
      series.appear(1000, 100);

    });
  }

  
  


  
  startPieChart() {
/* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("chartDiv3");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
let chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270
  })
);

series.states.create("hidden", {
  endAngle: -90
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Lithuania",
  value: 501.9
}, {
  category: "Czechia",
  value: 301.9
}, {
  category: "Ireland",
  value: 201.1
}, {
  category: "Germany",
  value: 165.8
}, {
  category: "Australia",
  value: 139.9
}, {
  category: "Austria",
  value: 128.3
}, {
  category: "UK",
  value: 99
}]);

series.appear(1000, 100);

  }

 


   getPosting(t:string) {
    
     console.log(t);
  
     this.ApiService.getChartDetails(t).subscribe((s) => {
       this.chartData = s.data;
       this.arrayData = s.array;
       // Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("graphDiv2");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

      let data = s.data;


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xRenderer = am5xy.AxisRendererX.new(root, {});
let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "constituency",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xRenderer.grid.template.setAll({
  location: 1
})

xAxis.data.setAll(data);

let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1
  })
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name:any, fieldName:any) {
  let series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "constituency"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}",
    tooltipY: am5.percent(10)
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

       for(var i in this.arrayData ){
         makeSeries(this.arrayData[i],this.arrayData[i]);
       }


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
       console.log(this.chartData);
     }); 

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

  startGraphChart() {
     
/* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
let chart = root.container.children.push(am5percent.PieChart.new(root, {
  radius: am5.percent(90),
  innerRadius: am5.percent(50),
  layout: root.horizontalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
let series = chart.series.push(am5percent.PieSeries.new(root, {
  name: "Series",
  valueField: "sales",
  categoryField: "country"
}));

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  country: "Lithuania",
  sales: 501.9
}, {
  country: "Czechia",
  sales: 301.9
}, {
  country: "Ireland",
  sales: 201.1
}, {
  country: "Germany",
  sales: 165.8
}, {
  country: "Australia",
  sales: 139.9
}, {
  country: "Austria",
  sales: 128.3
}, {
  country: "UK",
  sales: 99
}, {
  country: "Belgium",
  sales: 60
}, {
  country: "The Netherlands",
  sales: 50
}]);

// Disabling labels and ticks
series.labels.template.set("visible", false);
series.ticks.template.set("visible", false);

// Adding gradients
series.slices.template.set("strokeOpacity", 0);
series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
  stops: [{
    brighten: -0.8
  }, {
    brighten: -0.8
  }, {
    brighten: -0.5
  }, {
    brighten: 0
  }, {
    brighten: -0.5
  }]
}));

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
let legend = chart.children.push(am5.Legend.new(root, {
  centerY: am5.percent(50),
  y: am5.percent(50),
  layout: root.verticalLayout
}));
// set value labels align to right
legend.valueLabels.template.setAll({ textAlign: "right" })
// set width and max width of labels
legend.labels.template.setAll({ 
  maxWidth: 140,
  width: 140,
  oversizedBehavior: "wrap"
});

legend.data.setAll(series.dataItems);


// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear(1000, 100);

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