import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegresarPrestamosComponent } from './regresar-prestamos.component';

describe('RegresarPrestamosComponent', () => {
  let component: RegresarPrestamosComponent;
  let fixture: ComponentFixture<RegresarPrestamosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegresarPrestamosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegresarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
