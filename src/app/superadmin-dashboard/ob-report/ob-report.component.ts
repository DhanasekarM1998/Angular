import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'src/app/_service/api-service.service';

@Component({
  selector: 'app-ob-report',
  templateUrl: './ob-report.component.html',
  styleUrls: ['./ob-report.component.scss']
})
export class ObReportComponent implements OnInit {
  spinner: boolean;
  customers: any = [];
  dtOptions: any = {};
  tableshow: boolean = false;
  regob:any;
  dashboardcarddata: any;
  district_list: any[] = this.ApiService.all_districts;
  constructor(
              public ApiService: ApiServiceService,
              private spinnerService: NgxSpinnerService,
              private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
      this.getdata();
      this.showSpinner();
      this.dtOptions = {
        pagingType: 'full_numbers',
        order: [[0, 'asc']],
        dom: 'lBfrtip',
          buttons: [{
            extend: 'print',
            exportOptions: {stripHtml: false },
            customize: function ( win ) {

                $(win.document.body)
                    .css( 'font-size', '10pt' );

                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
            }
        }],
      };
      this.addPrintStyles();
    }

    private addPrintStyles() {
      const head = document.getElementsByTagName('body')[0];
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
        @media print {
          body * {
            visibility: visible;
          }
        }
      `;

      head.appendChild(style);
    }


    getdata() {
      this.spinner = true;
      this.ApiService.report_ob(this.district_list[0]).subscribe((data) => {
        for (const prop in data) {
          for(const ob in data[prop]){

            let objectURL = 'data:image/jpeg;base64,' +  data[prop][ob].image_data;
            //console.log(objectURL)
            data[prop][ob]["image_encode"] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          this.customers.push(data[prop]);
        }

        this.tableshow = true;
        this.spinner = false;
      });
    }
    public showSpinner(): void {
      //this.spinner = true;
      this.spinnerService.show();
    }

    DistrictChange(event: any) {
      this.customers = [];
      const selectedValue = event.target.value;
      console.log(selectedValue )
      this.ApiService.report_ob(selectedValue).subscribe((data) => {
        for (const prop in data) {
          for(const ob in data[prop]){

            let objectURL = 'data:image/jpeg;base64,' +  data[prop][ob].image_data;
            //console.log(objectURL)
            data[prop][ob]["image_encode"] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          this.customers.push(data[prop]);
        }

        this.tableshow = true;
      });
    }
    }