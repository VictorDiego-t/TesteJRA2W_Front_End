import { ClientesModule } from './clientes/clientes.module';
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  resultado: any;

  constructor(private http: HttpClient) { }
  listarClientes(): Observable<any>{
    return this.http.get("http://localhost:59662/api/Clientes");
  }
  deletarClientes(id:any){
    return this.http.delete("http://localhost:59662/delete?id=".concat(id));
  }
  buscaCep(cep:string)
  {
    return this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)


  }
  atualizarCliente(id:any, cliente: ClientesModule): Observable<any>{

    console.log(cliente)
    return this.http.put("http://localhost:59662/atualizar?id=".concat(id), cliente);
  }


  private converterRespostaParaCep(cepNaResposta: any){

    return cepNaResposta.logradouro;
  }
  cadastrarCliente(cliente: ClientesModule): Observable<any>{

    console.log(cliente)
    return this.http.post("http://localhost:59662/adicionar", cliente);
  }
}
