import { Component } from '@angular/core';

@Component({
  selector: 'mem-app',
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
						Chọn đáp án đúng!
					</h6>
				</div>
			</div>
            <div class="row">
				<div class="col-md-12" id="score">
					<p>Điểm: {{score}}</p>
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
				<div class="col-md-12" id="question">
					<p>{{question}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12" id="question-item">
					<p>{{color}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-3">
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num0">
						{{text[0]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num3">
						{{text[3]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num6">
						{{text[6]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num1">
						{{text[1]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num4">
						{{text[4]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num7">
						{{text[7]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num2">
						{{text[2]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num5">
						{{text[5]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num8">
						{{text[8]}}
					</button>
				</div>
				<div class="col-xs-3">
				</div>
			</div>
            <div class="row">
				<div class="col-md-12">
					<p>-------------------</p>
				</div>
			</div>
            <div class="row">
		<div class="col-xs-2">
		</div>
		<div class="col-xs-2">

			<button type="button" class="btn btn-default btn-block" id="choice0" (click)='onChoose(0)'>
				{{choice[0]}}
			</button>
		</div>
		<div class="col-xs-2">

			<button type="button" class="btn btn-default btn-block" id="choice1" (click)='onChoose(1)'>
				{{choice[1]}}
			</button>
		</div>
		<div class="col-xs-2">

			<button type="button" class="btn btn-default btn-block" id="choice2" (click)='onChoose(2)'>
				{{choice[2]}}
			</button>
		</div>
		<div class="col-xs-2">

			<button type="button" class="btn btn-default btn-block" id="choice3" (click)='onChoose(3)'>
				{{choice[3]}}
			</button>
		</div>
		<div class="col-xs-2">
		</div>
	</div>
    <div class="row">
				<div class="col-md-12">
					<p>-------------------</p>
				</div>
			</div>
			<div class="row">
                <div class="col-xs-3">
				</div>
        <div class="col-xs-3">
					<button type="button" class="btn btn-default" id="play" (click)='begin()'>
						<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
					</button>
				</div>
        <div class="col-xs-3">
					<button type="button" class="btn btn-default" id="retry" (click)='retry()'>
						<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
					</button>
				</div>
        <div class="col-xs-3">
				</div>
			</div>
		</div>
	</div>
	<div class="row" style="padding-bottom: 65px">
		<div class="col-md-12">
			<a routerLink="/home" routerLinkActive="active" (click)="end()">Trang chủ</a>
		</div>
	</div>
</div>
	<script src='https://code.jquery.com/jquery-3.1.0.min.js'></script>
  </body>
</html>`,
  styleUrls: ['/memory.component.css']
})
export class MemComponent {
title = "Luyện trí nhớ";
question = "Tính tổng các số trong những ô màu";
color:string = '...';
color_chooser:number;
text:any = ['?','?','?','?','?','?','?','?','?'];
num = [];
choice:any = ['?','?','?','?'];
color_id = [0,0,0,0,0,0,0,0,0];
red_amount = 0;
green_amount = 0;
length = 0;
error = [];
score = 0;
result = 0;
result_id:number;
on_play = false;
intervalSet = null;

//Hàm kiểm tra xem ô đã được tô màu chưa
checkUsed(i:number):boolean {
		if(this.color_id[i] === 0) {
			return false;
			}
		return true;
	}

//Hàm kiểm tra xem các sai số tạo ra có hợp lệ không
checkErrorValid():boolean {
	if(this.error[0] === 0 || this.error[1] === 0 || this.error[2] === 0 || this.error[0] === this.error[1] || this.error[1] === this.error[2] || this.error[2] === this.error[0]) {
		return false;
		}
	else {
		return true;
		}
	}

//Hàm tạo câu hỏi
init():void {
  document.getElementById('question-item').style.color = '#000';
  this.on_play = false;

	for(var i = 0; i<9; i++) {
			document.getElementById('num' + i).style.backgroundColor = '#FFF';
			}
	this.red_amount = Math.floor(Math.random()*5);
	this.green_amount = Math.floor(Math.random()*5);
	this.num = [];
	for(var i = 0; i<9; i++) {
		this.num[i] = Math.floor(Math.random()*20)-10;
  }
  for(var i=0; i<9; i++) {
        this.text[i] = this.num[i];
      }
	this.result = 0;
	this.color_id = [0,0,0,0,0,0,0,0,0];
	this.color_chooser = Math.floor(Math.random()*2)+1;
	if(this.color_chooser === 1) {
	for(var i=0; i<this.red_amount; i++) {
		var j = Math.floor(Math.random()*9);
		while(this.checkUsed(j)) {
			j = Math.floor(Math.random()*9);
			}
		this.result+=this.num[j];
		this.color_id[j] = 1;
		}
	for(var i=0; i<this.green_amount; i++) {
		var j = Math.floor(Math.random()*9);
		while(this.checkUsed(j)) {
			j = Math.floor(Math.random()*9);
			}
		this.color_id[j] = 2;
		}
	}
	else {
		for(var i=0; i<this.red_amount; i++) {
			var j = Math.floor(Math.random()*9);
			while(this.checkUsed(j)) {
				j = Math.floor(Math.random()*9);
				}
			this.color_id[j] = 1;
			}
		for(var i=0; i<this.green_amount; i++) {
				var j = Math.floor(Math.random()*9);
				while(this.checkUsed(j)) {
				j = Math.floor(Math.random()*9);
      }
      this.result+=this.num[j];
			this.color_id[j] = 2;
		}
  }
	}

//Hàm hiển thị các dữ liệu 
setData():void {
  this.question = "Ghi nhớ";
  this.color = "...";
		for(var i=0; i<9; i++) {
			if(this.color_id[i] === 1) {
          document.getElementById('num' + i).style.backgroundColor = 'RED';
      }
      else if(this.color_id[i] === 2) {
          document.getElementById('num' + i).style.backgroundColor = 'GREEN';
      }
			}
		this.choice = ['?','?','?','?'];
    this.start();
  }

//Hàm cài đặt câu hỏi
setQuestion():void {
  this.question = "Tính tổng các số trong những ô màu"
	if(this.color_chooser === 1) {
		this.color = "ĐỎ";
    document.getElementById('question-item').style.color = 'RED';
		}
	else {
		this.color = "XANH";
    document.getElementById('question-item').style.color = 'GREEN';
		}
    this.on_play = true;
	for(var i = 0; i<9; i++) {
		this.text[i] = '?';
    document.getElementById('num' + i).style.backgroundColor = '#6F9';
		}
	this.result_id = Math.floor(Math.random()*4);
	this.choice[this.result_id] = this.result;
	this.error = [];
	for(var i=0; i<3; i++){
		this.error[i] = Math.floor(Math.random()*20)-10;
		}
	while(this.checkErrorValid() === false) {
		for(var i=0; i<3; i++){
		 	this.error[i] = Math.floor(Math.random()*20)-10;
		}
		}
		var j=0;
		for(var i=0; i<4; i++) {
			if(i !== this.result_id) {
				this.choice[i] = this.result + this.error[j];
				j++;
				}
			}
	}

//Hàm hiển thị đáp án đúng khi trả lời sai
review():void {
	for(var i=0; i<9; i++) {
			if(this.color_id[i] === 1) {
          document.getElementById('num' + i).style.backgroundColor = 'RED';
      }
      else if(this.color_id[i] === 2) {
          document.getElementById('num' + i).style.backgroundColor = 'GREEN';
      }
      else {
        document.getElementById('num' + i).style.backgroundColor = '#FFF';
      }
			}
      for(var i=0; i<9; i++) {
        this.text[i] = this.num[i];
      }
		document.getElementById('choice' + this.result_id).style.backgroundColor = "#3F3";
	}

//Hàm thông báo trả lời đúng
rightAnswer():void {
	this.score+=5;
	this.init();
	this.setData();
	}

//Hàm thông báo trả lời sai
wrongAnswer():void {
	this.question = 'Chúc em may mắn lần sau';
	this.color = 'KẾT THÚC';
	this.review();
	this.on_play = false;
	}

//Hàm thực hiện khi chọn câu trả lời
onChoose(id:number):void {
  if(this.on_play === true) {
  var temp = 0;
  if(this.color_chooser === 1) {
    for(var i=0; i<9; i++) {
      if(this.color_id[i] === 1) {
        temp+=this.num[i];
      }
    }
    if(this.choice[id] === temp) {
      this.rightAnswer();
    }
    else {
      this.wrongAnswer();
    }
  }
  else {
    for(var i=0; i<9; i++) {
      if(this.color_id[i] === 2) {
        temp+=this.num[i];
      }
    }
    if(this.choice[id] === temp) {
      this.rightAnswer();
    }
    else {
      this.wrongAnswer();
    }
  }
  }
}

//Hàm thực hiện khi click play
begin():void {
  this.score = 0;
    for(var i=0; i<4; i++) {
      document.getElementById('choice' + i).style.backgroundColor = '#FFF';
    }
    this.init();
    this.setData();
}

//Hàm thực hiện khi click retry
retry():void {
  this.score = 0;
    for(var i=0; i<4; i++) {
      document.getElementById('choice' + i).style.backgroundColor = '#FFF';
    }
    this.init();
    this.setData();
}

//Hàm chạy thời gian
start():void {
  this.length = -25;
  clearInterval(this.intervalSet);
  this.intervalSet = setInterval(()=>this.tick(),1000);
}

private tick(): void{
    this.length += 25;
    document.getElementById('timer').style.width = this.length + "%";
    if(this.length >= 100) {
      clearInterval(this.intervalSet);
      this.setQuestion();
    }
  }

end():void {
  clearInterval(this.intervalSet);
}

 }
