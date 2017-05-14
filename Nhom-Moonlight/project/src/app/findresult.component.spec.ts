/* tslint:disable:no-unused-variable */

import { TestBed, async, } from '@angular/core/testing';
import { FTRComponent } from './findresult.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

describe('Find the result test', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [
        FTRComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should open the page "Chọn kết quả đúng"', async(() => {
    const fixture = TestBed.createComponent(FTRComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title "Chọn kết quả đúng"`, async(() => {
    const fixture = TestBed.createComponent(FTRComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Chọn kết quả đúng');
  }));

  it('should render title in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(FTRComponent);
    const compiled = fixture.debugElement.nativeElement;
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(compiled.querySelector('h3').textContent).toContain('Chọn kết quả đúng');
  }));

it('should be a right answer when the question is "7 + 12 = ?" with 4 choices 19 22 23 14 and i choose 19', async(() => {
    const fixture = TestBed.createComponent(FTRComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice = fixture.debugElement.query(By.css('#num0'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.result = 19;
    app.question = "7 + 12 = ?";
    app.results = [19,22,23,14];
    choice.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.return).toContain('Đúng');
    expect(app.question).toContain('= ?');
    expect(app.score).toEqual(1);
    expect(app.chances).toEqual(2);
  }));

  it('should be a wrong answer when the question is "7 + 12 = ?" with 4 choices 19 22 23 14 and i choose 22', async(() => {
    const fixture = TestBed.createComponent(FTRComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice = fixture.debugElement.query(By.css('#num1'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.result = 19;
    app.question = "7 + 12 = ?";
    app.results = [19,22,23,14];
    choice.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.return).toContain('Sai');
    expect(app.question).toContain('= ?');
    expect(app.score).toEqual(0);
    expect(app.chances).toEqual(1);
  }));

});
