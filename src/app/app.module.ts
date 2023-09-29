import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { StateadminComponent } from './superadmin-dashboard/stateadmin/stateadmin.component';
import { DistrictadminComponent } from './superadmin-dashboard/districtadmin/districtadmin.component';
import { AppOrRejComponent } from './superadmin-dashboard/app-or-rej/app-or-rej.component';
import { MeetingsComponent } from './superadmin-dashboard/meetings/meetings.component';
import { ReportsComponent } from './superadmin-dashboard/reports/reports.component';
import { SignOutComponent } from './superadmin-dashboard/sign-out/sign-out.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './superadmin-dashboard/dashboard/dashboard.component';
import { StateadminMenuComponent } from './stateadmin-menu/stateadmin-menu.component';
import { DistrictadminMenuComponent } from './districtadmin-menu/districtadmin-menu.component';
import { DaDashboardComponent } from './districtadmin-menu/da-dashboard/da-dashboard.component';
import { AppointDistrictOffBearerComponent } from './districtadmin-menu/appoint-district-off-bearer/appoint-district-off-bearer.component';
import { ReqOffBearerChangeComponent } from './districtadmin-menu/req-off-bearer-change/req-off-bearer-change.component';
import { SelfRegistrationComponent } from './self-registration/self-registration.component';
import { CreateOffBearerComponent } from './districtadmin-menu/create-off-bearer/create-off-bearer.component';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OfficeBearerApprovalComponent } from './superadmin-dashboard/office-bearer-approval/office-bearer-approval.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import {CreateMeetingsComponent} from 'src/app/stateadmin-menu/create-meetings/create-meetings.component';
import { ChangePasswordComponent } from './change-password/change-password.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { DaMeetingComponent } from './districtadmin-menu/da-meeting/da-meeting.component';
import { SADashboardComponent } from './stateadmin-menu/sa-dashboard/sa-dashboard.component';
import { AddtionalPostReqApprovalComponent } from './superadmin-dashboard/addtional-post-req-approval/addtional-post-req-approval.component';
import { MenuChangePasswordComponent } from './menu-change-password/menu-change-password.component';
import { DaReportComponent } from './superadmin-dashboard/da-report/da-report.component';
import { ObLoginComponent } from './ob-login/ob-login.component';
import { ObReportComponent } from './superadmin-dashboard/ob-report/ob-report.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ActivityComponent } from './superadmin-dashboard/activity/activity.component';




@NgModule({
  declarations: [
    AppComponent,
    SuperadminDashboardComponent,
    StateadminComponent,
    DistrictadminComponent,
    AppOrRejComponent,
    MeetingsComponent,
    ReportsComponent,
    SignOutComponent,
    LoginComponent,
    DashboardComponent,
    StateadminMenuComponent,
    DistrictadminMenuComponent,
    DaDashboardComponent,
    AppointDistrictOffBearerComponent,
    ReqOffBearerChangeComponent,
    SelfRegistrationComponent,
    CreateOffBearerComponent,
    ForgotPasswordComponent,
    OfficeBearerApprovalComponent,
    CreateMeetingsComponent,
    AppointDistrictOffBearerComponent,
    ChangePasswordComponent,
    MeetingsComponent,
    CreateMeetingsComponent,
    DaMeetingComponent,
    SADashboardComponent,
    AddtionalPostReqApprovalComponent,
    MenuChangePasswordComponent,
    DaReportComponent,
    ObLoginComponent,
    ObReportComponent,
    ProfileDetailsComponent,
    PieChartComponent,
    ActivityComponent,
  
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule, 
    HttpClientModule,DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),BrowserAnimationsModule,NgxSpinnerModule
  ],
  
  
  // providers: [],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
