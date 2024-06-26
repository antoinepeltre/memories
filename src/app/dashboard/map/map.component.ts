import { Component, HostBinding, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Memory } from 'src/app/models/Memory';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MemoryService } from 'src/app/services/memory/memory.service';
import { environment } from 'src/environments/environment';
const mapboxgl = require('mapbox-gl');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map = mapboxgl.Map
  style = 'mapbox://styles/mapbox/standard';
  lat = 48.866669;
  lng = 2.33333;
  zoom = 2;
  user!: User;
  memories: Memory[] = [];

  constructor(private authService: AuthService,
    private memoryService: MemoryService) {

  }

  ngOnInit() {
    this.getCurrentUser();
  }

  /**
   * GET Current user
   */
  getCurrentUser() {
    this.authService.getCurrentUser()
      .subscribe(resp => {
        if (resp) {
          this.user = resp
          if (this.user.id) {
            this.getMemories(this.user.id);
          }
        }
      })
  }


  /**
   * Get User Memories
   */
  getMemories(userId: string) {
    if (this.user) {
      this.memoryService.getMemories(userId)
        .subscribe(resp => {
          if (resp) {
            this.memories = resp;
            this.initMap();
            this.memories.forEach(memory => {
              this.generateMarkerMap(memory);
              // this.generatePopupMap(memory);
            })
          }
        })
    }
  }


  /**
   * Initialize Map
   */
  initMap() {
    mapboxgl.accessToken = environment.mapboxAccessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      zoom: this.zoom,
      style: this.style,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());





  }

  generateMarkerMap(memory: Memory) {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div class="p-2">
        <h3 class="mt-2 text-lg font-semibold text-gray-800  underline">${memory.title}</h3>
        <p class="mt-2 text-sm text-gray-600">${memory.description}</p>
        <p class="text-sm mt-2 text-gray-400 italic text-right"> ${memory.date.toLocaleString()}</p>
        </div>`
    );
    const marker = new mapboxgl.Marker()
      .setLngLat([memory.longitude, memory.latitude])
      .setPopup(popup)
      .addTo(this.map);
  }




}


