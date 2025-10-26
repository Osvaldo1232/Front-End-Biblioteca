import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegistrarPrestamoComponent } from './modal-registrar-prestamo.component';

describe('ModalRegistrarPrestamoComponent', () => {
  let component: ModalRegistrarPrestamoComponent;
  let fixture: ComponentFixture<ModalRegistrarPrestamoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarPrestamoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
