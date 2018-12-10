import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Fruta } from 'src/app/model/fruta';
import { FrutaService } from 'src/app/providers/fruta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fomulario',
  templateUrl: './fomulario.component.html',
  styleUrls: ['./fomulario.component.scss']
})
export class FomularioComponent implements OnInit {
  formulario: FormGroup; //formulario para agrupar inputs
  frutas: Fruta[];
  colores: FormArray; //Array de FormControls
  fruta : Fruta;
  mensaje: string;

  constructor(public frutaService: FrutaService, private route: ActivatedRoute) {
    console.trace('FormularioComponent constructor');
    this.mensaje="";
    this.fruta = new Fruta();
   //agrupacion de controles==formilario
    this.formulario = new FormGroup({
      id: new FormControl('-1'),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      precio: new FormControl('0', [Validators.required, Validators.max(999), Validators.min(1)]),
      calorias: new FormControl('0', [Validators.required, Validators.minLength(0), Validators.maxLength(5)]),
      descuento: new FormControl('5', [Validators.min(5), Validators.max(90)]),
      oferta: new FormControl(false),
      foto: new FormControl('https://biotrendies.com/wp-content/uploads/2015/06/frutas-hidratos.jpg', [Validators.pattern('^(http(s?):\/\/).*\.(png|jpg|jpeg)')]),
      colores: new FormArray([this.crearColorFormGroup()], Validators.minLength(1))
    });

    this.colores = this.formulario.get('colores') as FormArray;

  }

  crearColorFormGroup(): FormGroup{
    return  new FormGroup({
      color: new FormControl('verde',[Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    });
  }

  nuevoColor(){
    let arrayColores = this.formulario.get('colores') as FormArray;
    arrayColores.push(this.crearColorFormGroup());
  }

  eliminarColor(index: number){
    let arrayColores = this.formulario.get('colores') as FormArray;
    if(arrayColores.length>1){
      arrayColores.removeAt(index);
    }
    
  }

  ngOnInit() {
    console.trace('FormularioComponent ngOnInit');
    this.cargarFrutas();
    //let fruta = new Fruta();
    this.route.params.subscribe(params => {
      this.fruta.id= +params['id']; // (+) converts string 'id' to a number
       this.frutaService.getByID(this.fruta.id).subscribe(data => {
        console.debug('Datos recibidos %o', data);
        this.fruta=data;
        this.cargarFormulario();
      });

   });
  }

  cargarFrutas() {
    this.frutaService.getAll().subscribe(data => {
      console.debug('Datos recibidos %o', data);
      this.frutas = data.map(el => el);
    });
  }

  cargarFormulario() {
      this.formulario.controls.id.setValue(this.fruta.id);
      this.formulario.controls.nombre.setValue(this.fruta.nombre);
      this.formulario.controls.precio.setValue(this.fruta.precio);
      this.formulario.controls.calorias.setValue(this.fruta.calorias);
      this.formulario.controls.descuento.setValue(this.fruta.descuento);
      this.formulario.controls.oferta.setValue(this.fruta.oferta);
      //this.formulario.controls[3].get('colores').setValue(this.fruta.colores      );
      this.formulario.controls.foto.setValue(this.fruta.foto);
  }

  sumitar() {
    console.trace('FormularioComponent sumitar %o', this.formulario);

   // let fruta = new Fruta();
    this.fruta.id = this.fruta.id;
    this.fruta.nombre = this.formulario.controls.nombre.value;
    this.fruta.precio = this.formulario.controls.precio.value;
    this.fruta.oferta = this.formulario.controls.oferta.value;
    this.fruta.descuento = this.formulario.controls.descuento.value;
    this.fruta.calorias = this.formulario.controls.calorias.value;
    this.fruta.colores.push(this.formulario.controls.colores.value);
    this.fruta.foto = this.formulario.controls.foto.value;
    this.fruta.cantidad = 0;

    if(this.fruta.id === -1){
        this.frutaService.add(fruta).subscribe(data =>{
        console.debug('data %o', data);
        this.mensaje = `${fruta.nombre} añadida con exito`;
      });
    
    }else{
      this.frutaService.update(fruta).subscribe(data =>{
        console.debug('data %o', data);
        this.mensaje = `${fruta.nombre} modificada con exito`;
      })
    }

    console.debug('Llamar provider pasando la fruta %o', fruta);
  }

  eliminar(id: number) {
    console.debug(`formularioComponent eliminar ${id}`);
    this.frutaService.delete(id).subscribe(data => {
      console.debug('Datos recibidos %o', data);
      this.cargarFrutas();
    });
  }

}

