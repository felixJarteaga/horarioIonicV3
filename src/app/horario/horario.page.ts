import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Horario } from "../core/model/Horario";
import { DatosHorarioService } from "../datos-horario.service";
import { CopyService } from "../share/copy.service";

@Component({
  selector: "app-horario",
  templateUrl: "./horario.page.html",
  styleUrls: ["./horario.page.scss"],
})
export class HorarioPage implements OnInit {
  nombreCursoHorario: string;
  horasClasesHorarioList: Horario[] = [];
  horarioOrdenado: Horario[] = [];
  horasSinRepetir: Set<string> = new Set<string>();
  primeraFila: Set<string> = new Set<string>();
  materia: string[] = [];

  constructor(
    private copiaService: CopyService,
    private datosHorario: DatosHorarioService,
    private route: Router,
    private rutaActivada: ActivatedRoute
  ) {
    this.rutaActivada.queryParamMap.subscribe(() => {
      this.nombreCursoHorario = this.route.getCurrentNavigation().extras.state.nombreCursoHorario;
      this.getHorasClasesHorario();
    });
  }

  ngOnInit() {}

  async getHorasClasesHorario() {
    // this.horasClasesHorarioList = [];
    await this.datosHorario.getHorasClasesHorario(this.nombreCursoHorario);
    this.horasClasesHorarioList = this.datosHorario.getHorasClaseHorarioList();
    console.log(this.horasClasesHorarioList);
    this.mostrarHorario();
  }
  mostrarHorario() {
    this.primeraFila.add("HORAS");
    this.horasClasesHorarioList.map((obj: Horario) => {
      this.primeraFila.add(obj.dia);
      this.horasSinRepetir.add(obj.hora);
      this.materia.push(obj.nombreMateria);
    });
    let array = Array.from(this.horasSinRepetir);
    do {
      this.horasClasesHorarioList.map((obj: Horario) => {
        if (obj.hora === array[0]) {
          this.horarioOrdenado.push(obj);
        }
      });
      array.shift();
    } while (array.length > 0);
  }
}
