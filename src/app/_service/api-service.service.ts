import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
// import { AnyARecord } from 'dns';
// import { Password } from 'primeng/password';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  redirectUrl!: string;
    //  baseUrl:string;
                  //  baseUrl:string = "https://redmindtechnologies.com/dmk_dev/";
                    baseUrl:string="http://localhost/DMK/";
              //baseUrl:string="http://localhost/ftp/ftp/";
              //baseUrl:string = "https://app.dmkengwing.in/dmk/";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  valueChanges: any;
  district: any;
constructor(private httpClient : HttpClient) {
    //  this.baseUrl=document.getElementsByTagName('base')[0].href+'dmk/';
    // console.log(this.baseUrl);
 };


user_district:any='null';

public mydist = [
    {
        name:'Select District',
        value:''
    },
    {
      name: "Namakkal",
      value:'Namakkal'
    },
    {
      name: "Salem",
      value:"Salem"
    },
    {
      name: "Trichy",
      value:"Trichy",
    },
    {
      name: "Erode",
      value:"Erode"
    },
];
  
  public user_details: any = JSON.parse(localStorage.getItem('login_user_details'));

public constituencies=[
  { name:'Select constituencies/தொகுதியைத் தேர்ந்தெடுக்கவும்'},{ name:'Salem (West)'}, { name:'Salem (North)'}, { name:'Salem (South)'}, { name:'Veerapandi'}, { name:'Rasipuram'},
  { name:'Senthamangalam'}, { name:'Attur'}, { name:'Yercaud'}, { name:'Namakkal'}, { name:'Rasipuram'},
  { name:'Erode (East)'}, { name:'Erode (West)'},

]
public districts=[
  { name:'Salem (West)'}, { name:'Salem (North)'}, { name:'Salem (South)'}, { name:'Veerapandi'}, { name:'Rasipuram'},
  { name:'Senthamangalam'}, { name:'Attur'}, { name:'Yercaud'}, { name:'Namakkal'}, { name:'Rasipuram'},
  { name:'Erode (East)'}, { name:'Erode (West)'},

]
// public all_districts=['Select District','ARIYALUR','CHENGALPATTU','CHENNAI','COIMBATORE','CUDDALORE','DHARMAPURI','DINDIGUL','ERODE','KALLAKURICHI',
// 'KANCHEEPURAM','KANNIYAKUMARI','KARUR', 'KRISHNAGIRI', 'MADURAI', 'NAGAPATTINAM','NAMAKKAL','PERAMBALUR','PUDUKKOTTAI',
// 'RAMANATHAPURAM','RANIPET','SALEM','SIVAGANGA','TENKASI','THANJAVUR','THE NILGIRIS','THENI','THIRUVALLUR','THIRUVARUR','THOOTHUKUDI',
// 'TIRUCHIRAPPALLI','TIRUNELVELI','TIRUPATHUR','TIRUPPUR','TIRUVANNAMALAI','VELLORE','VILLUPPURAM','VIRUDHUNAGAR'];
public all_districts=['Chennai North', 'Chennai North East', 'Chennai East', 'Chennai West', 'Chennai South West', 'Chennai South',
'Thiruvallur East', 'Thiruvallur Central', 'Thiruvallur West', 'Kanchipuram North', 'Kanchipuram South', 'Ranipet', 'Vellore',
'Tirupattur', 'Tiruvannamalai North', 'Tiruvannamalai South', 'Villupuram North', 'Villupuram South', 'Kallakurichi North', 'Kallakurichi South',
'Cuddalore East', 'Cuddalore West', 'Thanjavur North', 'Thanjavur Central', 'Thanjavur South', 'Mayiladuthurai', 'Nagai', 'Tiruvarur',
'Trichy North', 'Trichy Central', 'Trichy South', 'Perambalur', 'Ariyalur', 'Karur', 'Pudukottai North', 'Pudukottai South', 'Salem East',
'Salem West', 'Salem Central', 'Namakkal East', 'Namakkal West', 'Dharmapuri East', 'Dharmapuri West', 'Krishnagiri East', 'Krishnagiri West', 'Coimbatore North',
'Coimbatore South','Coimbatore','Tirupur North','Tirupur South','Erode North','Erode South','Nilgiri','Madurai North','Madurai South','Madurai','Dindigul East',
'Dindigul West','Theni North','Theni South',
'Ramanathapuram', 'Sivagangai', 'Virudhunagar North', 'Virudhunagar South', 'Tirunelveli East', 'Tirunelveli Central','Tenkasi North',
'Tenkasi South','Thoothukudi North','Thoothukudi South','Kanniyakumari East','Kanniyakumari West'];
public all_municipals=['Avadi City', 'Tambaram city', 'Kanchipuram city', 'Vellore city', 'Cuddalore city', 'Kumbakonam city',
'Thanjavur City', 'Trichy East City', 'Trichy West City', 'Karur city', 'Salem city', 'Hosur city', 'Tirupur North City',
'Tirupur south City', 'Erode city', 'Dindigul City', 'Sivakasi City', 'Thoothukudi city', 'Tirunelveli City', 'Nagercoil City'];

