import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegistrarCarreraComponent } from './modal-registrar-carrera.component';

describe('ModalRegistrarCarreraComponent', () => {
  let component: ModalRegistrarCarreraComponent;
  let fixture: ComponentFixture<ModalRegistrarCarreraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarCarreraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
