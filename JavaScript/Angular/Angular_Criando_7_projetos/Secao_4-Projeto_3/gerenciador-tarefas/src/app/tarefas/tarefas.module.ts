import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CadastrarTarefaComponent } from './cadastrar';
import { EditarTarefaComponent } from './editar';
import { ListarTarefaComponent } from './listar';

// Services
import { TarefaService } from './shared'

@NgModule({
  declarations: [
    CadastrarTarefaComponent,
    EditarTarefaComponent, 
    ListarTarefaComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TarefaService
  ]
})
export class TarefasModule { }
