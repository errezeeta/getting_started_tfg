export class JuegoDeEvaluacion {
  id: number;
  NombreJuego: string;
  Descripcion: string;
  Tipo: string;
  Modo: string;
  JuegoActivo: boolean;
  JuegoTerminado: boolean;
  profesorEvalua: boolean;
  notaProfesorNormal: boolean;
  autoEvaluacion: boolean;
  Evaluadores: number;
  Pesos: any[];
  metodoSubcriterios: boolean;
  Penalizacion: any[];
  rubricaId: number;
  PreguntasAbiertas: string [];
  ModoVistaEvaluado: string;
  profesorId: number;
  grupoId: number;

  // tslint:disable-next-line:max-line-length
  constructor(id: number, NombreJuego: string, Descripcion: string, Tipo: string, Modo: string, JuegoActivo: boolean, JuegoTerminado: boolean, profesorEvalua: boolean, notaProfesorNormal: boolean, autoEvaluacion: boolean, Evaluadores: number, Pesos: any[], metodoSubcriterios: boolean, Penalizacion: any[], rubricaId: number, PreguntasAbiertas: string[], modoVistaEvaluado: string, profesorId: number, grupoId: number) {
    this.id = id;
    this.NombreJuego = NombreJuego;
    this.Descripcion = Descripcion;
    this.Tipo = Tipo;
    this.Modo = Modo;
    this.JuegoActivo = JuegoActivo;
    this.JuegoTerminado = JuegoTerminado;
    this.profesorEvalua = profesorEvalua;
    this.notaProfesorNormal = notaProfesorNormal;
    this.autoEvaluacion = autoEvaluacion;
    this.Evaluadores = Evaluadores;
    this.Pesos = Pesos;
    this.metodoSubcriterios = metodoSubcriterios;
    this.Penalizacion = Penalizacion;
    this.rubricaId = rubricaId;
    this.PreguntasAbiertas = PreguntasAbiertas;
    this.ModoVistaEvaluado = modoVistaEvaluado;
    this.profesorId = profesorId;
    this.grupoId = grupoId;

  }
}
