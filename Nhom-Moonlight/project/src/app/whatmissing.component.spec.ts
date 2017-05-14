/* tslint:disable:no-unused-variable */

import { TestBed, async, } from '@angular/core/testing';
import { WMComponent } from './whatmissing.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

describe('What Missing test', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [
        WMComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should open the page "Tìm dấu phép tính"', async(() => {
    const fixture = TestBed.createComponent(WMComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title "Tìm dấu phép tính"`, async(() => {
    const fixture = TestBed.createComponent(WMComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tìm dấu phép tính');
  }));

  it('should render title in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(WMComponent);
    const compiled = fixture.debugElement.nativeElement;
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(compiled.querySelector('h3').textContent).toContain('Tìm dấu phép tính');
  }));

it('should be a right answer when the question is "10 _ 3 = 7" and i choose "-"', async(() => {
    const fixture = TestBed.createComponent(WMComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice = fixture.debugElement.query(By.css('#sub'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.num1 = 10;
    app.num2 = 3;
    app.num3 = 7;
    app.question = "10 _ 3 = 7";
    choice.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.return).toContain('Đúng');
    expect(app.question).toContain('_','=');
    expect(app.score).toEqual(1);
    expect(app.chances).toEqual(2);
  }));

  it('should be a wrong answer when the question is "10 _ 3 = 7" and i choose "+"', async(() => {
    const fixture = TestBed.createComponent(WMComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice = fixture.debugElement.query(By.css('#add'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.num1 = 10;
    app.num2 = 3;
    app.num3 = 7;
    app.question = "10 _ 3 = 7";
    choice.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.return).toContain('Sai');
    expect(app.question).toContain('_','=');
    expect(app.score).toEqual(0);
    expect(app.chances).toEqual(1);
  }));

});
