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
  formulario: FormGroup;  //Formulario para agrupar inputs == FormControl
  colores: FormArray;     //Array de FormControl
  mensaje: string;
  fruta: Fruta;

  constructor(public frutaService: FrutaService, private route: ActivatedRoute) {
    console.trace('FormularioComponent constructor');
    this.fruta = new Fruta();

    const patronImg: string = '^(http(s?):\/\/).+(\.(jpg|png|jpeg))$';

    //Agrupación de controles == formulario
    this.formulario = new FormGroup({
      id: new FormControl('-1'),
      nombre: new FormControl( '',[ Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      precio: new FormControl('0',[ Validators.required, Validators.min(0.01), Validators.max(999)] ),
      calorias: new FormControl('0', [ Validators.required, Validators.min(0.01), Validators.max(999)] ),
      oferta: new FormControl(false),
      foto: new FormControl('http://frutas.consumer.es/sites/default/files/compra_0.jpg', [ Validators.required, Validators.pattern(patronImg)]),
      descuento: new FormControl( '0', [ Validators.min(0), Validators.max(90) ] ),
      colores: new FormArray([], Validators.minLength(1))
    });

    this.mensaje = '';

  }

  ngOnInit() {
    console.trace('FormularioComponent ngOnInit');
     //recoger parameros aqui, No constructor

    this.route.params.subscribe(params => {
      this.fruta.id = +params['id'];                 // (+) converts string 'id' to a number
        this.frutaService.getByID(this.fruta.id).subscribe(data =>{ // llamar provider para conseguir datos a traves del id
          console.trace('FormularioComponent getById %o', data);
          this.fruta = data;
          this.cargarFormulario();
        })                                     
    });
  }

  crearColorFormGroup(color?:string): FormGroup{

    if(color == undefined){
      color = 'Blanco';
    }

    return new FormGroup({
        color: new FormControl(color, [Validators.required,Validators.minLength(2),Validators.maxLength(15)])});
  }

  nuevoColor(){
    let arrayColores = this.formulario.get('colores') as FormArray;
    arrayColores.push(this.crearColorFormGroup());
  }

  eliminarColor(index: number){
    let arrayColores = this.formulario.get('colores') as FormArray;
    
    if(arrayColores.length > 1){
      arrayColores.removeAt(index);
    }
    
  }

  cargarFormulario(){
    this.formulario.controls.id.setValue(this.fruta.id);
    this.formulario.controls.nombre.setValue(this.fruta.nombre);
    this.formulario.controls.precio.setValue(this.fruta.precio);
    this.formulario.controls.calorias.setValue(this.fruta.calorias);

    this.formulario.controls.oferta.setValue(this.fruta.oferta);
    this.formulario.controls.descuento.setValue(this.fruta.descuento);
    this.formulario.controls.foto.setValue(this.fruta.foto);
    
    let arrayColores = this.formulario.get('colores') as FormArray;

    this.fruta.colores.forEach(c =>{
      arrayColores.push(this.crearColorFormGroup(c));
    });

    this.formulario.controls.colores.setValue(this.fruta.colores);

  }

  sumitar(){
    console.trace('FormularioComponent sumitar %o', this.formulario);

    let fruta = new Fruta();
    fruta.id = this.formulario.controls.id.value;
    fruta.nombre = this.formulario.controls.nombre.value;
    fruta.precio = this.formulario.controls.precio.value;
    fruta.calorias = this.formulario.controls.calorias.value;

    this.formulario.controls.colores.value.forEach(c => {
      fruta.colores.push(c);
    });


    fruta.oferta = this.formulario.controls.oferta.value;
    fruta.foto = this.formulario.controls.foto.value;
    fruta.descuento = this.formulario.controls.descuento.value;
    fruta.cantidad = 0;

    if(this.fruta.id === -1){
        this.frutaService.add(fruta).subscribe(data =>{
        console.debug('data %o', data);
        this.mensaje = `${fruta.nombre} creada correctamente`;
      });
    
    }else{
      this.frutaService.update(fruta).subscribe(data =>{
        console.debug('data %o', data);
        this.mensaje = `${fruta.nombre} modificada correctamente`;
      })
    }

    console.debug('Llamar provider pasando la fruta %o', fruta);

  }

  eliminar(id: number){
    console.debug('FormularioComponent eliminar -> ' + id);
    this.frutaService.delete(id).subscribe(data =>{
      console.debug('Fruta eliminada -> ' + data);
    })
  }

}