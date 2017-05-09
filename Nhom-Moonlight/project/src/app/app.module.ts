import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { FBComponent }  from './feedback.component';
import { FTRComponent }   from './findresult.component';
import { RWComponent } from './rightwrong.component';
import { WMComponent } from './whatmissing.component';
import { SBComponent } from './smallbig.component';
import { CCComponent } from './cal-comp.component';
import { MNComponent } from './makenumber.component';
import { MemComponent } from './memory.component';
import { HomeComponent } from './home.component';
import { CaculatingComponent } from './caculating.component';
import { CompareComponent } from './compare.component';
import { AdvanceComponent } from './advance.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    FBComponent,
    HomeComponent,
    CaculatingComponent,
    CompareComponent,
    AdvanceComponent,
    FTRComponent,
    RWComponent,
    WMComponent,
    SBComponent,
    MNComponent,
    MemComponent,
    CCComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
