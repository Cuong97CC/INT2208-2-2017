import { Component } from '@angular/core';

@Component({
  selector: 'rw-app',
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
					<h6>Chọn đúng hoặc sai !</h6>
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
				<div class="col-md-12" >
					<p id="question">{{question}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4">
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default" id="right" (click)="onChoose(true)">
						<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default" id="wrong" (click)="onChoose(false)">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
					</button>
				</div>
				<div class="col-xs-4">
				</div>
			</div>
            <div class="row">
                <div class="col-md-12">
                <p id="return"> {{return}} </p>
				</div>
			</div>
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
        <div class="col-md-12">
        <a routerLink="/home" routerLinkActive="active" (click)="end()">Trang chủ</a>
        </div>
	</div>
</div>
	<script src='https://code.jquery.com/jquery-3.1.0.min.js'></script>
  </body>
</html>`,
styleUrls: ['/rightwrong.component.css']
})
export class RWComponent {
  title = 'Đúng hay Sai';
  result:boolean;
	score = 0;
  chances = 2;
	question = "Sẵn Sàng";
  return = "---O---";
  on_play = false;
  length = 100;
  intervalSet = null;

//Hàm tạo câu hỏi
init():void {
	var resultChooser = Math.floor(Math.random()*2);
	var signChooser = Math.floor(Math.random()*4);
	var num1 = Math.floor(Math.random()*10);
	var num2 = Math.floor(Math.random()*10)+1;
	var num3 = 0;
	if(resultChooser===0) {
		this.result = false;
		var error = Math.floor(Math.random()*10)+1;
		switch(signChooser) {
			case 0:
			num3 = num1 + num2 + error;
			this.question = num1 + " + " + num2 + " = " + num3;
			break;
			case 1:
			num3 = Math.max(num1,num2) - Math.min(num1,num2)+error;
			this.question = Math.max(num1,num2) + " - " + Math.min(num1,num2) + " = " + num3;
			break;
			case 2:
			num3 = num1 * num2 + error;
			this.question = num1 + ' x ' + num2 + ' = ' + num3;
			break;
			case 3:
			num3 = num1 + error;
			num1 = num1*num2;
			this.question = num1 + " ÷ " + num2 + " = " + num3;
			break;
			default: break;
			}
		}
		else {
			this.result = true;
			switch(signChooser) {
			case 0:
			num3 = num1 + num2;
			this.question = num1 + " + " + num2 + " = " + num3;
			break;
			case 1:
			num3 = Math.max(num1,num2) - Math.min(num1,num2);
			this.question = Math.max(num1,num2) + " - " + Math.min(num1,num2) + " = " + num3;
			break;
			case 2:
			num3 = num1 * num2;
			this.question = num1 + 'x' + num2 + '=' + num3;
			break;
			case 3:
			num3 = num1;
			num1 = num3*num2;
			this.question = num1 + " ÷ " + num2 + " = " + num3;
			break;
			default: break;
			}
    }
    this.start();
	}

//Hàm thông báo trả lời đúng
rightAnswer():void {
	this.return = 'Chuẩn rồi!';
  document.getElementById('return').style.color = '#0C0';
	this.score++;
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

//Hàm thông báo hếtgiờ mà chưa trả lời
late():void {
  this.return = 'Chậm mất rồi!';
	document.getElementById('return').style.color ='#F00';
  this.chances--;
  this.init();
}

//Hàm tực hiện khi chọn câu trả lời
onChoose(i:boolean):void {
if(this.on_play === true) {
  if(this.result === i) {
    this.init();
    this.rightAnswer();
  }
  else {
    this.init();
    this.wrongAnswer();
  }
}
}

//Hàm thực hiện khi click retry
retry():void {
  this.chances = 2;
  this.score = 0;
  this.return = "---O---";
  this.on_play = true;
  this.init();
  document.getElementById('return').style.color = '#000';
  document.getElementById('right').style.backgroundColor = '#FFF';
  document.getElementById('wrong').style.backgroundColor = '#FFF';
}

//Hàm thực hiện khi click play
begin():void {
  this.chances = 2;
  this.score = 0;
  this.return = "---O---";
  this.on_play = true;
  this.init();
  document.getElementById('return').style.color = '#000';
  document.getElementById('right').style.backgroundColor = '#FFF';
  document.getElementById('wrong').style.backgroundColor = '#FFF';
}

//Hàm thông báo trò chơi kết thúc
over():void {
  this.question = "KẾT THÚC!";
  this.return = "---O---";
  this.on_play = false;
  clearInterval(this.intervalSet);
  document.getElementById('return').style.color = '#000';
  document.getElementById('right').style.backgroundColor = '#808080';
  document.getElementById('wrong').style.backgroundColor = '#808080';
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
