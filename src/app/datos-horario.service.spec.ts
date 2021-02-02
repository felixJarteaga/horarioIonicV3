import { TestBed } from '@angular/core/testing';

import { DatosHorarioService } from './datos-horario.service';

describe('DatosHorarioService', () => {
  let service: DatosHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
