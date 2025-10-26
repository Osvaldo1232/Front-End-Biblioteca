import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegistrarEstudianteComponent } from './modal-registrar-estudiante.component';

describe('ModalRegistrarEstudianteComponent', () => {
  let component: ModalRegistrarEstudianteComponent;
  let fixture: ComponentFixture<ModalRegistrarEstudianteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarEstudianteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
