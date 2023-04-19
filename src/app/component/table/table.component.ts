import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  pokemons=[];
  constructor(private PokemonService: PokemonService, private router: Router){
  }

  ngOnInit(): void {
      this.getPokemons();
  }

  getPokemons(){
    let pokemonData;
    for(let i = 1; i <= 151; i++){
      this.PokemonService.getPokemons(i).subscribe(
        res =>{ //se obtienen los datos de los pokemon
          pokemonData = {
            position: i,
            image: res.sprites.front_default, 
            name: res.name
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  getRow(row: any){
    this.router.navigateByUrl(`/detail/${row.position}`);
  }
}
