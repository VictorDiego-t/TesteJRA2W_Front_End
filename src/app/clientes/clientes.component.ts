import { ClientesModule } from './clientes/clientes.module';

import { ClientesService } from './clientes.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente = new ClientesModule();
  arrayModel = {
    id: 0,
    cep: "",
    endereco: ""
  }
  clientes : Array<any> = new Array();
  lista = true;
  view = false;
  cadastro = false;
  atualizar = false;
  visualiza: any;
  alterarView = false;
  alterarId: any;
  indexAlterar: any;
  dadosAlterar: any;

  constructor(private ClientesService: ClientesService) { }

  ngOnInit(): void {
    this.listarClientes();
  }


  listarClientes(){
      this.ClientesService.listarClientes().subscribe(clientes => {
        this.clientes = clientes;
      },err =>{
        console.log('erro ao listar',err)
      })

  }

  criarnovo(){
    {

      this.cliente.enderecos.push(this.arrayModel)
      this.ClientesService.cadastrarCliente(this.cliente).subscribe(cliente =>
        {
          this.cliente = new ClientesModule;
          this.listarClientes();
          this.voltar();
          window.location.reload();
        },err =>{
          console.log('erro ao criar',err)
        })

    }
  }
  visualizar(i:number)
  {
    this.lista = false;
    this.view = true;

    this.visualiza = this.clientes[i]

  }

  apagar(id:number)
  {
    this.ClientesService.deletarClientes(id).subscribe(cliente =>
      {
        this.cliente = new ClientesModule();
        this.listarClientes();
      },err =>{
        console.log('erro ao remover',err)
      })
  }

  alterar()
  {
    {
      this.cliente.enderecos.push(this.arrayModel)

      this.ClientesService.atualizarCliente(this.dadosAlterar.id,this.dadosAlterar).subscribe(cliente =>
        {
          this.cliente = new ClientesModule;
          this.listarClientes();
          this.voltar();
        },err =>{
          console.log('erro ao alterar',err)
        })

    }



  }

  buscaCep()
  {
    this.ClientesService.buscaCep(this.arrayModel.cep).subscribe(cliente =>
      {
        let endereco = JSON.parse(JSON.stringify(cliente))

        this.arrayModel.endereco = endereco.logradouro;
      },err =>{
        console.log('erro ao remover',err)
      })
  }

  voltar()
  {
    this.lista = true;
    this.view = false;
    this.alterarView = false;
    this.cadastro = false;
    this.atualizar = false;
  }
  cadastrar(){
    this.cadastro = true;
    this.lista = false;


  }

  atualizarcad(id:number){
    this.dadosAlterar = this.clientes[id];

    this.atualizar = true;
    this.lista = false;
    this.alterarView = true;
  }

}
