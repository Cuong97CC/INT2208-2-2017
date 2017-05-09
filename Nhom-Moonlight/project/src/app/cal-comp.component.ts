import { Component } from '@angular/core';

@Component({
  selector: 'cc-app',
  template: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{title}}</title>

    <meta name="description" content="Source code generated using layoutit.com">
    <meta name="author" content="LayoutIt!">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>

  </head>
  <body>

    <div class="container-fluid">
	<div class="row">
		<div class="col-md-12" id="header">
      <h3>{{title}} <span class="label label-default">MiniGame</span></h3>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-12">
					<h6>
						So sánh hai phép tính!
					</h6>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="progress">
            <div class="progress-bar" id="timer" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            </div>
            </div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12" id="score">
					<p>
					Điểm: {{score}}
					</p>
				</div>
			</div>
			<div class="row" id="question">
				<div class="col-xs-1">
				</div>
				<div class="col-xs-4">
        {{cal1}}
				</div>
				<div class="col-xs-2" id="sign">
        {{sign}}
				</div>
				<div class="col-xs-4">
        {{cal2}}
				</div>
				<div class="col-xs-1">
				</div>
			</div>
			<div class="row" style="padding-top: 15px">
				<div class="col-md-12" id="return">
					<p>{{return}}</p>
				</div>
			</div>
			<div class="row" style="padding-top: 15px">
				<div class="col-xs-3">
				</div>
        <div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="smaller" (click)="onChooseSmaller()">
						<
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="equal" (click)="onChooseEqual()">
						=
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="greater" (click)="onChooseGreater()">
						>
					</button>
				</div>
				<div class="col-xs-3">
				</div>
			</div>
			<div class="row" style="padding-top: 15px">
				<div class="col-xs-3">
				</div>
      	<div class="col-xs-3">
					<button type="button" class="btn btn-default" id="play" (click) = "begin()">
						<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
					</button>
				</div>
				<div class="col-xs-3">
					<button type="button" class="btn btn-default" id="retry" (click) = "retry()">
						<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
					</button>
				</div>
        	<div class="col-xs-3">
				</div>
			</div>
			<div class="row" style="padding-top: 15px">
				<div class="col-md-12">
					<a routerLink="/home" routerLinkActive="active" (click)="end()">Trang chủ</a>
				</div>
			</div>
		</div>
	</div>
</div>
  </body>
</html>`,
  styleUrls: ['/cal-comp.component.css']
})
export class CCComponent {
  title = "So sánh phép tính";
  result1 = 0;
  result2 = 0;
  cal1:any = '???';
  cal2:any = '???';
  sign = '?';
  score = 0;
  return = "---O---";
  on_play = false;
  length = 0;
  intervalSet = null;

//Hàm tạo câu hỏi
  init():void {
  this.sign = '?';
  document.getElementById('sign').style.color = '#000';
  var num1 = Math.floor(Math.random()*10);
	var num2 = Math.floor(Math.random()*10)+1;
  var num3 = Math.floor(Math.random()*10);
	var num4 = Math.floor(Math.random()*10)+1;
	var sign_chooser = Math.floor(Math.random()*4);
	switch(sign_chooser) {
		case 0:
		this.result1 = num1 + num2;
    this.result2 = num3 + num4;
		this.cal1 = num1 + ' + ' + num2;
    this.cal2 = num3 + ' + ' + num4;
		break;
		case 1:
		this.result1 = Math.max(num1,num2) - Math.min(num1,num2);
    this.result2 = Math.max(num3,num4) - Math.min(num3,num4);
		this.cal1 = Math.max(num1,num2) + " - " + Math.min(num1,num2);
    this.cal2 = Math.max(num3,num4) + " - " + Math.min(num3,num4);
		break;
		case 2:
		this.result1 = num1 * num2;
    this.result2 = num3 * num4;
		this.cal1 = num1 + " x " + num2;
    this.cal2 = num3 + " x " + num4;
		break;
    case 3:
		this.result1 = num1;
		num1 = this.result1*num2;
		this.cal1 = num1 + " ÷ " + num2;
    this.result2 = num3;
		num3 = this.result2*num4;
		this.cal2 = num3 + " ÷ " + num4;
		break;
		default:
		break;
  }
  this.start();
  }

//Hàm thực hiện hành động khi có câu trả lời đúng
rightAnswer():void {
  this.init();
  this.score++;
  this.return = "Đúng rồi!";
  document.getElementById('return').style.color = "#0C0";
}

//Hàm thực hiện hành động khi có câu trả lời sai
over():void {
  this.on_play = false;
  this.cal1 = this.cal1 + ' (' + this.result1 + ')';
  this.cal2 = this.cal2 + ' (' + this.result2 + ')';
  if(this.result1 > this.result2) {
    this.sign = '>';
  }
  else if(this.result1 < this.result2) {
    this.sign = '<';
  }
  else {
    this.sign = '=';
  }
  document.getElementById('sign').style.color = '#0C0';
  document.getElementById('return').style.color = '#F00';
  clearInterval(this.intervalSet);
}

//Hàm thực hiện khi click play
begin():void {
  this.score = 0;
  this.on_play = true;
  this.init();
  this.return = "---O---";
  document.getElementById('return').style.color ='#000';
}

//Hàm thực hiện khi click retry
retry():void {
  this.score = 0;
  this.on_play = true;
  this.init();
  this.return = "---O---";
  document.getElementById('return').style.color ='#000';
}

//Hàm thực hiện khi chọn dấu '>'
onChooseGreater():void {
  if(this.on_play === true) {
  if(this.result1 > this.result2) {
    this.rightAnswer();
  }
  else {
    this.return = 'Bạn chọn ">"';
    this.over();
  }
  }
}

//Hàm thực hiện khi chọn dấu '='
onChooseEqual():void {
  if(this.on_play === true) {
  if(this.result1 === this.result2) {
    this.rightAnswer();
  }
  else {
    this.return = 'Bạn chọn "="';
    this.over();
  }
  }
}

//Hàm thực hiện khi chọn dấu '<'
onChooseSmaller():void {
  if(this.on_play === true) {
  if(this.result1 < this.result2) {
    this.rightAnswer();
  }
  else {
    this.return = 'Bạn chọn "<"';
    this.over();
  }
  }
}

//Hàm chạy thời gian
start():void {
  this.length = -100/7;
  clearInterval(this.intervalSet);
  this.intervalSet = setInterval(()=>this.tick(),1000);
}

private tick(): void{
    this.length+=100/7;
    document.getElementById('timer').style.width = this.length + "%";
    if(this.length >= 100) {
      this.return = "Hết giờ";
      this.over();
    }
  }

end():void {
  clearInterval(this.intervalSet);
}


 }
