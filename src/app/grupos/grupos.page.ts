import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { DatosHorarioService } from "../datos-horario.service";
import { CopyService } from "../share/copy.service";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.page.html",
  styleUrls: ["./grupos.page.scss"],
})
export class GruposPage implements OnInit {
  nombreGrupo: string;
  gruposList: any[] = [];

  constructor(
    private copiaService: CopyService,
    private datosHorario: DatosHorarioService,
    private route: Router,
    private rutaActivada: ActivatedRoute
  ) {
    this.rutaActivada.queryParamMap.subscribe(() => {
      this.nombreGrupo = this.route.getCurrentNavigation().extras.state.nameCurso;
      this.getGrupos();
    });
  }

  ngOnInit() {}

  async getGrupos() {
    this.gruposList = [];
    await this.datosHorario.getGrupos(this.nombreGrupo);
    this.gruposList = this.datosHorario.getGruposList();
  }
  navHorario(name: string) {
    let extraNavegation: NavigationExtras = {
      state: {
        nombreCursoHorario: name,
      },
    };
    this.route.navigate(["horario"], extraNavegation);
  }
}
