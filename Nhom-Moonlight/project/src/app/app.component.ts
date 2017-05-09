import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'my-app',
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
				<a routerLink="/home" routerLinkActive="active"><h2 style="color: #FFF">{{title}}</h2></a>
		</div>
	</div>
  <router-outlet></router-outlet>
	<div class="row">
		<div class="col-md-12" id="footer">
			<address>
				 <strong>@Moonlight Inc.</strong><br /> <a style="color: #FFF" routerLink="/feedback" routerLinkActive="active" (click)="refresh()">Phản hồi</a>
			</address>
		</div>
	</div>
</div>
	<script src='https://code.jquery.com/jquery-3.1.0.min.js'></script>
  </body>
</html>`,
styleUrls: ['/app.component.css']
})
export class AppComponent {
  title = "TOÁN TRẺ EM";

  refresh():void {
    var timeOutSet = setTimeout(function() {
      location.reload(true);
      clearTimeout(timeOutSet);
    }, 500);
  }
 }
