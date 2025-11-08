import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalesRegistrarCategoriaComponent } from './modales-registrar-categoria.component';

describe('ModalesRegistrarCategoriaComponent', () => {
  let component: ModalesRegistrarCategoriaComponent;
  let fixture: ComponentFixture<ModalesRegistrarCategoriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalesRegistrarCategoriaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalesRegistrarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
