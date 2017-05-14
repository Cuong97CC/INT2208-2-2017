/* tslint:disable:no-unused-variable */

import { TestBed, async, } from '@angular/core/testing';
import { RWComponent } from './rightwrong.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

describe('Right or Wrong', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [
        RWComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should open the page "Đúng hay Sai"', async(() => {
    const fixture = TestBed.createComponent(RWComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title "Đúng hay Sai"`, async(() => {
    const fixture = TestBed.createComponent(RWComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Đúng hay Sai');
  }));

  it('should render title in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(RWComponent);
    const compiled = fixture.debugElement.nativeElement;
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(compiled.querySelector('h3').textContent).toContain('Đúng hay Sai');
  }));

it('should be a right answer when the question is "5 - 4 = 5" and i choose "wrong"', async(() => {
    const fixture = TestBed.createComponent(RWComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice = fixture.debugElement.query(By.css('#wrong'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.result = false;
    app.question = "5 - 4 = 5";
    choice.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.return).toContain('Chuẩn');
    expect(app.question).toContain('=');
    expect(app.score).toEqual(1);
    expect(app.chances).toEqual(2);
  }));

  it('should be a wrong answer when the question is "5 - 4 = 5" and i choose "right"', async(() => {
    const fixture = TestBed.createComponent(RWComponent);
    const btn = fixture.debugElement.query(By.css('#play'));
    const choice = fixture.debugElement.query(By.css('#right'));
    var app = fixture.debugElement.componentInstance;
    btn.triggerEventHandler('click',null);
    app.result = false;
    app.question = "5 - 4 = 5";
    choice.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(app.return).toContain('Sai');
    expect(app.question).toContain('=');
    expect(app.score).toEqual(0);
    expect(app.chances).toEqual(1);
  }));

});
