import { Component } from '@angular/core';

@Component({
  selector: 'mn-app',
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
					<h6>Chọn số ô theo yêu cầu để được tổng bằng kết quả cho trước!</h6>
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
					<p>Điểm: {{score}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12" id="question">
					<p>{{amount}} ô = {{result}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-3">
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num0" (click)='onChoose(0)'>
						{{num[0]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num1" (click)='onChoose(1)'>
						{{num[1]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num2" (click)='onChoose(2)'>
						{{num[2]}}
					</button>
				</div>
				<div class="col-xs-2">
					<button type="button" class="btn btn-default btn-block" id="num3" (click)='onChoose(3)'>
						{{num[3]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num4" (click)='onChoose(4)'>
						{{num[4]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num5" (click)='onChoose(5)'>
						{{num[5]}}
					</button>
				</div>
				<div class="col-xs-2">
					<button type="button" class="btn btn-default btn-block" id="num6" (click)='onChoose(6)'>
						{{num[6]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num7" (click)='onChoose(7)'>
						{{num[7]}}
					</button>
					<button type="button" class="btn btn-default btn-block" id="num8" (click)='onChoose(8)'>
						{{num[8]}}
					</button>
				</div>
				<div class="col-xs-3">
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
	<div class="row" style="padding-bottom:65px">
		<div class="col-md-12">
			<a routerLink="/home" routerLinkActive="active" (click)="end()">Trang chủ</a>
		</div>
	</div>
</div>
	<script src='https://code.jquery.com/jquery-3.1.0.min.js'></script>
  </body>
</html>`,
  styleUrls: ['/makenumber.component.css']
})
export class MNComponent {
   title = 'Chọn các số hạng';
   num:any=['?','?','?','?','?','?','?','?','?'];
   selected = [false,false,false,false,false,false,false,false,false];
   id=[0,1,2,3,4,5,6,7,8];
   amount:any = '?';
   result:any = '?';
   sum = 0;
   counter = 0;
   score = 0;
   length = 0;
   return = "---O---";
   on_play = false;
   intervalSet = null;

//Hàm kiểm tra xem ô đã đựoc chọn chưa
checkUsed(i:number):boolean {
		if(this.id[i] === 10) {
			return true;
			}
		return false;
	}

//Hàm tạo câu hỏi
init():void {
	this.counter = 0;
	this.sum = 0;
	this.amount = Math.floor(Math.random()*2)+2;
  this.selected = [false,false,false,false,false,false,false,false,false];
	this.num = [];
	for(var i=0; i<9; i++) {
    document.getElementById('num'+i).style.backgroundColor = '#FFF';
		this.num[i] = Math.floor(Math.random()*20)-10;
		}
	this.result = 0;
	this.id=[0,1,2,3,4,5,6,7,8];
	for(var i=0; i<this.amount; i++) {
		var j = Math.floor(Math.random()*9);
		while(this.checkUsed(j)) {
			j = Math.floor(Math.random()*9);
			}
		this.result+=this.num[j];
		this.id[j] = 10;
  }
  this.start();
	}

//Hàm thông báo khi trả lời đúng
rightAnswer():void {
	this.return = 'Tốt lắm!';
  document.getElementById('return').style.color = '#0C0';
	this.score+=this.amount;
	this.init();
	}

//Hàm thông báo trò chơi kết thúc
over():void {
	this.on_play = false;
	this.return = 'KẾT THÚC';
  clearInterval(this.intervalSet);
	document.getElementById('return').style.color = '#F00';
  for(var i=0; i<9; i++) {
    document.getElementById('num'+i).style.backgroundColor = '#808080';
  }
	}

//Hàm thực hiện khi chọn một ô
onChoose(i:number):void {
  if(this.selected[i] === false && this.on_play === true) {
  this.sum+=this.num[i];
  this.counter++;
  this.selected[i]=true;
  document.getElementById('num'+i).style.backgroundColor = '#CCC';
  if(this.counter === this.amount && this.sum === this.result) {
		this.rightAnswer();
		}
	else if(this.counter === this.amount && this.sum !== this.result){
		this.over();
  }
  }
}

//Hàm thực hiện khi click play
begin():void {
  this.return = "---O---";
  document.getElementById('return').style.color = '#000';
  this.on_play = true;
  this.init();
  this.score = 0;
}

//Hàm thực hiện khi click retry
retry():void {
  this.return = "---O---";
  document.getElementById('return').style.color = '#000';
  this.on_play = true;
  this.init();
  this.score = 0;
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
      this.over();
    }
  }

end():void {
  clearInterval(this.intervalSet);
}

}
