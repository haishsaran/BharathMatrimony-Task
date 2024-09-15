import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [MatIconModule,CommonModule,HttpClientModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {

profile_details:any
selected_data:any
constructor(public router:Router,private http: HttpClient,private route: ActivatedRoute){
  this.route.queryParams.subscribe((res:any)=>{
    this.selected_data = JSON.parse(res['object'])
    
  })
  this.http.get("assets/profile-details.json").subscribe(data =>{
    this.profile_details=data
  })
  
}
  goBack(){
    this.router.navigate(["home"])
  }

  getactive_data(index:any,item:any){
    if(this.selected_data.refid == item.refid){
      return index + 1
    } else {
      return 0
    }
  }
 

ngAfterViewInit(): void {
  const carouselElement = document.getElementById('carouselExampleIndicators');
  if (carouselElement) {
    const carousel = new bootstrap.Carousel(carouselElement, {
   //   interval: 2000,  // Set interval for auto-sliding
      ride: 'carousel' // Ensure carousel functionality is enabled
    });
  }
}
}
