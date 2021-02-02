import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { DatosHorarioService } from "../datos-horario.service";
import { CopyService } from "../share/copy.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  horasList: any[] = [];
  estudiosList: any[] = [];
  constructor(
    private copiaService: CopyService,
    private datosHorario: DatosHorarioService,
    private route: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.copia();
    this.abrir();
    this.getEstudios();
  }

  ngOnInit(): void {}

  copia() {
    this.copiaService.copiarBBDD();
  }
  abrir() {
    this.datosHorario.crearBBDD();
  }
  async getEstudios() {
    await this.datosHorario.getEstudios();
    this.estudiosList = this.datosHorario.getEstudiosList();
  }

  navGrupos(name: string) {
    let extraNavegation: NavigationExtras = {
      state: {
        nameCurso: name,
      },
    };
    this.route.navigate(["grupos"], extraNavegation);
  }
}
