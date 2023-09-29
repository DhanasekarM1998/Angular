import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppointDistrictOffBearerComponent } from './districtadmin-menu/appoint-district-off-bearer/appoint-district-off-bearer.component';
import { CreateOffBearerComponent } from './districtadmin-menu/create-off-bearer/create-off-bearer.component';
import { DaDashboardComponent } from './districtadmin-menu/da-dashboard/da-dashboard.component';
import { DaMeetingComponent } from './districtadmin-menu/da-meeting/da-meeting.component';
import { DistrictadminMenuComponent } from './districtadmin-menu/districtadmin-menu.component';
import { DistrictwiseEngReportComponent } from './districtadmin-menu/districtwise-eng-report/districtwise-eng-report.component';
import { ReqOffBearerChangeComponent } from './districtadmin-menu/req-off-bearer-change/req-off-bearer-change.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SelfRegistrationComponent } from './self-registration/self-registration.component';
import { CreateMeetingsComponent } from './stateadmin-menu/create-meetings/create-meetings.component';
import { ReportAllDistrictComponent } from './stateadmin-menu/report-all-district/report-all-district.component';
import { SADashboardComponent } from './stateadmin-menu/sa-dashboard/sa-dashboard.component';
import { SentMeetingsNotifyComponent } from './stateadmin-menu/sent-meetings-notify/sent-meetings-notify.component';
import { StateadminMenuComponent } from './stateadmin-menu/stateadmin-menu.component';
import { AddtionalPostReqApprovalComponent } from './superadmin-dashboard/addtional-post-req-approval/addtional-post-req-approval.component';
import { AppOrRejComponent } from './superadmin-dashboard/app-or-rej/app-or-rej.component';
import { DashboardComponent } from './superadmin-dashboard/dashboard/dashboard.component';
import { DistrictadminComponent } from './superadmin-dashboard/districtadmin/districtadmin.component';
import { MeetingsComponent } from './superadmin-dashboard/meetings/meetings.component';
import { OfficeBearerApprovalComponent } from './superadmin-dashboard/office-bearer-approval/office-bearer-approval.component';
import { ReportsComponent } from './superadmin-dashboard/reports/reports.component';
import { ActivityComponent } from './superadmin-dashboard/activity/activity.component';
import { SignOutComponent } from './superadmin-dashboard/sign-out/sign-out.component';
import { StateadminComponent } from './superadmin-dashboard/stateadmin/stateadmin.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { MenuChangePasswordComponent } from './menu-change-password/menu-change-password.component';
import { DaReportComponent } from './superadmin-dashboard/da-report/da-report.component';
import { ObLoginComponent } from './ob-login/ob-login.component';
import { ObReportComponent } from './superadmin-dashboard/ob-report/ob-report.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [
  // {path:"", component: LoginComponent, pathMatch: 'full'},
  {path:"change-password/:email/:token", component: ChangePasswordComponent},
  {path:"change-password/:email", component: ChangePasswordComponent},
  {path:"superadmin",  canActivate: [AuthenticationGuard],component: SuperadminDashboardComponent,
        children: [
          { path: '',  component: DashboardComponent},
          { path: 'Dashboard',canActivate: [AuthenticationGuard],  component: DashboardComponent},
          { path: 'Districtadmin', canActivate: [AuthenticationGuard], component: DistrictadminComponent},
          { path:"Stateadmin", canActivate: [AuthenticationGuard], component: StateadminComponent},
          { path:"Approve-Reject", canActivate: [AuthenticationGuard], component: AppOrRejComponent},
          { path:"Meetings", canActivate: [AuthenticationGuard], component: MeetingsComponent},
          { path:"Reports",canActivate: [AuthenticationGuard],  component: ReportsComponent},
          { path:"office-bearer-approval",canActivate: [AuthenticationGuard],  component: OfficeBearerApprovalComponent},
          { path:"da-report", canActivate: [AuthenticationGuard], component: DaReportComponent},
          { path:"menu-change-password",canActivate: [AuthenticationGuard],  component: MenuChangePasswordComponent},
          { path:"ob-report", canActivate:[AuthenticationGuard], component: ObReportComponent},
          { path:"activity", canActivate:[AuthenticationGuard], component: ActivityComponent},
          // { path:"profile", canActivate:[AuthenticationGuard], component: ProfileDetailsComponent }
          // { path:"Addtional-post-approval",canActivate: [AuthenticationGuard],  component: AddtionalPostReqApprovalComponent},
          ],},
  {path:"stateadmin", canActivate: [AuthenticationGuard],component: StateadminMenuComponent,
          children: [
            { path: '', canActivate: [AuthenticationGuard], component: SADashboardComponent},
            { path: 'Dashboard',canActivate: [AuthenticationGuard],  component: SADashboardComponent},
            { path: 'create-meetings', canActivate: [AuthenticationGuard], component: CreateMeetingsComponent },
            { path: 'sent-meetings-notification',canActivate: [AuthenticationGuard],  component: SentMeetingsNotifyComponent},
            { path: 'report-of-all-districts',canActivate: [AuthenticationGuard],  component: ReportAllDistrictComponent},
            { path:"menu-change-password",canActivate: [AuthenticationGuard],  component: MenuChangePasswordComponent},
            // { path:"profile", canActivate:[AuthenticationGuard], component: ProfileDetailsComponent }
            ],},

  {path:"districtadmin",canActivate: [AuthenticationGuard], component: DistrictadminMenuComponent ,
            children: [
              { path: '', canActivate: [AuthenticationGuard], component: DaDashboardComponent},
              { path: 'Dashboard',canActivate: [AuthenticationGuard],  component: DaDashboardComponent},
              { path: 'create-office-bearers',canActivate: [AuthenticationGuard],  component: CreateOffBearerComponent},
              { path: 'appoint-district-office-bearers', canActivate: [AuthenticationGuard], component: AppointDistrictOffBearerComponent},
              { path: 'request-office-bearers-change', canActivate: [AuthenticationGuard], component: ReqOffBearerChangeComponent},
              { path: 'meetings',canActivate: [AuthenticationGuard],  component: DaMeetingComponent},
              { path:"menu-change-password",canActivate: [AuthenticationGuard],  component: MenuChangePasswordComponent},
              { path:"profile", canActivate:[AuthenticationGuard], component: ProfileDetailsComponent }
              ],},

  {path:"OB",canActivate: [AuthenticationGuard], component: ObLoginComponent ,
            children: [
              { path: '', canActivate: [AuthenticationGuard], component: DaDashboardComponent},
              { path: 'Dashboard',canActivate: [AuthenticationGuard],  component: DaDashboardComponent},
              { path: 'create-office-bearers',canActivate: [AuthenticationGuard],  component: CreateOffBearerComponent},
              { path: 'appoint-district-office-bearers', canActivate: [AuthenticationGuard], component: AppointDistrictOffBearerComponent},
              // { path: 'request-office-bearers-change', canActivate: [AuthenticationGuard], component: ReqOffBearerChangeComponent},
              { path: 'meetings',canActivate: [AuthenticationGuard],  component: DaMeetingComponent},
             { path:"menu-change-password",canActivate: [AuthenticationGuard],  component: MenuChangePasswordComponent},
             { path:"profile", canActivate:[AuthenticationGuard], component: ProfileDetailsComponent }
              ],},
              
  {path:"forgot_password", component: ForgotPasswordComponent},
  {path:"self-registration", component: SelfRegistrationComponent},
  {path:"**",redirectTo:'', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
