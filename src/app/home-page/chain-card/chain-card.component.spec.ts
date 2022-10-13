import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from '@angular/core';
import { ChainCardComponent } from './chain-card.component';

@Component({
  selector: 'ngbd-progressbar-texttypes',
  templateUrl: './chain-card.component.html'
})
export class NgbdProgressbarTextTypes {
}

describe('ChainCardComponent', () => {
  let component: ChainCardComponent;
  let fixture: ComponentFixture<ChainCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChainCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
