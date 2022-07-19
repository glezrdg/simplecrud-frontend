import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {

  listTajertas: any = [
    {
      titular: 'German Gonzalez',
      numeroTarjeta: 455564241,
      fechaExpiracion: 15/12,
    },
    {
      titular: 'Carlos Bueno',
      numeroTarjeta: 455564241,
      fechaExpiracion: 15/12,
    },
    {
      titular: 'Julio Andre',
      numeroTarjeta: 455564241,
      fechaExpiracion: 15/12,
    },
    {
      titular: 'German Gonzalez',
      numeroTarjeta: 455564241,
      fechaExpiracion: 15/12,
    },
    {
      titular: 'Carlos Bueno',
      numeroTarjeta: 455564241,
      fechaExpiracion: 15/12,
    },
    {
      titular: 'Julio Andre',
      numeroTarjeta: 455564241,
      fechaExpiracion: 15/12,
    },
    
  ]


  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService
    ) {
    this.form = fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required,Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required,Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.maxLength(3), Validators.minLength(3)]],
    })
   }

  ngOnInit(): void {
  }
  agregarTarjeta(){
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.listTajertas.push(tarjeta);
    this.toastr.success('Tarjeta Agregada', `${tarjeta.titular} agrego una tarjeta`)
    this.form.reset()

  }
  eliminarTarjeta(i: any){
    const index = i;
    this.listTajertas.splice(index,1)
    this.toastr.error( 'eliminada exitosamente', 'Tarjeta Eliminada')
  }
  
}
