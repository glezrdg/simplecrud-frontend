import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetasService } from 'src/app/services/tarjetas.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {

  listTajertas: any[] = []
  form: FormGroup;
  id: number | undefined;
  accion = 'Agregar';
  
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetasService
    ) {
    this.form = fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required,Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required,Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.maxLength(3), Validators.minLength(3)]],
    })
  }
  
  ngOnInit(): void {
    this.obtenerTarjetas()
    
  }


  guardarTarjeta(){
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    
    if(this.id == undefined){
      this._tarjetaService.saveTarjeta(tarjeta)
      .subscribe(data =>{
        this.toastr.success('Tarjeta Agregada', `${tarjeta.titular} agrego una tarjeta`)
        this.form.reset()
        this.obtenerTarjetas()
      },error =>{
        console.log(error);
        
      })
    }
    else
    {
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(tarjeta.id,tarjeta)
      .subscribe(data => {
        this.form.reset()
        this.toastr.info('actualizada', 'no bulto')
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerTarjetas()
      },error =>{
        console.log(error);
        
      })
    }
  }
  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id)
    .subscribe(data =>{
      this.toastr.error( 'eliminada exitosamente', 'Tarjeta Eliminada')
      this.obtenerTarjetas()
    }, error =>{
      console.log(error);
      
    })
  }
  
  obtenerTarjetas(){
    this._tarjetaService.getTarjetas()
    .subscribe(data =>{
      this.listTajertas = data;
    })
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar'
    this.id = tarjeta.id

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })
  }

}