public meeting_districts=['Chennai North', 'Chennai North East', 'Chennai East', 'Chennai West', 'Chennai South West', 'Chennai South',
'Thiruvallur East', 'Thiruvallur Central', 'Thiruvallur West', 'Kanchipuram North', 'Kanchipuram South', 'Ranipet', 'Vellore',
'Tirupattur', 'Tiruvannamalai North', 'Tiruvannamalai South', 'Villupuram North', 'Villupuram South', 'Kallakurichi North', 'Kallakurichi South',
'Cuddalore East', 'Cuddalore West', 'Thanjavur North', 'Thanjavur Central', 'Thanjavur South', 'Mayiladuthurai', 'Nagai', 'Tiruvarur',
'Trichy North', 'Trichy Central', 'Trichy South', 'Perambalur', 'Ariyalur', 'Karur', 'Pudukottai North', 'Pudukottai South', 'Salem East',
'Salem West', 'Salem Central', 'Namakkal East', 'Namakkal West', 'Dharmapuri East', 'Dharmapuri West', 'Krishnagiri East', 'Krishnagiri West', 'Coimbatore North',
'Coimbatore South','Coimbatore','Tirupur North','Tirupur South','Erode North','Erode South','Nilgiri','Madurai North','Madurai South','Madurai','Dindigul East',
'Dindigul West','Theni North','Theni South',
'Ramanathapuram', 'Sivagangai', 'Virudhunagar North', 'Virudhunagar South', 'Tirunelveli East', 'Tirunelveli Central','Tenkasi North',
'Tenkasi South','Thoothukudi North','Thoothukudi South','Kanniyakumari East','Kanniyakumari West'];

