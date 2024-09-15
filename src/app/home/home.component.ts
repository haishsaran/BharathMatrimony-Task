import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from '../profile/profile.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent,MatIconModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  profile_details:any
constructor(
    private router: Router,private http: HttpClient
){
  this.http.get("assets/profile-details.json").subscribe(data =>{
    this.profile_details=data
  })
}
  gesture(){
    this.router.navigate(['tinter-swipe'])
}

getdata(event:any){
  this.profile_details = event
}

}



