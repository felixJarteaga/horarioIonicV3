import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";
import { CopyService } from "./share/copy.service";

@Injectable({
  providedIn: "root",
})
export class DatosHorarioService {
  private db: SQLiteObject;
  private horasList: any[] = [];
  private estudiosList: any[] = [];
  private gruposList: any[] = [];
  private horasClaseHorarioList: any[] = [];

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private copy: CopyService
  ) {}

  async executeSentence(
    target: any[],
    sqlSentence: string,
    searchParam: any[]
  ) {
    let consultable = true;
    if (!this.db) {
      await this.crearBBDD()
        .then()
        .catch(() => {
          consultable = false;
        });
    }
    if (consultable) {
      this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          // target = [];
          for (let i = 0; i < data.rows.length; i++) {
            let obj = data.rows.item(i);

            target.push(obj);
          }
        })
        .catch((err) => {
          console.log("fallo al ejecutar sentencia " + JSON.stringify(err));
        });
    }
  }

  async getHoras() {
    const sql = "Select descripcion as nombre from horasSemana ";
    await this.executeSentence(this.horasList, sql, []);
  }
  async getEstudios() {
    const sql = "Select nombre as nombre from estudios";
    await this.executeSentence(this.estudiosList, sql, []);
  }
  async getGrupos(estudios: string) {
    this.gruposList = [];
    const sql = `SELECT grupo.nombre as nombre FROM grupo INNER JOIN estudios ON grupo.idEstudios = estudios.idEstudios  WHERE estudios.nombre LIKE "${estudios}"`;
    await this.executeSentence(this.gruposList, sql, []);
  }
  async getHorasClasesHorario(grupo: string) {
    this.horasClaseHorarioList = [];
    const sql = `select diaSemana.nombre as dia, horasSemana.descripcion as hora, materia.nombre as nombreMateria from horasSemana, diaClase, materiahoraclase, horaClase, materia, diaSemana, grupo, estudios where 
    grupo.nombre like "${grupo}"
    and diaSemana.idDiaSemana==diaClase.idDiaSemana
    and diaclase.idGrupo==grupo.idGrupo
    and horaclase.idDiaClase==diaclase.idDiaClase
    and horaclase.idHorasSemana==horassemana.idHorasSemana
    and materiahoraclase.idHoraClase==horaclase.idHoraClase
    and materiahoraclase.idMateria==materia.idMateria
    group by horaClase.idHorasSemana, horaClase.idDiaClase, horaClase.idHoraClase`;
    console.log(sql);

    await this.executeSentence(this.horasClaseHorarioList, sql, []);
  }

  async crearBBDD() {
    await this.platform
      .ready()
      .then(async () => {
        console.log("la plataforma está lista");

        await this.sqlite
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            console.log("ya tenemos nuestra BBDD");
            console.log("------");
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log("la plataforma no esta lista");
        console.log("Error debido a: " + err);
      });
  }
  private getConector() {
    return {
      name: "Horario16.db",
      location: "default",
      createFromLocation: 1,
    };
  }

  getHorasList() {
    return this.horasList;
  }
  getEstudiosList() {
    return this.estudiosList;
  }
  getGruposList() {
    return this.gruposList;
  }
  getHorasClaseHorarioList() {
    return this.horasClaseHorarioList;
  }
}
