import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MotuData } from '../services/motu-data';
import { Character, FilterOptions } from '../interfaces/motu-types';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterList {
  private motuService = inject(MotuData);
  
  searchTerm = signal('');
  selectedFaction = signal<string>('all');
  selectedCategory = signal<string>('all');
  
  characters = this.motuService.characters;
  
  filteredCharacters = computed(() => {
    const filters: FilterOptions = {
      type: 'character',
      search: this.searchTerm() || undefined,
      faction: this.selectedFaction() !== 'all' ? this.selectedFaction() as any : undefined,
      category: this.selectedCategory() !== 'all' ? this.selectedCategory() as any : undefined
    };
    
    return this.motuService.filterEntities(filters) as Character[];
  });

  onSearchChange(event: any) {
    this.searchTerm.set(event.target.value);
  }

  onFactionChange(event: any) {
    this.selectedFaction.set(event.target.value);
  }

  onCategoryChange(event: any) {
    this.selectedCategory.set(event.target.value);
  }

  deleteCharacter(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
      this.motuService.deleteEntity(id);
    }
  }

  getFactionIcon(faction: string): string {
    switch (faction) {
      case 'heroic': return '⚡';
      case 'evil': return '💀';
      case 'independent': return '🔮';
      default: return '❓';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'hero': return '🛡️';
      case 'villain': return '⚔️';
      case 'neutral': return '⚖️';
      default: return '❓';
    }
  }

  getPowerTypeIcon(powerType: string): string {
    switch (powerType) {
      case 'magic': return '✨';
      case 'technology': return '🔧';
      case 'natural': return '💪';
      default: return '❓';
    }
  }
}
