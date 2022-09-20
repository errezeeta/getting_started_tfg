import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FamiliaAvatares } from 'src/app/clases';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { SesionService, PeticionesAPIService, CalculosService } from '../../servicios/index';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-crear-familia-avatares',
  templateUrl: './crear-familia-avatares.component.html',
  styleUrls: ['./crear-familia-avatares.component.scss']
})
export class CrearFamiliaAvataresComponent implements OnInit {


  nombreFormGroup: FormGroup;
  complemento1FormGroup: FormGroup;
  complemento2FormGroup: FormGroup;
  complemento3FormGroup: FormGroup;
  complemento4FormGroup: FormGroup;

  botonAvanzarAPaso2Desactivado = true;


  fileSilueta: File;
  imagenSilueta: string;
  imagenSiluetaCargada = false;


  fileComplemento: File [][];
  imagenComplementoCargada = false;

  imagenComplemento: string[];

  cont;
  familiaAvatares: FamiliaAvatares;
  activarCargaComplemento1 = false;
  activarCargaComplemento2 = false;
  activarCargaComplemento3 = false;
  activarCargaComplemento4 = false;

  muestraSeleccionarComplemento1 = false;
  muestraSeleccionarComplemento2 = false;
  muestraSeleccionarComplemento3 = false;
  muestraSeleccionarComplemento4 = false;

  alturaSilueta;

  imagen;
  file;

  dobleancho: '300';
  doblealto: '324';
  ancho = '150';
  alto = '162';

  infoFamilia;
  ficherosFamilia;
  advertencia = true;
  errorFicheros = false;
  ficherosRepetidos: string[];



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    private calculos: CalculosService,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
   // Indico los campos que tendrá cada uno de los dos formularios que se usan en el stepper
    this.nombreFormGroup = this.formBuilder.group({
      nombreFamilia: ['', Validators.required]
    });
    this.complemento1FormGroup = this.formBuilder.group({
      nombreComplemento1: ['', Validators.required]
    });
    this.complemento2FormGroup = this.formBuilder.group({
      nombreComplemento2: ['', Validators.required]
    });
    this.complemento3FormGroup = this.formBuilder.group({
      nombreComplemento3: ['', Validators.required]
    });
    this.complemento4FormGroup = this.formBuilder.group({
      nombreComplemento4: ['', Validators.required]
    });

