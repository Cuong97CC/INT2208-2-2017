/* tslint:disable:no-unused-variable */

import { TestBed, async, } from '@angular/core/testing';
import { SBComponent } from './smallbig.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

describe('Small to Big test', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [
        SBComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should open the page "Sắp xếp các số"', async(() => {
    const fixture = TestBed.createComponent(SBComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title "Sắp xếp các số"`, async(() => {
    const fixture = TestBed.createComponent(SBComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sắp xếp các số');
  }));

  it('should render title in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(SBComponent);
    const compiled = fixture.debugElement.nativeElement;
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(compiled.querySelector('h3').textContent).toContain('Sắp xếp các số');
  }));

it('should be a right answer when the question is "5 23 28 8 3 21" and i choose "3 5 8 21 23 28" in order', async(() => {
    const fixture = TestBed.createComponent(SBComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice0 = fixture.debugElement.query(By.css('#num0'));
    const choice1 = fixture.debugElement.query(By.css('#num1'));
    const choice2 = fixture.debugElement.query(By.css('#num2'));
    const choice3 = fixture.debugElement.query(By.css('#num3'));
    const choice4 = fixture.debugElement.query(By.css('#num4'));
    const choice5 = fixture.debugElement.query(By.css('#num5'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.num = [5,23,28,8,3,21];
    choice4.triggerEventHandler('click',null);
    choice0.triggerEventHandler('click',null);
    choice3.triggerEventHandler('click',null);
    choice5.triggerEventHandler('click',null);
    choice1.triggerEventHandler('click',null);
    choice2.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.score).toEqual(6);
  }));

  it('should be a wrong answer when the question is "5 23 28 8 3 21" and i choose "3" then "8"', async(() => {
    const fixture = TestBed.createComponent(SBComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice0 = fixture.debugElement.query(By.css('#num0'));
    const choice1 = fixture.debugElement.query(By.css('#num1'));
    const choice2 = fixture.debugElement.query(By.css('#num2'));
    const choice3 = fixture.debugElement.query(By.css('#num3'));
    const choice4 = fixture.debugElement.query(By.css('#num4'));
    const choice5 = fixture.debugElement.query(By.css('#num5'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.num = [5,23,28,8,3,21];
    choice4.triggerEventHandler('click',null);
    choice3.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.score).toEqual(1);
    expect(app.num).toEqual(['S','A','I','R','Ồ','I']);
  }));

});
