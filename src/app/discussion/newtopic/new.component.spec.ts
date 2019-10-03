import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTopicComponent } from './newtopic';


describe('NewComponent', () => {
  let component: NewTopicComponent;
  let fixture: ComponentFixture<NewTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
