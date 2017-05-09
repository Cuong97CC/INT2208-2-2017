import { Component } from '@angular/core';

@Component({
  selector: 'ftr-app',
  template: `
  <!DOCTYPE html>
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
						Chọn kết quả đúng cho phép tính!
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
				<div class="col-xs-6" id="score">
					<p>
					Điểm: {{score}}
					</p>
				</div>
        <div class="col-xs-6" id="chances">
					<p>
					Cơ hội: {{chances}}
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12" id="question">
					<p>
          {{question}}
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-2">
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num0" (click)="onChoose(0)">
						{{results[0]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num1" (click)="onChoose(1)">
						{{results[1]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num2" (click)="onChoose(2)">
						{{results[2]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num3" (click)="onChoose(3)">
            {{results[3]}}
					</button>
				</div>
				<div class="col-xs-2">
				</div>
			</div>
            <div class="row">
				<div class="col-md-12">
					<p>----------</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12" id="return">
					<p>{{return}}</p>
				</div>
			</div>
			<div class="row">
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
		</div>
	</div>
	<div class="row" style="padding-bottom: 15px">
		<div class="col-md-12">
			<a routerLink="/home" routerLinkActive="active" (click)="end()">Trang chủ</a>
		</div>
	</div>
</div>
  </body>
</html>
  `,
  styleUrls: ["/findresult.component.css"],
})
export class FTRComponent {
  title = "Chọn kết quả đúng";
  result = 0;
  score = 0;
  chances = 2;
  id = 0;
  error = [];
  results = [0,0,0,0];
  val1 = 0;
  val2 = 0;
  question = "Sẵn Sàng" ;
  return = "---O---";
  on_play = false;
  length = 0;
  intervalSet = null;

  checkErrorValid(): Boolean {
	if(this.error[0] === 0 || this.error[1] === 0 || this.error[2] === 0 || this.error[0] === this.error[1] || this.error[1] === this.error[2] || this.error[2] === this.error[0]) {
		return false;
		}
	else {
		return true;
		}
	}

//Hàm tạo câu hỏi
  init(): void {
	this.val1 = Math.floor(Math.random()*20);
	this.val2 = Math.floor(Math.random()*20)+1;
	var sign = Math.floor(Math.random()*4);
	switch(sign) {
		case 0:
		this.result = this.val1 + this.val2;
		this.question = this.val1 + " + " + this.val2 + " = ?";
		break;
		case 1:
		this.result = Math.max(this.val1,this.val2) - Math.min(this.val1,this.val2);
		this.question = Math.max(this.val1,this.val2) + " - " + Math.min(this.val1,this.val2) + " = ?";
		break;
		case 2:
		this.result = this.val1 * this.val2;
		this.question = this.val1 + " x " + this.val2 + " = ?";
		break;
    case 3:
		this.result = this.val1;
		this.val1 = this.result*this.val2;
		this.question = this.val1 + " ÷ " + this.val2 + " = ?";
		break;
		default:
		break;
		}
	this.id = Math.floor(Math.random()*4);
  this.results[this.id] = this.result;
  this.error = [];
	for(var i=0; i<3; i++){
		this.error[i] = Math.floor(Math.random()*10)-5;
		}
	while(this.checkErrorValid() === false) {
		for(var i=0; i<3; i++){
		 	this.error[i] = Math.floor(Math.random()*10)-5;
		}
		}
		var j=0;
		for(var i=0; i<4; i++) {
			if(i !== this.id) {
				this.results[i] = this.result + this.error[j];
				j++;
				}
			}
    this.start();
  }

//Hàm thông báo khi có câu trả lời đúng
  rightAnswer():void {
    this.return = "Đúng rồi!";
    document.getElementById('return').style.color = "#0C0";
	  this.score++;
	  this.init();
	}

//Hàm thông báo khi có câu trả lời sai
  wrongAnswer():void {
	  this.return = 'Sai mất rồi!';
	  document.getElementById('return').style.color ='#F00';
    this.chances--;
    if(this.chances > 0) {
	  this.init();
    }
    else {
      this.over();
    }
	}

//Hàm thông báo khi hết giờ mà chưa có câu trả lời
late():void {
  this.return = 'Chậm mất rồi!';
	document.getElementById('return').style.color ='#F00';
  this.chances--;
  this.init();
}

//Hàm thông báo trò chơi kết thúc
  over(): void{
    this.on_play = false;
    this.question = "KẾT THÚC!";
    this.return = "---O---";
    clearInterval(this.intervalSet);
    document.getElementById('return').style.color ='#000';
    document.getElementById("num0").style.backgroundColor = '#808080';
		document.getElementById("num1").style.backgroundColor = '#808080';
		document.getElementById("num2").style.backgroundColor = '#808080';
		document.getElementById("num3").style.backgroundColor = '#808080';
  }

//Hàm thực hiện khi chọn câu trả lời
onChoose(i: number):void{
if( this.on_play === true){
  if(this.results[i] === this.result){
    this.rightAnswer();
  }
  else{
    this.wrongAnswer();
  }
}
}

private tick(): void{
    this.length+=100/3;
    document.getElementById('timer').style.width = this.length + "%";
    if(this.length >= 100 && this.chances > 1) {
      this.late();
    }
    if(this.length >= 100 && this.chances === 1) {
      this.chances--;
      this.over();
    }
  }

//Hàm chạy thời gian
start():void {
  this.length = -100/3;
  clearInterval(this.intervalSet);
  this.intervalSet = setInterval(()=>this.tick(),1000);
}

//Hàm thực hiện khi click play
  begin(): void{
    this.chances = 2;
    this.score = 0;
    this.init();
    this.on_play = true;
    this.return = "---O---";
    document.getElementById('return').style.color ='#000';
    (<HTMLInputElement> document.getElementById("num0")).style.backgroundColor = '#6F9';
		(<HTMLInputElement> document.getElementById("num1")).style.backgroundColor = '#6F9';
		(<HTMLInputElement> document.getElementById("num2")).style.backgroundColor = '#6F9';
		(<HTMLInputElement> document.getElementById("num3")).style.backgroundColor = '#6F9';
  }

//Hàm thực hiện khi click retry
  retry(): void{
    this.chances = 2;
    this.score = 0;
    this.init();
    this.on_play = true;
    this.return = "---O---";
    document.getElementById('return').style.color ='#000';
    (<HTMLInputElement> document.getElementById("num0")).style.backgroundColor = '#6F9';
		(<HTMLInputElement> document.getElementById("num1")).style.backgroundColor = '#6F9';
		(<HTMLInputElement> document.getElementById("num2")).style.backgroundColor = '#6F9';
		(<HTMLInputElement> document.getElementById("num3")).style.backgroundColor = '#6F9';
  }

end():void {
  clearInterval(this.intervalSet);
}

  }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