public all_constituency={ 'Chennai North': ['Dr. Radhakrishnan Nagar', 'Perambur', 'Royapuram'],
'Chennai North East': ['Madhavaram', 'Tiruvottiyur'],
'Chennai East': ['Ambattur', 'Kolathur', 'Villivakam', 'Thiru.Vi.Ka Nagar (R)', 'Egmore (R)', 'Harbour'],
'Chennai West': ['Chepauk-Thiruvallikeni', 'Thousand Lights', 'Anna Nagar'],
'Chennai South West': ['Thiyagarayanagar', 'Mylapore'],
'Chennai South': ['Maduravoyal', 'Virugambakkam', 'Saidapet', 'Velachery', 'Sholinganallur'],
'Thiruvallur East': ['Gummidipoondi', 'Ponneri (R)'],
'Thiruvallur Central': ['Poonamallee (R)', 'Avadi'],
'Thiruvallur West': ['Tiruttani', 'Thiruvallur'],
'Kanchipuram North': ['Alandur', 'Sriperumbudur (R)', 'Pallavaram', 'Tambaram', 'Chengalpattu', 'Thiruporur'],
'Kanchipuram South': ['cheyyur (R)', 'Maduranthakam (R)', 'Uthiramerur', 'Kanchipuram'],
'Ranipet': ['Arakkonam (R)', 'Sholingur', 'Ranipet', 'Arcot'],
'Vellore': ['Katpadi', 'Vellore', 'Anaikattu', 'Kilvaithinankuppam (R)', 'Gudiyatham (R)'],
'Tirupattur': ['Vaniyambadi', 'Ambur', 'Jolarpettai', 'Tirupattur'],
'Tiruvannamalai North': ['Polur', 'Arani', 'Cheyyar', 'Vandavasi (R)'],
'Tiruvannamalai South': ['Chengam (R)', 'Thiruvannamalai', 'Kilpennathur', 'Kalasapakkam'],
'Villupuram North': ['Gingee', 'Mayilam', 'Tindivanam (R)'],
'Villupuram South': ['Vanur (R)', 'Villupuram', 'Vikravandi', 'Thirukoilur'],
'Kallakurichi North': ['Ulundurpet', 'Shankarapuram'],
'Kallakurichi South': ['Rishivandiyam', 'Kallakurichi (R)'],
'Cuddalore East': ['Cuddalore', 'Kurinjipadi', 'Bhuvanagiri', 'Chidambaram', 'Kattumannarkoil (R)'],
'Cuddalore West': ['Tittakudi (R)', 'Virudhachalam', 'Neyveli', 'Panruti'],
'Thanjavur North': ['Thiruvidaimarudur (R)', 'Kumbakonam', 'Papanasam'],
'Thanjavur Central': ['Thiruvaiyaru', 'Thanjavur', 'Orathanadu'],
'Thanjavur South': ['Pattukkottai', 'Peravurani'],
'Mayiladuthurai': ['Sirkazhi (R)', 'Mayiladuthurai', 'Poompuhar'],
'Nagai': ['Nagapattinam', 'Kilvelur (R)', 'Vedaranyam'],
'Tiruvarur': ['Thiruthuraipoondi (R)', 'Mannargudi', 'Thiruvarur', 'Nannilam'],
'Trichy North': ['Manchanallur', 'Musiri', 'Thuraiyur (R)'],
'Trichy Central': ['Thiruvarangam', 'Tiruchirappalli West', 'Lalgudi'],
'Trichy South': ['Manapparai', 'Tiruchirappalli East', 'Thiruverumbur'],
'Perambalur': ['Perambalur (R)', 'Kunnam'],
'Ariyalur': ['Ariyalur', 'Jayankondam'],
'Karur': ['Aravakurichi', 'Karur', 'Krishnarayapuram (R)', 'Kulithalai'],
'Pudukottai North': ['Gandarvakottai (R)', 'Viralimalai', 'Pudukottai'],
'Pudukottai South': ['Thirumayam', 'Alangudi', 'Aranthangi'],
'Salem East': ['Gangavalli (R)', 'Attur', 'Yercaud (Tribe)', 'Veerapandi'],
'Salem West': ['Mettur', 'Edappadi', 'Sankagiri'],
'Salem Central': ['Omalur', 'Salem West', 'Salem North', 'Salem South'],
'Namakkal East': ['Rasipuram (R)', 'Senthamangalam (Tribe)', 'Namakkal'],
'Namakkal West': ['Paramathi-Velur', 'Tiruchengode', 'Kumarapalayam'],
'Dharmapuri East': ['Dharmapuri', 'Pennagaram'],
'Dharmapuri West': ['Palacode', 'Pappireddipatti', 'Harur (R)'],
'Krishnagiri East': ['Uthangarai (R)', 'Bargur', 'Krishnagiri'],
'Krishnagiri West': ['Veppanahalli', 'Hosur', 'Thalli'],
'Coimbatore North': ['Mettupalayam', 'Thondamuthur', 'Kavundampalayam', 'Avinashi (R)'],
'Coimbatore South':['Sulur','Kinathukadavu','Pollachi','Valparai (R)'],
'Coimbatore': ['Coimbatore North', 'Coimbatore South', 'Singanallur'],
 'Tirupur North': ['Tirupur North', 'Tirupur South','Palladam'],
  'Tirupur South': ['Dharapuram (R)', 'Kangayam', 'Udumalaipettai','Madathukulam'],
 'Erode North': ['Bhavani', 'Anthiyur', 'Gobichettipalayam','Bhavani Sagar (R)'],
 'Erode South': ['Erode East', 'Erode West','Modakkurichi','Perundurai'],
 'Nilgiri':['Udhagamandalam','gudalur (R)','Coonoor'],
  'Madurai North': ['Melur', 'Madurai East', 'Sholavandan (R)'],
  'Madurai South': ['Tirumangalam', 'Thiruparankundram','Usilampatti'],
  'Madurai': ['Madurai North','Madurai South','Madurai Central','Madurai West'], 
'Dindigul East': ['Palani', 'Athoor','Nilakkottai (R)','Dindigul'],
  'Dindigul West': ['Oddanchatram', 'Natham','Vedasandur'],
'Theni North': ['Periyakulam (R)', 'Bodinayakanur'],
 'Theni South': ['Andipatti','Cumbum'],
'Ramanathapuram': ['Paramakudi (R)', ' Tiruvadanai', 'Ramanathapuram', 'Mudukulathur'],
'Sivagangai': ['Karaikudi', 'Tiruppattur', 'Sivagangai', 'Manamadurai (R)'],
'Virudhunagar North': ['Sivakasi', 'Virudhunagar', 'Tiruchuli'],
'Virudhunagar South': ['Rajapalayam', 'Srivilliputhur (R)', 'Sattur', 'Aruppukkottai'],
'Tirunelveli East': ['Ambasamudram', 'Nanguneri', 'Radhapuram'],
'Tirunelveli Central': ['Tirunelveli', 'Palayamkottai'],
'Tenkasi North':['Vasudevanallur (R)','Sankaran Kovil (R)'],
'Tenkasi South': ['Kadayanallur', 'Tenkasi', 'Alangulam'],
'Thoothukudi North': ['Vilathikulam', 'Thoothukkudi','Kovilpatti'],
 'Thoothukudi South': ['Tiruchendur', 'Srivaikuntam', 'Ottapidaram (R)'],
 'Kanniyakumari East': ['Kanniyakumari', 'Nagercoil', 'Colachel'],
 'Kanniyakumari West': ['Padmanabhapuram', 'Vilavancode ','Killiyoor'],

};
public all_designation=['Select designation ','District President / மாவட்ட தலைவர்','District Vice President / மாவட்ட துணை தலைவர்','District Organiser / மாவட்ட அமைப்பாளர்','District Deputy Organiser / மாவட்ட துணை அமைப்பாளர்','Union Organiser / ஒன்றிய அமைப்பாளர்','Union Deputy Organiser / ஒன்றிய துணை அமைப்பாளர்','City Organiser / நகர அமைப்பாளர்','City Deputy Organiser / நகர துணை அமைப்பாளர்','Area Organiser / பகுதி அமைப்பாளர்','Area Deputy Organiser / பகுதி துணை அமைப்பாளர்','illage Organiser / ஊரக அமைப்பாளர்','Village Deputy Organiser / ஊரக துணை அமைப்பாளர்'];

