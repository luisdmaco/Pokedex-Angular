import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getPokemons(index: any){
    return this.http.get<any>(`${this.baseURL}/pokemon/${index}`);
  }
}
