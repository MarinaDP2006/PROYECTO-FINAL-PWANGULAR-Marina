import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MotuData } from '../services/motu-data';
import { Weapon, FilterOptions } from '../interfaces/motu-types';

@Component({
  selector: 'app-weapon-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './weapon-list.html',
  styleUrl: './weapon-list.css'
})
export class WeaponList {
  private motuService = inject(MotuData);
  
  searchTerm = signal('');
  selectedFaction = signal<string>('all');
  selectedWeaponType = signal<string>('all');
  
  weapons = this.motuService.weapons;
  
  filteredWeapons = computed(() => {
    const filters: FilterOptions = {
      type: 'weapon',
      search: this.searchTerm() || undefined,
      faction: this.selectedFaction() !== 'all' ? this.selectedFaction() as any : undefined
    };
    
    let result = this.motuService.filterEntities(filters) as Weapon[];
    
    if (this.selectedWeaponType() !== 'all') {
      result = result.filter(weapon => weapon.weaponType === this.selectedWeaponType());
    }
    
    return result;
  });

  onSearchChange(event: any) {
    this.searchTerm.set(event.target.value);
  }

  onFactionChange(event: any) {
    this.selectedFaction.set(event.target.value);
  }

  onWeaponTypeChange(event: any) {
    this.selectedWeaponType.set(event.target.value);
  }

  deleteWeapon(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta arma?')) {
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

  getWeaponTypeIcon(weaponType: string): string {
    switch (weaponType) {
      case 'sword': return '⚔️';
      case 'staff': return '🏒';
      case 'shield': return '🛡️';
      case 'armor': return '🦺';
      case 'vehicle': return '🚗';
      case 'artifact': return '💎';
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
