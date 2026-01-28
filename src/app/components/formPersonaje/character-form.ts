import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personaje, TipoEntidad, TipoFaccion, TipoPoder } from '../interfaces/motu-types';
import { MotuData } from '../servicioDATA/motu-data';

@Component({
  selector: 'app-character-form',
  standalone: false,
  templateUrl: './character-form.html',
  styleUrl: './character-form.css',
})
export class CharacterForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private motuData = inject(MotuData);

  characterForm!: FormGroup;

  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string>('');
  habilidades = signal<string[]>([]);
  armas = signal<string[]>([]);
  aliados = signal<string[]>([]);
  enemigos = signal<string[]>([]);

  // Opciones para los selectores del formulario
  categorias: string[] = ['heroe', 'villano'];
  facciones: string[] = ['buenos', 'malos', 'neutros'];
  tiposPoder: string[] = ['fuerza', 'magia', 'tecnologia', 'natural'];

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    this.characterForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      categoria: ['', Validators.required],
      faccion: ['', Validators.required],
      tipoPoder: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlImagen: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loadCharacter(id);
    }
  }

  // Carga los datos del personaje en el formulario para edición
  loadCharacter(id: string) {
    this.motuData.filtrarEntidades({ tipo: 'personaje' }).subscribe((entidades: any[]) => {
      const personajes = entidades as Personaje[];
      const personaje = personajes.find(p => p.id === id);
      if (personaje) {
        this.characterForm.patchValue({
          nombre: personaje.nombre,
          categoria: personaje.categoria,
          faccion: personaje.faccion,
          tipoPoder: personaje.tipoPoder,
          descripcion: personaje.descripcion,
          urlImagen: personaje.urlImagen
        });
        this.habilidades.set(personaje.habilidades || []);
        this.armas.set(personaje.armas || []);
        this.aliados.set(personaje.aliados || []);
        this.enemigos.set(personaje.enemigos || []);
      }
    });
  }

  // Procesa el envío del formulario para crear o actualizar un personaje
  onSubmit() {
    if (this.characterForm.valid) {
      const formData = this.characterForm.value;
      const personaje: Personaje = {
        id: this.isEditMode() ? this.route.snapshot.paramMap.get('id')! : '',
        nombre: formData.nombre,
        categoria: formData.categoria,
        faccion: formData.faccion,
        tipoPoder: formData.tipoPoder,
        descripcion: formData.descripcion,
        urlImagen: formData.urlImagen,
        tipo: 'personaje' as const,
        origen: 'Eternia',
        habilidades: this.habilidades(),
        armas: this.armas(),
        aliados: this.aliados(),
        enemigos: this.enemigos(),
      };

      if (this.isEditMode()) {
        this.motuData.actualizarPersonaje(personaje);
      } else {
        this.motuData.agregarPersonaje(personaje);
      }
      this.router.navigate(['/characters']);
    }
  }

  addHabilidad() {
    this.habilidades.update(habilidades => [...habilidades, '']);
  }

  removeHabilidad(index: number) {
    this.habilidades.update(habilidades => habilidades.filter((_, i) => i !== index));
  }

  updateHabilidad(index: number, event: any) {
    const newValue = event.target.value;
    this.habilidades.update(habilidades => {
      const updated = [...habilidades];
      updated[index] = newValue;
      return updated;
    });
  }

  addArma() {
    this.armas.update(armas => [...armas, '']);
  }

  removeArma(index: number) {
    this.armas.update(armas => armas.filter((_, i) => i !== index));
  }

  updateArma(index: number, event: any) {
    const newValue = event.target.value;
    this.armas.update(armas => {
      const updated = [...armas];
      updated[index] = newValue;
      return updated;
    });
  }

  addAliado() {
    this.aliados.update(aliados => [...aliados, '']);
  }

  removeAliado(index: number) {
    this.aliados.update(aliados => aliados.filter((_, i) => i !== index));
  }

  updateAliado(index: number, event: any) {
    const newValue = event.target.value;
    this.aliados.update(aliados => {
      const updated = [...aliados];
      updated[index] = newValue;
      return updated;
    });
  }

  addEnemigo() {
    this.enemigos.update(enemigos => [...enemigos, '']);
  }

  removeEnemigo(index: number) {
    this.enemigos.update(enemigos => enemigos.filter((_, i) => i !== index));
  }

  updateEnemigo(index: number, event: any) {
    const newValue = event.target.value;
    this.enemigos.update(enemigos => {
      const updated = [...enemigos];
      updated[index] = newValue;
      return updated;
    });
  }

  onCancel() {
    this.router.navigate(['/characters']);
  }

  goBack() {
    this.router.navigate(['/characters']);
  }
}
