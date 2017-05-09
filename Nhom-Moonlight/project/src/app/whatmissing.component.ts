import { Component } from '@angular/core';

import { AppComponent } from './app.component';

@Component({
  selector: 'wm-app',
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
						Chọn dấu thích hợp điền vào chỗ trống!
					</h6>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="progress">
						<div class="progress-bar" id="timer" role="progressbar" aria-valuemin="0" aria-valuemax="100" >
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
                <button type="button" class="btn btn-default btn-block" id="add" (click) = "onChooseAdd()">
						+
					</button>
				</div>
				<div class="col-xs-2">
				<button type="button" class="btn btn-default btn-block" id="sub" (click) = "onChooseSub()">
						-
					</button>
				</div>
				<div class="col-xs-2">
                <button type="button" class="btn btn-default btn-block" id="mul" (click) = "onChooseMul()">
						x
					</button>
				</div>
				<div class="col-xs-2">
				<button type="button" class="btn btn-default btn-block" id="div" (click) = "onChooseDiv()">
						÷
					</button>
				</div>
				<div class="col-xs-2">
				</div>
			</div>
            <div class="row">
				<div class="col-md-12">
					<p>---------</p>
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
					<button type="button" class="btn btn-default" id="play" (click)="begin()">
						<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
				  </button>
				</div>
        <div class="col-xs-3">
					<button type="button" class="btn btn-default" id="retry" (click)="retry()">
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
   <script src='https://code.jquery.com/jquery-3.1.0.min.js'></script>
  </body>
</html>`,
styleUrls: ['/whatmissing.component.css']
})
export class WMComponent {
  title = "Tìm dấu phép tính";
  score = 0;
  chances = 2;
	question = "Sẵn Sàng";
  return = "---O---";
  on_play = false;
  length = 100;
  intervalSet = null;
  num1:number;
  num2:number;
  num3:number;
  sign:number;

//Hàm tạo câu hỏi
init():void {
	this.num1 = Math.floor(Math.random()*20)+1;
	this.num2 = Math.floor(Math.random()*20)+1;
	this.sign = Math.floor(Math.random()*4);
	switch(this.sign) {
		case 0:
		this.num3 = this.num1 + this.num2;
		this.question = this.num1 + " _ " + this.num2 + " = " + this.num3;
		break;
		case 1:
		this.num3 = Math.max(this.num1,this.num2) - Math.min(this.num1,this.num2);
		this.question = Math.max(this.num1,this.num2) + " _ " + Math.min(this.num1,this.num2) + " = " + this.num3;
		break;
		case 2:
		this.num3 = this.num1 * this.num2;
		this.question = this.num1 + " _ " + this.num2 + " = " + this.num3;
		break;
		case 3:
		this.num3 = this.num1;
		this.num1 = this.num3*this.num2;
		this.question = this.num1 + " _ " + this.num2 + " = " + this.num3;
		break;
		default:
		break;
  }
  this.start();
	}

//Hàm thông báo trả lời đúng
rightAnswer():void {
	this.return = 'Đúng rồi!';
  document.getElementById('return').style.color = '#0C0';
	this.score++;
	this.init();
	}

//Hàm thông báo trả lời sai
wrongAnswer():void {
	this.return = 'Sai mất rôi!';
	document.getElementById('return').style.color = '#F00';
	this.chances--;
    if(this.chances > 0) {
	  this.init();
    }
    else {
      this.over();
    }
	}

//Hàm thông báo hết giờ mà chưa trả lời
late():void {
  this.return = 'Chậm mất rồi!';
	document.getElementById('return').style.color ='#F00';
  this.chances--;
  this.init();
}

//Hàm thực hiện khi chọn dấu '+'
onChooseAdd():void {
  if(this.on_play === true) {
	if(this.num1 + this.num2 === this.num3) {
		this.rightAnswer();
	}
	else {
		this.wrongAnswer();
  }
  }
	}

//Hàm thực hiện khi chọn dấu '-'
onChooseSub():void {
  if(this.on_play === true) {
	if(Math.max(this.num1,this.num2) - Math.min(this.num1,this.num2) === this.num3) {
		this.rightAnswer();
	}
	else {
		this.wrongAnswer();
  }
  }
	}

//Hàm thực hiện khi chọn dấu 'x'
onChooseMul():void {
  if(this.on_play === true) {
	if(this.num1 * this.num2 === this.num3) {
		this.rightAnswer();
	}
	else {
		this.wrongAnswer();
  }
}
	}

//Hàm thực hiện khi chọn dấu '/'
onChooseDiv():void {
  if(this.on_play === true) {
	if(this.num1 / this.num2 === this.num3) {
		this.rightAnswer();
	}
	else {
		this.wrongAnswer();
  }
  }
	}

//Hàm thông báo trò chơi kết thúc
over():void {
  this.question = "KẾT THÚC!";
  this.return = "---O---";
  this.on_play = false;
  clearInterval(this.intervalSet);
  document.getElementById('return').style.color = '#000';
  document.getElementById('add').style.backgroundColor = '#808080';
  document.getElementById('sub').style.backgroundColor = '#808080';
  document.getElementById('mul').style.backgroundColor = '#808080';
  document.getElementById('div').style.backgroundColor = '#808080';
}

//Hàm thực hiện khi click play
begin():void {
  this.chances = 2;
  this.score = 0;
  this.return = "---O---";
  this.init();
  this.on_play = true;
  document.getElementById('return').style.color = '#000';
  document.getElementById('add').style.backgroundColor = '#FFF';
  document.getElementById('sub').style.backgroundColor = '#FFF';
  document.getElementById('mul').style.backgroundColor = '#FFF';
  document.getElementById('div').style.backgroundColor = '#FFF';
}

//Hàm thực hiện khi click retry
retry():void {
  this.chances = 2;
	this.score = 0;
  this.return = "---O---";
  this.init();
  this.on_play = true;
  document.getElementById('return').style.color = '#000';
  document.getElementById('add').style.backgroundColor = '#FFF';
  document.getElementById('sub').style.backgroundColor = '#FFF';
  document.getElementById('mul').style.backgroundColor = '#FFF';
  document.getElementById('div').style.backgroundColor = '#FFF';
	}

//Hàm chạy thời gian
  start():void {
  this.length = -100/3;
  clearInterval(this.intervalSet);
  this.intervalSet = setInterval(()=>this.tick(),1000);
}

private tick(): void{
    this.length+=100/3;
    document.getElementById('timer').style.width = this.length + "%";
    document.ondeactivate
    if(this.length >= 100 && this.chances > 1) {
      this.late();
    }
    if(this.length >= 100 && this.chances === 1) {
      this.chances--;
      this.over();
    }
  }

end():void {
  clearInterval(this.intervalSet);
}

}
