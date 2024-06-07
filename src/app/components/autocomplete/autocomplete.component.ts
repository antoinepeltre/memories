import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable, of, fromEvent, map, debounceTime, distinctUntilChanged, tap, switchMap, Subject } from 'rxjs';
import { MapboxService } from 'src/app/services/mapbox/mapbox.service';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  private searchTerms = new Subject<string>();
  selectedLocation: any;
  selectedLocationName: string = '';
  suggestions: any[] = [];
  @Input() label: string = '';
  @Output() suggestion: EventEmitter<string> = new EventEmitter<string>();
  showSuggestions: boolean = false;


  constructor(private mapboxService: MapboxService) {


  }

  ngOnInit() {
    this.setupSearch();

  }

  setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(200),       // Attendre 200ms après la dernière frappe
      distinctUntilChanged(),  // Ignorer si le terme est identique au précédent
      switchMap((term) => this.mapboxService.getSuggestionsLocalisation(term)) // Passer le terme à la fonction de recherche
    ).subscribe((resp: any) => {
      if (resp.features && resp.features.length > 0) {
        this.showSuggestions = true;
        this.suggestions = resp.features.map((feature: any) => feature.properties);
      } else {
        this.suggestions = [];
        this.showSuggestions = false;
      }
    },
      error => {
        console.error('Error fetching geocoding data:', error);
        this.suggestions = [];
        this.showSuggestions = false;
      }
    );
  }

  // Appelée chaque fois que l'utilisateur tape dans le champ de saisie
  onInput(event: any): void {
    this.searchTerms.next(event.target.value);
  }

  setSelectedSuggestion(suggestion: any): void {
    this.selectedLocation = suggestion;
    this.selectedLocationName = suggestion.full_address;
    this.suggestions = [];
    this.showSuggestions = false;
    this.suggestion.emit(this.selectedLocation);

  }


}
