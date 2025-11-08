import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalesRegistrarAutoresComponent } from './modales-registrar-autores.component';

describe('ModalesRegistrarAutoresComponent', () => {
  let component: ModalesRegistrarAutoresComponent;
  let fixture: ComponentFixture<ModalesRegistrarAutoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalesRegistrarAutoresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalesRegistrarAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
