import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinksComponent } from './create-links.component';

describe('CreateLinksComponent', () => {
  let component: CreateLinksComponent;
  let fixture: ComponentFixture<CreateLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