public catagory=['மாவட்டம்','மாநகரம்','ஒன்றியம்','நகரம்','பகுதி','பேரூர்'];


public constituency:any='No-Select';
checktoken:any[]=[]
public check_token(email:string) {
          return this.httpClient.get(this.baseUrl+"/check_token.php?email="+email);
                       }

userlogincheck:any[]=[];
public logincheck() {
  return this.httpClient.get(this.baseUrl +'/loginusercheck.php');
}
public locked(whatsapp_no:any) {
  // console.log("api");
  //  console.log(whatsapp_no);
  // dadistrict=this.district;

  return this.httpClient.post(this.baseUrl +'/lock.php',{whatsapp_no})
  .pipe(map(Users => {
    return Users;
    }));
}
  
  public getGlobalChart() {
    return this.httpClient.get(this.baseUrl + '/get_ob_data.php');
  }
  
   public getGlobalEnigneer() {
    return this.httpClient.get(this.baseUrl + '/get_engineer_details.php');
   }
  
    public getStubbornChart() {
    return this.httpClient.get(this.baseUrl + '/get_stubborn_chart.php');
    }
   
    public getDonutChart() {
    return this.httpClient.get(this.baseUrl + '/get_donutchart.php');
   }
  
    public getGlobalEnigneer1() {
    return this.httpClient.get(this.baseUrl + '/get_engineer_details.php');
    }
    public getGlobalEnigneer2() {
    return this.httpClient.get(this.baseUrl + '/get_engineer_details.php');
}

  
  public create_activity(anyform: any)  {
   return  this.httpClient.post(this.baseUrl + '/create_activity.php', anyform);
  
}
table_report_da:any[] = [];
public report_da(){
  return this.httpClient.get(this.baseUrl + '/da-report.php?mode=1');
}
public userlogin(username : any, password :any) {

  return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
  .pipe(map(Users => {
    console.log(Users);
    this.user_district= Users[0].district;
    localStorage.setItem('user_district', JSON.stringify(Users[0].district));
    localStorage.setItem('login_user_details', JSON.stringify(Users[0]));
    this.user_details = Users[0];
    // this.districtname=JSON.parse(localStorage.getItem('user_district'));
    console.log(this.user_district)
    this.district=this.user_district;

  this.setToken(Users[0].name);
  this.getLoggedInName.emit(true);
  //only authorized user to login
  if(Users!=''){
    //console.log(window.localStorage.getItem('UserToken'));
    sessionStorage.setItem('validUserToken', 'true');
  }
  return Users;
  //console.log(Users);
  }));
  }

// public userregistration(email : any,firstname:any,lastname:any,father_name:any,district:any,contact_no:any,date_of_birth:any,educational_qualification:any,profession:any,location_id:any,age:any,address1:any,flat_no:any,town_city:any,taluk:any,pincode:any,self_profession:any,other_qualification:any,degree_major:any) {
//   const httpOptions : Object = {
//     headers: new HttpHeaders({
//       'Content-Type':'application/x-www-form-urlencoded'
//     })
//   };
// console.log(location_id);
// return this.httpClient.post<any>(this.baseUrl + '/register.php', { email,firstname,lastname,father_name,district,contact_no,date_of_birth,educational_qualification,profession,location_id,age,address1,flat_no,town_city,taluk,pincode,self_profession,other_qualification,degree_major
// })
// .pipe(map(Users => {
// return Users;
// }));
// }

