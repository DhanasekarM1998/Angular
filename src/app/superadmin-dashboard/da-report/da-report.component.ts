import { Component, OnInit,ElementRef, Renderer2, inject } from '@angular/core';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-da-report',
  templateUrl: './da-report.component.html',
  styleUrls: ['./da-report.component.scss']
})
export class DaReportComponent implements OnInit {
  private document = inject(DOCUMENT)
  spinner: boolean;
  customers: any = [];
  dtOptions: any = {};
  tableshow: boolean = false;
  regob:any;
  dashboardcarddata: any;
constructor( private el: ElementRef,
  private renderer: Renderer2,
            public ApiService: ApiServiceService,
            private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getdata();
    this.showSpinner();
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[3, 'asc']],
      dom: 'lBfrtip',
        buttons: ['print'],
    };
    this.addPrintStyles();
    this.applyStylesToDOMElement();
  }
  
  applyStylesToDOMElement() {

    const appObReportButton = this.document.getElementsByTagName('app-da-report')[0].getElementsByTagName('button');
    var a=appObReportButton
    // console.log(this.document.getElementsByClassName());
    // if (appObReportButton) {
    //   this.renderer.setStyle(appObReportButton.parentElement, 'position', 'absolute');
    //   this.renderer.setStyle(appObReportButton.parentElement, 'right', '0px');
    //   this.renderer.setStyle(appObReportButton.parentElement, 'top', '0px');
    // }
  }
  getdata() {
    this.spinner = true;
    this.ApiService.report_da().subscribe((data) => {
      for (const prop in data) {
        this.customers.push(data[prop]);
      }
      console.log(data)
      this.tableshow = true;
      this.spinner = false;
    });
  }
  public showSpinner(): void {
    // this.spinner = true;
    this.spinnerService.show();
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
}