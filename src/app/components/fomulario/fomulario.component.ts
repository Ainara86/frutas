import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Fruta } from 'src/app/model/fruta';
import { ActivatedRoute, Router } from '@angular/router';
import { FrutaService } from 'src/app/providers/fruta.service';

@Component({
  selector: 'app-fomulario',
  templateUrl: './fomulario.component.html',
  styleUrls: ['./fomulario.component.scss']
})
export class FomularioComponent implements OnInit {
  id: number;
  fruta: Fruta;
  mensaje: string;

  formulario: FormGroup;
  colores: FormArray;

  urlPatron: string;

    constructor(private route: ActivatedRoute, public frutaService: FrutaService, private router: Router) {
    console.trace('constructor Formulario');
   
    this.id = 0;
   
    this.urlPatron = '^(http(s?)):\/\/.+\.(jpg|png|jpeg)$';

    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      precio: new FormControl(0,[ Validators.required,Validators.min(0.1), Validators.max(9999)]),
      calorias: new FormControl(0,[Validators.required,Validators.min(5),Validators.max(9999)]),
      //cantidad: new FormControl(1,[Validators.required,Validators.min(1),Validators.max(99)]),
      oferta: new FormControl(false, [ Validators.required]),
      descuento: new FormControl(5,[Validators.required, Validators.min(5),Validators.max(90)]),
      foto: new FormControl('',[ Validators.required,Validators.pattern(this.urlPatron)]),
      colores: new FormArray([this.crearColorFormGroup('')],Validators.minLength(1))
    });

    this.mensaje = '';
  }

  ngOnInit() {
    console.trace('ngOnInit FormularioComponent');
    this.fruta = new Fruta();
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      if (this.id > 0) {
        this.frutaService.getByID(this.id).subscribe(data => {
          console.debug('Data: %o', data);
          this.fruta = data as Fruta;
          this.cargarFormulario();
        });
      }
   });
  }

  cargarFormulario() {
    console.trace('cargarFormulario FormularioComponent');
    this.formulario.controls.nombre.setValue(this.fruta.nombre);
    this.formulario.controls.precio.setValue(this.fruta.precio);
    this.formulario.controls.calorias.setValue(this.fruta.calorias);
    //this.formulario.controls.cantidad.setValue(this.fruta.cantidad);
    this.formulario.controls.descuento.setValue(this.fruta.descuento);
    this.formulario.controls.oferta.setValue(this.fruta.oferta);
    this.formulario.controls.foto.setValue(this.fruta.foto);

    const listaColores = new FormArray([]) as FormArray;

    this.fruta.colores.forEach(c => {
      listaColores.push(this.crearColorFormGroup(c));
    });

    this.formulario.setControl('colores' , listaColores);
  }

  crearColorFormGroup(nombre: string): FormGroup {
    console.trace('crearColorFormGroup FormularioComponent');
    return new FormGroup({
      color: new FormControl(nombre,[Validators.required,Validators.minLength(2),Validators.maxLength(15)])
    });
  }

  nuevoColor(nombre: string) {
    console.trace('nuevoColor FormularioComponent');
    const listaColores = this.formulario.get('colores') as FormArray;
    listaColores.push(this.crearColorFormGroup(nombre));
  }

  sumitar(id: number) {
    console.trace('sumitar FormularioComponent');
    const fruta = new Fruta();
    fruta.nombre =  this.formulario.controls.nombre.value;
    fruta.precio = this.formulario.controls.precio.value;
    fruta.calorias = this.formulario.controls.calorias.value;
   // fruta.cantidad = this.formulario.controls.cantidad.value;
   fruta.cantidad=1;
    fruta.descuento = this.formulario.controls.descuento.value;
    fruta.foto = this.formulario.controls.foto.value;
    fruta.oferta = this.formulario.controls.oferta.value;

    const listaColores = this.formulario.get('colores') as FormArray;

    listaColores.controls.forEach(color => {
      const colorFormControl = color.value.color;
      fruta.colores.push(colorFormControl);
      console.trace('formControlColor', color);
    });

    //Creamos fruta nueva si es id===-1 sino modificamos
    if (id===-1) {
      this.frutaService.add(fruta).subscribe(data => {
        console.debug('data %o ', data);
       
        this.mensaje = `${fruta.nombre} creada con exito`;
      });

    } else {
      fruta.id = id;
      this.frutaService.update(fruta).subscribe(data => {
        console.debug(data);
        this.mensaje = `"${fruta.nombre}" modificada con exito`;
      });
    }
  }
}