public userregistration(datafull:FormData) {
  // console.log(datafull);
  datafull.forEach((value,key) => {

    console.log(key+" "+value)

  });
  const params = new HttpParams();

        const options = {
            params,
            reportProgress: true,
        };

        // const req = new HttpRequest('POST', this.baseUrl + '/register.php', datafull, options);
        // return this.httpClient.request(req)

//   let headers = new Headers();
// headers.append('Content-Type', 'multipart/form-data;boundary='+Math.random());
// headers.append('Accept', 'application/json');

return this.httpClient.post(this.baseUrl + '/register.php',datafull,options)
// })
// .map(res => res.json()),
//   .catch(error => Observable.throw(error))
//   .subscribe(
//     data => {
//       this.attachments.push(data);
//       this.attachmentSubject$.next(data);
//     },
//     error => {
//       alert("failed to upload");
//     }
//   )

}
public create_state_admin(mode:any,email:any,firstname:any,lastname:any,whatsapp_no:any,party_designation:any,approval_status:any,location_id:any,contact_no:any) {
  const httpOptions : Object = {
          headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
          })
        };
  return this.httpClient.post<any>(this.baseUrl + '/create.php?category=SA', { mode,email,firstname,lastname,whatsapp_no,party_designation,approval_status,location_id,contact_no },httpOptions )
  .pipe(map(Users => {
  return Users;
  }))
  }

    public create_dist_admin(mode:any,whatsapp_no:any,email:any,firstname:any,lastname:any,district:any,party_designation:any,approval_status:any,location_id:any,contact_no:any,fb_id:any,twitter_id:any) {
      const httpOptions : Object = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      };
      return this.httpClient.post<any>(this.baseUrl + '/create.php?category=DA', {mode, whatsapp_no,email,firstname,lastname,district,party_designation,approval_status,location_id,contact_no,fb_id,twitter_id },httpOptions )
        .pipe(map(Users => {
        return Users;
        }));
        }

          public create_office_bearers(datafull:FormData) {
            const httpOptions : Object = {
              headers: new HttpHeaders({
                'Content-Type':'application/x-www-form-urlencoded'
              })
            };

          const params = new HttpParams();

          const options = {
                params,
                reportProgress: true,
            };

            datafull.forEach((value,key) => {
              console.log(key+" "+value)
              });

            return this.httpClient.post<any>(this.baseUrl + '/create.php?category=OB',datafull,options)
            .pipe(map(Users => {
            return Users;
            }));
            }

            // public delete_admin(user_id:any) {
            //     return this.httpClient.post<any>(this.baseUrl + '/delete.php', { user_id})
            //     .pipe(map(Users => {
            //     return Users;
            //     }));
            //     }
            public delete_admin(user_id:any) {
              const httpOptions : Object = {
                headers: new HttpHeaders({
                  'Content-Type':'application/x-www-form-urlencoded'
                })
              };
                return this.httpClient.post<any>(this.baseUrl + '/delete.php', { user_id},httpOptions)
                .pipe(map(Users => {
                return Users;
                }));
                }

  public getChartDetails(name: any) {
    const url = this.baseUrl + '/get_chart_details.php';
      const httpOptions : Object = {
                headers: new HttpHeaders({
                  'Content-Type':'application/json'
                })
              };
              return this.httpClient.post<any>(url, { district: name }, httpOptions);
                }

tabledata:any[]=[]
public viewtableSA() {
          //  this.httpClient.get<any>(this.baseUrl+'/show.php?mode=0')
          //     .pipe(map((res)=>{
          //         const users =[];
          //         for(const key in res){
          //             if(res.hasOwnProperty(key)){
          //                 users.push({...res[key],id:key})}
          //         } return users;
          //     })).subscribe((users:any[])=>{
          //         console.log(users);
          //         this.tabledata=users[0];
          //         return this.tabledata;
          //         console.log(this.tabledata);
          //         })}
          //         public viewtableSA1():Observable<any> {
          //          return this.httpClient.get<any>(this.baseUrl+'/show.php?mode=0')
          return this.httpClient.get(this.baseUrl+'/show.php?mode=0');
                       }

