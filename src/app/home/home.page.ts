import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  pokemon: any = null;
  loading: boolean = false;
  error: string = '';
  placeholder: string = 'Ejemplo: pikachu, charizard, mewtwo';

  // Mapa de colores para tipos de Pokémon
  private typeColors = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC'
  };

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  searchPokemon() {
    if (!this.searchTerm.trim()) {
      this.error = 'Por favor, ingresa el nombre de un Pokémon';
      return;
    }

    this.loading = true;
    this.error = '';
    this.pokemon = null;

    this.pokemonService.getPokemonByName(this.searchTerm.toLowerCase()).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.loading = false;
        this.error = '';
      },
      error: (error) => {
        this.pokemon = null;
        this.loading = false;
        this.error = '¡Pokémon no encontrado! Verifica el nombre e intenta de nuevo.';
      }
    });
  }

  getTypeColor(type: string): string {
    return this.typeColors[type.toLowerCase() as keyof typeof this.typeColors] || '#777777';
  }

  getTextColor(backgroundColor: string): string {
    // Convertir el color de fondo a RGB
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    
    // Calcular la luminosidad
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retornar color de texto basado en la luminosidad
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}
