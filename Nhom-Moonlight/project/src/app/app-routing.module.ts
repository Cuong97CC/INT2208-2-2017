import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FBComponent }  from './feedback.component';
import { FTRComponent }   from './findresult.component';
import { RWComponent } from './rightwrong.component';
import { WMComponent } from './whatmissing.component';
import { SBComponent } from './smallbig.component';
import { CCComponent } from './cal-comp.component';
import { MNComponent } from './makenumber.component';
import { MemComponent } from './memory.component';
import { CaculatingComponent } from './caculating.component';
import { CompareComponent } from './compare.component';
import { AdvanceComponent } from './advance.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'caculating',  component: CaculatingComponent },
  { path: 'compare',  component: CompareComponent },
  { path: 'advance',  component: AdvanceComponent },
  { path: 'findtheresult',  component: FTRComponent },
  { path: 'rightwrong',  component: RWComponent },
  { path: 'whatmissing',  component: WMComponent },
  { path: 'smallbig',  component: SBComponent },
  { path: 'calcomp',  component: CCComponent },
  { path: 'makenumber',  component: MNComponent },
  { path: 'memory',  component: MemComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'feedback',  component: FBComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