tabledataDA:any[]=[];
public viewtableDA() {
          //  this.httpClient.get<any>(this.baseUrl + '/show.php?mode=1')
          //     .pipe(map((res)=>{

          //         const users =[];
          //         for(const key in res){
          //             if(res.hasOwnProperty(key)){
          //                 users.push({...res[key],id:key})}
          //         } return users;
          //     })).subscribe((users:any[])=>{

          //         this.tabledataDA=users[0];
          //         })
          return this.httpClient.get(this.baseUrl + '/show.php?mode=1');


    }


                  tabledataOB:any[]=[];
                      public viewtableOB() {
                      // this.httpClient.get<any>(this.baseUrl +'/show.php?mode=2')
                      //                   .pipe(map((res)=>{
                      //                             const users =[];
                      //                             for(const key in res){
                      //                                 if(res.hasOwnProperty(key)){
                      //                                     users.push({...res[key],id:key})}
                      //                             } return users;
                      //                         })).subscribe((users:any[])=>{
                      //                             //console.log(users)
                      //                             this.tabledataOB=users[0];
                      //                             })
                      return this.httpClient.get(this.baseUrl +'/show.php?mode=2');
                    }

               tabledataOBapprove:any[]=[];
                public viewtableOBapprove() {

                // this.httpClient.get<any>(this.baseUrl +'/rolechange_approvel_show.php')
                // .pipe(map((res)=>{
                //   const users =[];
                //   for(const key in res){
                //   if(res.hasOwnProperty(key)){
                //     users.push({...res[key],id:key})}
                //    } return users;
                //    })).subscribe((users:any[])=>{
                //     console.log(users);
                //    this.tabledataOBapprove=users[0];
                //     })
                return this.httpClient.get(this.baseUrl +'/rolechange_approvel_show.php');
            }
            email_checking:any[]=[];
            public email_check() {
            return this.httpClient.get(this.baseUrl +'/email.php');
        }
        email_phone:any[]=[];
        public ph_check() {
        return this.httpClient.get(this.baseUrl +'/phone.php');
    }



            piechartdatasa:any[]=[];
            public piedatasa() {
              return this.httpClient.get(this.baseUrl +'/dashboardsapie.php');
            }
            cardsa:any[]=[];
            public carddatasa() {
              return this.httpClient.get(this.baseUrl +'/dashboardsacard.php');
            }

            barchartdatasa:any[]=[];
            public chartdatasa() {
              return this.httpClient.get(this.baseUrl +'/dashboardsabar.php');
            }
            tableda:any[]=[];
            public datablelogin(dadistrict:any) {
              // console.log(this.district);
              // dadistrict=this.district;
              
              return this.httpClient.post(this.baseUrl +'/dashow.php',{dadistrict})
              // return this.httpClient.get(this.baseUrl +'/rolechange_approvel_show.php');
              .pipe(map(Users => {
                return Users;
                }));
            
              }

              public roledatablelogin(dadistrict:any) {
                // console.log(this.district);
                // dadistrict=this.district;
                
                return this.httpClient.post(this.baseUrl +'/rolechange_req.php',{dadistrict})
                // return this.httpClient.get(this.baseUrl +'/rolechange_approvel_show.php');
                .pipe(map(Users => {
                  return Users;
                  }));
              }

            piechartdatada:any[]=[];
            logindistrict:any;
            public piedatada(ldistrict:any) {
               console.log('str');

               console.log(ldistrict);
          
              return this.httpClient.post<any>(this.baseUrl +'/dashboarddamonth.php',{ldistrict})
              .pipe(map(Users => {
                return Users;
                }));
            }

            barchartdatada:any[]=[];
            public chartdatada(barchart:any) {
              
               console.log(barchart);
                return this.httpClient.post(this.baseUrl +'/dashboardda.php',{barchart})
              .pipe(map(Users => {
                return Users;
                }));
            }
            dashboardcarddata:any[]=[];
            public dashboardcardda(cardistrict:any) {
              //  console.log("cardistrict");
               console.log(cardistrict);
              return this.httpClient.post(this.baseUrl +'/dashboarddacard.php',{cardistrict})
              .pipe(map(Users => {
                return Users;
                }));
            }
          public sendmail(email:any) {
            return this.httpClient.post<any>(this.baseUrl + 'send_email.php', { email })
            .pipe(map(Users => {
            return Users;
            }));
            }
            // public userreg_email(email:any,firstname:any,lastname:any,father_name:any,district:any,contact_no:any,date_of_birth:any,educational_qualification:any,profession:any) {
            //   return this.httpClient.post<any>(this.baseUrl + '/self_reg_email.php', { email,firstname,lastname,father_name,district,contact_no,date_of_birth,educational_qualification,profession })
            //   .pipe(map(Users => {
            //   return Users;
            //   }));
            //   }
            public resetpassword(email:any,password:any,cpassword:any) {
                return this.httpClient.post<any>(this.baseUrl + '/update_password.php', { email,password,cpassword })
                .pipe(map(Users => {
                return Users;
                }));
                }

                public updateSA(mode:any,user_id:any,firstname:any,lastname:any,whatsapp_no:any,party_designation:any,email:any,approval_status:any,location_id='1',contact_no:any,profile_status:any) {
                console.log(profile_status);
                  const httpOptions : Object = {
                          headers: new HttpHeaders({
                            'Content-Type':'application/x-www-form-urlencoded'
                          })
                        };
                        console.log(user_id);
                    console.log("apidata : "+user_id,firstname,lastname,whatsapp_no,party_designation,approval_status)
                        return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=0', {mode,user_id,firstname,lastname,whatsapp_no,party_designation,email,approval_status,location_id,contact_no,profile_status},httpOptions)
                                .pipe(map(Users => {
                                  // console.log(Users);
                                return Users;
                                }));
                          }

      public approve_role(user_id:any,new_role:any,status:any) {
            //console.log(new_role);
                           // new_role="head";
                           // user_id = ar_id;
        const httpOptions : Object = {
           headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
                 })
                            };
            return this.httpClient.post<any>(this.baseUrl + '/rolechange_app_rej.php', { user_id,new_role,status},httpOptions)
            .pipe(map(Users => {
              return Users;
                  }));
                              }

                                public create_meeting(meeting_name:any,meeting_date:any,meeting_time:any,participants:any,meeting_type:any,meeting_location:any, comments:any,meeting_district:any) {
                                  // console.log(constituency);
                                return this.httpClient.post<any>(this.baseUrl + '/createmeeting.php',
                                { meeting_name,meeting_time,meeting_date,participants,meeting_type,meeting_location,comments,meeting_district},)
                                .pipe(map(Users => {
                                return Users;
                                }));
                                }

                                public rq_form(name:any,user_id:any,email:any,old_designation:any,new_designation:any,reason:any,district:any) {
                                  const httpOptions: Object = {
                                    headers: new HttpHeaders({
                                      'Content-Type': 'application/x-www-form-urlencoded'
                                    })
                                  };
                               // console.log("sdf")
                                  //console.log(name);
                                 return this.httpClient.post<any>(this.baseUrl + '/rolechange_req.php',
                                  {name,email,old_designation,district,new_designation,reason,user_id},httpOptions)
                                  .pipe(map(Users => {
                                  return Users;
                                  }));

                                }
                                public updateDA(mode:any,user_id:any,firstname:any,lastname:any,district:any,party_designation:any,email:any,whatsapp_no:any,approval_status:any,location_id:any,contact_no:any,fb_id:any,twitter_id:any,profile_status:any) {
                                  //let firstname='names'
                                  const httpOptions : Object = {
                                          headers: new HttpHeaders({
                                            'Content-Type':'application/x-www-form-urlencoded'
                                          })
                                        };
                                        console.log(user_id);
                                    console.log("apidata : "+user_id,firstname,lastname,district,party_designation,approval_status)
                                        return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=1', {mode,user_id,firstname,lastname,district,party_designation,email,whatsapp_no,approval_status,location_id,contact_no,fb_id,twitter_id,profile_status},httpOptions)
                                                .pipe(map(Users => {
                                                return Users;
                                                }));
                                          }

