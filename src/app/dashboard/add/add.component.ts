import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Memory } from 'src/app/models/Memory';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MemoryService } from 'src/app/services/memory/memory.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  addMemoryForm: FormGroup;
  setSelectedSuggestion: any;


  constructor(private memoryService: MemoryService,
    private router: Router) {
    this.addMemoryForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl('')
    });

  }

  /**
   * Get Suggestion coordonate from autocomplete
   */
  setSelected(event: any) {
    this.setSelectedSuggestion = event;

  }

  /**
   * Add memory onSubmit
   */
  onSubmit() {
    const memory = new Memory(this.addMemoryForm.controls['title'].value, this.addMemoryForm.controls['date'].value, this.addMemoryForm.controls['description'].value, this.addMemoryForm.controls['location'].value, 'null', '0', '0')
    memory.location = this.setSelectedSuggestion.full_address;
    memory.latitude = this.setSelectedSuggestion.coordinates.latitude;
    memory.longitude = this.setSelectedSuggestion.coordinates.longitude;
    this.memoryService.addMemory(
      memory
    ).subscribe(resp => {
      this.router.navigate(['dashboard/list']);
    },
      error => {

      })
  }


}
