import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MotuData } from '../services/motu-data';
import { Location, FilterOptions } from '../interfaces/motu-types';

@Component({
  selector: 'app-location-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './location-list.html',
  styleUrl: './location-list.css'
})
export class LocationList {
  private motuService = inject(MotuData);
  
  searchTerm = signal('');
  selectedFaction = signal<string>('all');
  selectedLocationType = signal<string>('all');
  
  locations = this.motuService.locations;
  
  filteredLocations = computed(() => {
    const filters: FilterOptions = {
      type: 'location',
      search: this.searchTerm() || undefined,
      faction: this.selectedFaction() !== 'all' ? this.selectedFaction() as any : undefined
    };
    
    let result = this.motuService.filterEntities(filters) as Location[];
    
    if (this.selectedLocationType() !== 'all') {
      result = result.filter(location => location.locationType === this.selectedLocationType());
    }
    
    return result;
  });

  onSearchChange(event: any) {
    this.searchTerm.set(event.target.value);
  }

  onFactionChange(event: any) {
    this.selectedFaction.set(event.target.value);
  }

  onLocationTypeChange(event: any) {
    this.selectedLocationType.set(event.target.value);
  }

  deleteLocation(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este lugar?')) {
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

  getLocationTypeIcon(locationType: string): string {
    switch (locationType) {
      case 'castle': return '🏰';
      case 'planet': return '🌍';
      case 'dimension': return '🌌';
      case 'city': return '🏙️';
      case 'fortress': return '🏯';
      case 'temple': return '⛩️';
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
