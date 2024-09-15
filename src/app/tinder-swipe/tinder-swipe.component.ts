import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DialogService } from '../service/dialog.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tinder-swipe',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatIconModule,MatButtonModule,HttpClientModule],
  templateUrl: './tinder-swipe.component.html',
  styleUrl: './tinder-swipe.component.scss'
})
export class TinderSwipeComponent {

  profile_details:any

  @ViewChild("dialog_box", { static: true }) dialog_box!: TemplateRef<any>;
  @ViewChildren('tinderCard') tinderCards!: QueryList<ElementRef>;
  tinderCardsArray!: Array<ElementRef>;

  moveOutWidth !: number;
  shiftRequired!: boolean;
  transitionInProgress!: boolean ;
  heartVisible!: boolean;
  crossVisible!: boolean;

  constructor(private renderer: Renderer2,private router: Router,private http: HttpClient,public dialogservice:DialogService){
    this.http.get("assets/profile-details.json").subscribe(data =>{
      this.profile_details=data
    })
  }
  
  userClickedButton(event:any, heart:any) {
    event.preventDefault();
    // if (!this.cards.length){ return false;}  
    this.dialogservice.openDialog(this.dialog_box, '100', null,
      {heart}
    );
  }



  yes(heart:any){

    if (heart) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)'
      );
      this.toggleChoiceIndicator(false, true);
     // this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)'
      );
      this.toggleChoiceIndicator(true, false);
    //  this.emitChoice(heart, this.cards[0]);
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
    this.dialogservice.closeModal()
  }

  

  handlePan(event:any) {
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.profile_details.length
    )
      return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false);
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.tinderCardsArray[0].nativeElement,
      'transform',
      'translate(' +
        event.deltaX +
        'px, ' +
        event.deltaY +
        'px) rotate(' +
        rotate +
        'deg)'
    );

    this.shiftRequired = true;
  }

  handlePanEnd(event:any) {
    this.toggleChoiceIndicator(false, false);

    if (!this.profile_details.length) return;

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        ''
      );
      this.shiftRequired = false;
    } else {
      let endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(' +
          toX +
          'px, ' +
          (toY + event.deltaY) +
          'px) rotate(' +
          rotate +
          'deg)'
      );

      this.shiftRequired = true;

     // this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross:any, heart:any) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.profile_details.shift();
    }
  }
  
  
  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    console.log('=======>', JSON.parse(JSON.stringify(this.tinderCards)));
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
      console.log(
        '=======>',
        JSON.parse(JSON.stringify(this.tinderCardsArray))
      );
    });
  }

  goBack(){
    this.router.navigate(["home"])
  }
}