public updateOB(datafull:FormData) {
  console.log(datafull);
        const httpOptions : Object = {
          headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
          })
        };
        const params = new HttpParams();

        const options = {
                params,
                reportProgress: true,
            };
  
   return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=2', datafull,options)
                .pipe(map(Users => {
                  console.log(Users);
                return Users;
                }));
          }

  tabledatameeting: any[] = [];

                                                    public viewtablemeeting() {
                                                    // this.httpClient.get<any>(this.baseUrl +'/tablemeeting.php')
                                                    //                   .pipe(map((res)=>{
                                                    //                             const users =[];
                                                    //                             for(const key in res){
                                                    //                                 if(res.hasOwnProperty(key)){
                                                    //                                     users.push({...res[key],id:key})}
                                                    //                             } return users;
                                                    //                         })).subscribe((users:any[])=>{
                                                    //                             //console.log(users)
                                                    //                             this.tabledatameeting=users[0];
                                                    //                             })
                                                    return this.httpClient.get(this.baseUrl +'/tablemeeting.php');
                                                    }
  
  tableactivity: any[] = [];
  public viewTableActivity() {
    return this.httpClient.get(this.baseUrl + '/get_activity_index.php');
  }

  public uploadActivityFile(data: any) {
    return this.httpClient.post(this.baseUrl + '/upload_activity_file.php', data);
  }

  public updateOBActivity(data: any) {
    return this.httpClient.post(this.baseUrl + '/create_ob_activity.php', data);
  }


//    public updateSA(mode:any,firstname:any,lastname:any,designation:any,party_designation:any,email:any,approval_status:any,location_id='1') {
//  const httpOptions : Object = {
//       headers: new HttpHeaders({
//         'Content-Type':'application/x-www-form-urlencoded'
//       })
//     };
//       console.log("apidata"+firstname,lastname,designation,party_designation,approval_status,mode)
//           return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=0', {mode,firstname,lastname,designation,party_designation,email,approval_status,location_id})
//                   .pipe(map(Users => {
//                   return Users;
//                   }));
//             }
  // public delete_admin(user_id:any) {
  //   const httpOptions : Object = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/x-www-form-urlencoded'
  //     })
  //   };
  //     return this.httpClient.post<any>(this.baseUrl + '/delete.php', { user_id},httpOptions)
  //     .pipe(map(Users => {
  //     return Users;
  //     }));
  //     }

           public deletemeeting(id:any) {
              const httpOptions : Object = {
                headers: new HttpHeaders({
                  'Content-Type':'application/x-www-form-urlencoded'
                })
              };
                return this.httpClient.post<any>(this.baseUrl + '/deletemeeting.php', { id},httpOptions)
                .pipe(map(Users => {
                return Users;
                }));
                }

                public updatemeeting(id:any,meeting_date:any,meeting_time:any) {
                  console.log(id,meeting_date,meeting_time)
                  const httpOptions : Object = {
                          headers: new HttpHeaders({
                            'Content-Type':'application/x-www-form-urlencoded'
                          })
                        };
                  return this.httpClient.post<any>(this.baseUrl + '/updatemeeting.php', {id,meeting_date,meeting_time},httpOptions)
                                .pipe(map(Users => {
                                return Users;
                                }));
                          }
                          public request_post_request(postrequest="Pending") {
                            return this.httpClient.post<any>(this.baseUrl + 'add_post_request.php', { postrequest })
                            .pipe(map(Users => {
                            return Users;
                            }));
                            }
                            public dacreate_meeting(meeting_name:any,meeting_date:any,meeting_time:any,participants:any,meeting_type:any,meeting_location:any, comments:any,meeting_district:any) {
                              //console.log(meeting_name,meeting_date,meeting_time,participants,meeting_type,meeting_location, comments,meeting_district);
                            return this.httpClient.post<any>(this.baseUrl + '/dacreatemeeting.php',
                            { meeting_name,meeting_time,meeting_date,participants,meeting_type,meeting_location,comments,meeting_district},)
                            .pipe(map(Users => {
                            return Users;
                            }));
                            }
                            tabledatablemeeting:any[]=[];
                            public datablemeeting(district) {
                              const httpOptions : Object = {
                                headers: new HttpHeaders({
                                  'Content-Type':'application/x-www-form-urlencoded'
                                })
                              };
                              return this.httpClient.post<any>(this.baseUrl + '/dameeting_show.php', {district},httpOptions)
                              .pipe(map(Users => {
                              return Users;
                              }));
                            
                                                      }
                      
                                                  public daupdate_meeting(id:any,meeting_date:any,meeting_time:any) {
                                                    console.log(id,meeting_date,meeting_time)
                                                    const httpOptions : Object = {
                                                            headers: new HttpHeaders({
                                                              'Content-Type':'application/x-www-form-urlencoded'
                                                            })
                                                          };
                                                    return this.httpClient.post<any>(this.baseUrl + '/daupdate_meeting.php', {id,meeting_date,meeting_time},httpOptions)
                                                                  .pipe(map(Users => {
                                                                  return Users;
                                                                  }));
                                                                }
 
