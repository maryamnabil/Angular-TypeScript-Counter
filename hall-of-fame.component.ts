import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css']
})
export class HallOfFameComponent implements OnInit {
 timer: any;
 timing = {
 	days: false,
 	hours: false,
 	minutes: false,
 	seconds: false,
 }


  constructor() { }

  ngOnInit() {

  var deadline = new Date("April 25, 2018 17:15:00");
  this.startTimer("clock", deadline);

  }


updateTimer(deadline){
  var timeNow = new Date();
  var time = deadline.getTime() - timeNow.getTime();
  return {
    'days': Math.floor( time/(1000*60*60*24) ),
    'hours': Math.floor( (time/(1000*60*60)) % 24 ),
    'minutes': Math.floor( (time/1000/60) % 60 ),
    'seconds': Math.floor( (time/1000) % 60 ),
    'total' : time
  };
}


animateClock(key){
  this.timing[key] = true;
  let $this = this;
  setTimeout(function(){
  	$this.timing[key] = false;
  },700);
}

startTimer(id, deadline){
  let $this = this;
  var timerInterval = setInterval(function(){
    // var clock = document.getElementById(id);
    $this.timer = $this.updateTimer(deadline);

    // clock.innerHTML = '<span>' + timer.days + '</span>'
    //                 + '<span>' + timer.hours + '</span>'
    //                 + '<span>' + timer.minutes + '</span>'
    //                 + '<span>' + timer.seconds + '</span>';

    //animationss
    // var spans = clock.getElementsByTagName("span");
    $this.animateClock('seconds');
    if($this.timer.seconds == 59) $this.animateClock('minutes');
    if($this.timer.minutes == 59 && $this.timer.seconds == 59) $this.animateClock('hours');
    if($this.timer.hours == 23 && $this.timer.minutes == 59 && $this.timer.seconds == 59) $this.animateClock('days');

    //check for end of this.timer
    if($this.timer.total < 1){
      clearInterval(timerInterval);
      // clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
      for(let key in $this.timer) {
      	$this.timer[key] = 0;
      }
    }


  }, 1000);
}




}
