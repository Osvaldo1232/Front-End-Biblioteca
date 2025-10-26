import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegistrarLibroComponent } from './modal-registrar-libro.component';

describe('ModalRegistrarLibroComponent', () => {
  let component: ModalRegistrarLibroComponent;
  let fixture: ComponentFixture<ModalRegistrarLibroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarLibroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
