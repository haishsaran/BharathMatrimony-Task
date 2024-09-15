import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogService } from '../service/dialog.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,CommonModule,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

profile_details:any
@ViewChild("dialog_box", { static: true }) dialog_box!: TemplateRef<any>;
@Output() profile_data = new EventEmitter<any>();
constructor(private http: HttpClient,private router: Router,public dialogservice:DialogService){
  this.http.get("assets/profile-details.json").subscribe(data =>{
    this.profile_details=data
  })
}


get_profile_details(data:any){
  this.router.navigate(['profile-details'],{queryParams:{ object: JSON.stringify(data)}})
}

open_dialog(data:any){
  this.dialogservice.openDialog(this.dialog_box, '100', null,
    {data}
  );
}

yes(data:any){
this.profile_details = this.profile_details.filter((item:any)=>{return item.refid !== data['data'].refid } )
this.dialogservice.closeModal()
}

ngDoCheck(){
  this.profile_data.emit(this.profile_details)
}

}
