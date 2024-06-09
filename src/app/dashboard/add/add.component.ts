import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Memory } from 'src/app/models/Memory';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MemoryService } from 'src/app/services/memory/memory.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addMemoryForm: FormGroup;
  setSelectedSuggestion: any;
  selectedFile: File | null = null;
  uploading = false;
  avatarUrl: SafeResourceUrl | undefined
  picturePath: string = '';


  constructor(private memoryService: MemoryService,
    private router: Router,
    private readonly dom: DomSanitizer) {
    this.addMemoryForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl('')
    });

  }

  ngOnInit() {

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
    const memory = new Memory(this.addMemoryForm.controls['title'].value, this.addMemoryForm.controls['date'].value, this.addMemoryForm.controls['description'].value, this.addMemoryForm.controls['location'].value, this.picturePath, '0', '0', '')
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadAvatar(event: any) {
    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`
    this.picturePath = filePath;

    this.memoryService.uploadMemoryPicture(filePath, file)
      .subscribe(resp => {
        if (resp) {
          this.uploading = false;
          this.downloadImage(filePath);
        }
      })
  }


  async downloadImage(path: string) {
    try {
      const { data } = await this.memoryService.downLoadImage(path)
      if (data instanceof Blob) {
        this.avatarUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message)
      }
    }
  }

}