    this.fileComplemento = Array(4).fill([]);
    this.imagenComplemento = Array(4).fill(undefined);
    this.cont = Array(4).fill(0);
  }



  GuardarNombreFamilia() {
    if (this.nombreFormGroup.value.nombreFamilia === '') {
      this.botonAvanzarAPaso2Desactivado = true;
    } else {
      this.botonAvanzarAPaso2Desactivado = false;
      this.familiaAvatares = new FamiliaAvatares (this.nombreFormGroup.value.nombreFamilia);
      this.familiaAvatares.Complemento1 = [];
      this.familiaAvatares.Complemento2 = [];
      this.familiaAvatares.Complemento3 = [];
      this.familiaAvatares.Complemento4 = [];
    }
  }


   GuardarNombreComplemento1() {
    if (this.complemento1FormGroup.value.nombreComplemento1 === '') {
      this.activarCargaComplemento1 = false;
    } else {
      this.activarCargaComplemento1 = true;
      this.muestraSeleccionarComplemento1 = true;
      this.familiaAvatares.NombreComplemento1 =  this.complemento1FormGroup.value.nombreComplemento1;
    }
  }


  GuardarNombreComplemento2() {
    if (this.complemento2FormGroup.value.nombreComplemento2 === '') {
      this.activarCargaComplemento2 = false;
    } else {
      this.activarCargaComplemento2 = true;
      this.muestraSeleccionarComplemento2 = true;
      this.familiaAvatares.NombreComplemento2 =  this.complemento2FormGroup.value.nombreComplemento2;
    }
  }

  GuardarNombreComplemento3() {
    if (this.complemento3FormGroup.value.nombreComplemento3 === '') {
      this.activarCargaComplemento3 = false;
    } else {
      this.activarCargaComplemento3 = true;
      this.muestraSeleccionarComplemento3 = true;
      this.familiaAvatares.NombreComplemento3 =  this.complemento3FormGroup.value.nombreComplemento3;
    }
  }


  GuardarNombreComplemento4() {
    if (this.complemento4FormGroup.value.nombreComplemento4 === '') {
      this.activarCargaComplemento4 = false;
    } else {
      this.activarCargaComplemento4 = true;
      this.muestraSeleccionarComplemento4 = true;
      this.familiaAvatares.NombreComplemento4 =  this.complemento4FormGroup.value.nombreComplemento4;
    }
  }

  ActivarInputSilueta() {
    document.getElementById('inputSilueta').click();
  }

  CargarImagenSilueta($event) {
    this.fileSilueta = $event.target.files[0];
    this.familiaAvatares.Silueta = this.fileSilueta.name;

    const reader = new FileReader();
    reader.readAsDataURL(this.fileSilueta);
    reader.onload = () => {
      this.imagenSiluetaCargada = true;
      this.imagenSilueta = reader.result.toString();

    };
}


  CargarImagenComplemento(n, $event) {
    console.log ('Cargo');
    console.log (this.cont[n]);
    if (this.cont[n] === 5) {
      Swal.fire('No puedes elegir más de 5 opciones para un complemento', ' ', 'error');

    } else {
      this.file = $event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        console.log ('tengo complemento');
        this.imagenComplemento[n] = (reader.result.toString());
        this.MostrarComplemento(n);
      };
    }

  }

  ActivarInputComplemento1() {
    document.getElementById('inputComplemento1').click();
  }

  ActivarInputComplemento2() {
    document.getElementById('inputComplemento2').click();
  }
  ActivarInputComplemento3() {
    document.getElementById('inputComplemento3').click();
  }

  ActivarInputComplemento4() {
    document.getElementById('inputComplemento4').click();
  }


  MostrarComplemento(n) {
      console.log ('voy a mostrar complemento ' + (n + 1));
      // Coloco una nueva opcion para el complemento (n+1)

      this.imagen = document.createElement('img'); // creo una imagen
      // Cada imagen tendrá un identificador que será el número de complento seguido del numero de opción
      // de complemento (por ejemplo, 13 sería el identificador de la tercera opción del primer complemento de )
      this.imagen.id = (n + 1) * 10 + this.cont[n] + 1; // coloco el identificador

      this.imagen.style.left = '0px';
      this.imagen.style.top = '0px';
      this.imagen.style.position = 'absolute';
      this.imagen.style.zIndex = '1';
      // al coloar la imagen sobre la silueta debe verse con tamaño doble
      this.imagen.width = '300';
      this.imagen.height = '324';

      // Coloco el nombre del fichero en el que está la imagen
      this.imagen.src =  this.imagenComplemento[n];

      // Coloco la imagen sobre la silueta
      if (n === 0) {
        document.getElementById('muestracomplemento1').appendChild(this.imagen);
        this.muestraSeleccionarComplemento1 = false;
      } else if (n === 1) {
        document.getElementById('muestracomplemento2').appendChild(this.imagen);
        this.muestraSeleccionarComplemento2 = false;
      } else if (n === 2) {
        document.getElementById('muestracomplemento3').appendChild(this.imagen);
        this.muestraSeleccionarComplemento3 = false;
      } else {
        document.getElementById('muestracomplemento4').appendChild(this.imagen);
        this.muestraSeleccionarComplemento4 = false;
      }

  }

  AceptarComplemento(n) {
    // Guardamos el fichero y movemos la imagen de la silueta al grupo de opciones

    this.fileComplemento[n].push (this.file);
    this.imagen.style.left = '0px';
    this.imagen.style.top = '0px';
    this.imagen.style.position = 'relative';

    // La mostraremos con tamaño normal
    this.imagen.width = '150';
    this.imagen.height = '162';
    if (n === 0) {
      document.getElementById('complementos1').appendChild(this.imagen);
      this.familiaAvatares.Complemento1.push (this.file.name);
      this.muestraSeleccionarComplemento1 = true;
   } else if (n === 1) {
      document.getElementById('complementos2').appendChild(this.imagen);
      this.familiaAvatares.Complemento2.push (this.file.name);
      this.muestraSeleccionarComplemento2 = true;
   } else if (n === 2) {
      document.getElementById('complementos3').appendChild(this.imagen);

      this.familiaAvatares.Complemento3.push (this.file.name);
      this.muestraSeleccionarComplemento3 = true;
   } else {
      document.getElementById('complementos4').appendChild(this.imagen);
      this.familiaAvatares.Complemento4.push (this.file.name);
      this.muestraSeleccionarComplemento4 = true;
   }
    this.cont[n]++;

  }

  RechazarComplemento(n) {
    // Eliminamos la imagen de la silueta

    if (n === 0) {
     document.getElementById('muestracomplemento1').removeChild(this.imagen);
     this.muestraSeleccionarComplemento1 = true;
    } else if (n === 1) {
      document.getElementById('muestracomplemento2').removeChild(this.imagen);
      this.muestraSeleccionarComplemento2 = true;
    } else if (n === 2) {
      document.getElementById('muestracomplemento3').removeChild(this.imagen);
      this.muestraSeleccionarComplemento3 = true;
    } else {
      document.getElementById('muestracomplemento4').removeChild(this.imagen);
      this.muestraSeleccionarComplemento4 = true;
    }


  }

  RegistrarFamiliaAvatares() {
    Swal.fire({
      title: '¿Seguro que quieres registrar esta familia de avatares?',
      text: 'La operación no podrá deshaceerse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        // guardamos la imagen de la silueta
        const siluetaData: FormData = new FormData();
        siluetaData.append(this.fileSilueta.name, this.fileSilueta);
        this.peticionesAPI.PonImagenAvatar(siluetaData)
          .subscribe((res)=>{
            console.log(res);
          }, (err)=>{
            console.log(err);
          });

        // ahora guardamos las imagenes de los complementos
        for (let i = 0; i < 4 ; i++) {
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.fileComplemento[i].length; j++) {
            const imagen = this.fileComplemento[i][j];
            const complementoData: FormData = new FormData();
            complementoData.append(imagen.name, imagen);
            this.peticionesAPI.PonImagenAvatar(complementoData)
              .subscribe();
          }
        }
        this.peticionesAPI.CreaFamiliaAvatares (this.familiaAvatares, this.sesion.DameProfesor().id)
        .subscribe (() => {
          Swal.fire('La familia de avatares se ha registrado correctamente');
          this.location.back();
        });
      }
    });
  }

  Reiniciar() {
    this.nombreFormGroup.reset();
    this.complemento1FormGroup.reset();
    this.complemento2FormGroup.reset();
    this.complemento3FormGroup.reset();
    this.complemento4FormGroup.reset();


    this.fileComplemento = Array(4).fill([]);
    this.imagenComplemento = Array(4).fill(undefined);
    this.cont = Array(4).fill(0);

    this.imagenSiluetaCargada = false;
    this.imagenSilueta = undefined;

    this.imagenComplementoCargada = false;

    this.activarCargaComplemento1 = false;
    this.activarCargaComplemento2 = false;
    this.activarCargaComplemento3 = false;
    this.activarCargaComplemento4 = false;

    this.muestraSeleccionarComplemento1 = false;
    this.muestraSeleccionarComplemento2 = false;
    this.muestraSeleccionarComplemento3 = false;
    this.muestraSeleccionarComplemento4 = false;
  }


  // Activa la función SeleccionarInfoFamilia
  ActivarInputInfo() {
      console.log('Activar input');
      document.getElementById('inputInfo').click();
  }

  // Par abuscar el fichero JSON que contiene la info de la familia que se va
  // a cargar desde ficheros
  SeleccionarInfoFamilia($event) {

      const fileInfo = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(fileInfo, 'ISO-8859-1');
      reader.onload = () => {
        try {
          this.infoFamilia = JSON.parse(reader.result.toString());
          const familia = new FamiliaAvatares ();
          Object.assign (familia, this.infoFamilia);
          this.calculos.VerificarFicherosFamilia (familia)
          .subscribe (lista => {
            if (lista.length === 0) {
              Swal.fire({
                title: 'Selecciona ahora las imagenes de la familia',
                text: 'Selecciona todos los ficheros de la carpeta de imagenes',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Selecciona'
              }).then((result) => {
                if (result.value) {
                  // Activamos la función SeleccionarFicherosFamilia
                  document.getElementById('inputFamilia').click();
                }
              });
            } else {
              this.ficherosRepetidos = lista;
              this.errorFicheros = true;
            }
          });
        } catch (e) {
              Swal.fire('Error en el formato del fichero', '', 'error');
        }
      };
    }

  SeleccionarFicherosFamilia($event) {
      this.ficherosFamilia = Array.from($event.target.files);
  }

  RegistrarFamilia() {
      const familia = new FamiliaAvatares ();
      Object.assign (familia, this.infoFamilia);

      this.peticionesAPI.CreaFamiliaAvatares (familia, this.sesion.DameProfesor().id)
      .subscribe((res) => {
        if (res != null) {
          this.familiaAvatares = res;
          // guardamos la imagen de la silueta
          const imagenColeccion = this.ficherosFamilia.filter (f => f.name === this.familiaAvatares.Silueta)[0];
          const formDataSilueta = new FormData();
          formDataSilueta.append(this.familiaAvatares.Silueta, imagenColeccion);
          this.peticionesAPI.PonImagenAvatar (formDataSilueta)
          .subscribe(() => console.log('Imagen cargado'));

          // guadamos la imagen de cada una de las opciones de compkementos
          this.familiaAvatares.Complemento1.forEach (opcion => {
              const formDataOpcion = new FormData();
              const fileOpcion = this.ficherosFamilia.filter (f => f.name === opcion)[0];
              formDataOpcion.append(opcion, fileOpcion);
              this.peticionesAPI.PonImagenAvatar(formDataOpcion)
              .subscribe(() => console.log('Imagen cargado'));
          });

          this.familiaAvatares.Complemento2.forEach (opcion => {
            const formDataOpcion = new FormData();
            const fileOpcion = this.ficherosFamilia.filter (f => f.name === opcion)[0];
            formDataOpcion.append(opcion, fileOpcion);
            this.peticionesAPI.PonImagenAvatar(formDataOpcion)
            .subscribe(() => console.log('Imagen cargado'));
          });

          this.familiaAvatares.Complemento3.forEach (opcion => {
            const formDataOpcion = new FormData();
            const fileOpcion = this.ficherosFamilia.filter (f => f.name === opcion)[0];
            formDataOpcion.append(opcion, fileOpcion);
            this.peticionesAPI.PonImagenAvatar(formDataOpcion)
            .subscribe(() => console.log('Imagen cargado'));
          });

          this.familiaAvatares.Complemento4.forEach (opcion => {
            const formDataOpcion = new FormData();
            const fileOpcion = this.ficherosFamilia.filter (f => f.name === opcion)[0];
            formDataOpcion.append(opcion, fileOpcion);
            this.peticionesAPI.PonImagenAvatar(formDataOpcion)
            .subscribe(() => console.log('Imagen cargado'));
          });

          Swal.fire('Familia creada con éxito', '', 'success');
          this.router.navigate(['/inicio/' + this.sesion.DameProfesor().id + '/misFamiliasAvatares']);
        } else {
          console.log('fallo al crear la familia');
        }
      });
  }

  Cancelar() {
      this.router.navigate(['/inicio/' + this.sesion.DameProfesor().id]);
  }



}