public addtionalPostRequest(id:any,name:any,district:any,applied_posting:any,applied_role:any){
//console.log(id,formdata)
      const httpOptions : Object = {
      headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
      })
      };
            return this.httpClient.post<any>(this.baseUrl + '/add_reqform.php', {id,name,district,applied_posting,applied_role},httpOptions)
            .pipe(map(Users => {
            return Users;
            }));
}     
public dropdown(district:any) {
  return this.httpClient.post(this.baseUrl+"/enggdropdown.php",{district})
}           
public addtionalPostReqApproval() {
      return this.httpClient.get(this.baseUrl +'/da_addtional-post-show.php');
      //return this.httpClient.get('http://localhost/ftp/ftp11/_addtional-post-show.php');
} 
public Add_RoleApproval(da_id:any,status:any) {
 const httpOptions : Object = {
      headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
       })  };
       //return this.httpClient.post('http://localhost/ftp/ftp11/_addtional_role_app_rej.php',{da_id, status},httpOptions);    
  return this.httpClient.post<any>(this.baseUrl + '/da_addtional_role_app_rej.php', {da_id, status},httpOptions)
  .pipe(map(Users => {
    return Users;
        }));
                    }  
public AddRole_Button(district:any) {
    const httpOptions : Object = {
    headers: new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded'
    })  };
      //return this.httpClient.post('http://localhost/ftp/ftp11/_addtional-post-button.php',{district},httpOptions);    
      return this.httpClient.post<any>(this.baseUrl + '/da_addtional-post-button.php', {district},httpOptions)
      .pipe(map(Users => {
        return Users;
            }));
  } 
  
//To get image of user by id
public getImage(id:string){
  const httpOptions : Object = {
    headers: new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded'
     })  };
  
     return this.httpClient.post<any>(this.baseUrl + '/photopreview.php', {id},httpOptions)

}



//token
setToken(token: string) {
  localStorage.setItem('token', token);
  }
  getToken() {
    this.user_details = JSON.parse(localStorage.getItem('login_user_details'));
  return localStorage.getItem('token');
  }
  deleteToken() {
  localStorage.removeItem('token');
  }
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }
public checkpassword(id:any,password:any,cpassword:any) {
                return this.httpClient.post<any>(this.baseUrl + '/update_check_password.php', {id, password,cpassword })
                .pipe(map(Users => {
                return Users;
                }));
                }
                // selfupdatebyda
public updateddaSelf(datafull:FormData): Observable<any> {
  console.log('ddd');
  console.log(datafull);
        const httpOptions : Object = {
          headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
          })
        };
        const params = new HttpParams();

        const options = {
                params,
                reportProgress: true,
            };
  
   return this.httpClient.post<any>(this.baseUrl + '/selfupdatebyda.php', datafull,options)
                .pipe(map(Users => {
                  console.log(Users);
                return Users;
                }));
          }
          table_report_ob:any[] = [];
          public report_ob(district: any){
            return this.httpClient.post(this.baseUrl + '/ob-report.php',{district});
          }

          public profile(id: any){
            return this.httpClient.post(this.baseUrl + '/profile.php',{id});
          }
}