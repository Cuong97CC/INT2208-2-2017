import { Component } from '@angular/core';

@Component({
  selector: 'sb-app',
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
						Chọn lần lượt các số từ nhỏ đến lớn!
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
				<div class="col-md-12">
					<h4 id="score">
						Điểm: {{score}}
					</h4>
				</div>
			</div>
			<div class="row" id="choices">
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num0" (click)="onChoose(0)">
          {{num[0]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num1" (click)="onChoose(1)">
          {{num[1]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num2" (click)="onChoose(2)">
          {{num[2]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num3" (click)="onChoose(3)">
          {{num[3]}}
					</button>
				</div>
				<div class="col-xs-2">

					<button type="button" class="btn btn-default btn-block" id="num4" (click)="onChoose(4)">
          {{num[4]}}
					</button>
				</div>
				<div class="col-xs-2">
					<button type="button" class="btn btn-default btn-block" id="num5" (click)="onChoose(5)">
          {{num[5]}}
					</button>
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
	<div class="row" id="back">
		<div class="col-md-12">
			<a routerLink="/home" routerLinkActive="active" (click)="end()">Trang chủ</a>
		</div>
	</div>
</div>
  </body>
</html>
  `,
styleUrls: ['/smallbig.component.css']
})
export class SBComponent {
  title = 'Sắp xếp các số';
  num:any = ['?','?','?','?','?','?'];
  selected = [false,false,false,false,false,false];
  score = 0;
  on_play = false;
  intervalSetted = null;
  length = 0;
  timeout;
  intervalSet = null;

//Hàm tìm số nhỏ nhất trong danh sách
findMin():number {
	var min = this.num[0];
	if(this.num.length>1) {
	for(var i=0; i<this.num.length; i++) {
		if(this.num[i]<min) {
			min = this.num[i];
			}
		}
	}
	return min;
}

//Hàm kiểm tra xem có hai số trùng nhau không
checkExist():boolean {
	if(this.num.length>1){
	for(var i=0; i<this.num.length-1; i++) {
		for(var j=i+1; j < this.num.length; j++){
			if(this.num[i] === this.num[j]){
				return false;}
			}
		}
	}
	return true;
	}

//Hàm kiểm tra xem tất cả các số đã được chọn chưa
checkDone():boolean {
	for(var i = 0; i < 6; i++) {
		if(this.num[i] !== 100) {
			return false;
			}
		}
		return true;
	}

//Hàm tạo câu hỏi
init():void {
	this.num = [];
  this.selected = [false,false,false,false,false,false];
	for(var i = 0; i < 6; i++) {
		this.num[i] = Math.floor(Math.random() * 30);
		while(this.checkExist() === false) {
			this.num[i] = Math.floor(Math.random() * 30);
			}
		}
    for(var i = 0; i < 6; i++) {
      document.getElementById('num' + i).style.backgroundColor = '#FFF';
      document.getElementById('num' + i).style.color = '#000';
    }

      this.timeout = 100/7;
      this.start();
	}


//Hàm thông báo trả lời sai
over():void {
			for(var i=0; i<6; i++) {
			this.num[i] = 0;
			document.getElementById('num' + i).style.backgroundColor = '#808080';
      document.getElementById('num' + i).style.color = '#000';
		}
    this.num[0] = "S";
    this.num[1] = "A";
    this.num[2] = "I";
    this.num[3] = "R";
    this.num[4] = "Ồ";
    this.num[5] = "I";
    this.on_play = false;
    clearInterval(this.intervalSet);
	}

//Hàm thông báo hết giừo mà chưa trả lời
late():void {
  for(var i=0; i<6; i++) {
			this.num[i] = 0;
			document.getElementById('num' + i).style.backgroundColor = '#808080';
      document.getElementById('num' + i).style.color = '#000';
		}
    this.num[0] = "H";
    this.num[1] = "Ế";
    this.num[2] = "T";
    this.num[3] = "G";
    this.num[4] = "I";
    this.num[5] = "Ờ";
    this.on_play = false;
    clearInterval(this.intervalSet);
	}

//Hàm thực hiện khi click retry
retry():void {
    this.on_play = true;
		this.score = 0;
		this.init();
		}

//Hàm thực hiện khi click play
begin():void {
    this.on_play = true;
    this.score = 0;
		this.init();
}

//Hàm thực hiện khi chọn một ô
onChoose(i:number):void {
  if(this.on_play === true) {
  if(this.selected[i] === false) {
  if(this.num[i] === this.findMin()) {
    document.getElementById('num' + i).style.backgroundColor = '#CCC';
    document.getElementById('num' + i).style.color = '#CCC';
    this.selected[i] = true;
    this.num[i] = 100;
    this.score++;
    if(this.checkDone()) {
      this.init();
    }
  }
  else {
    this.over();
  }
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
    this.length+=this.timeout;
    document.getElementById('timer').style.width = this.length + "%";
    if(this.length >= 100) {
      this.late();
    }
  }

end():void {
  clearInterval(this.intervalSet);
}

}
