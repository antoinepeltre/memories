import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Memory } from 'src/app/models/Memory';
import { MemoryService } from 'src/app/services/memory/memory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  memories: Memory[] = [];
  user: User | undefined;

  constructor(private memoryService: MemoryService,
    private authService: AuthService) {

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
          }
        })
    }
  }

  /**
   * Delete Memory
   */
  deleteMemory(memoryId: string) {
      this.memoryService.deleteMemory(memoryId)
      .subscribe( resp => {
        if (this.user) {
          this.getMemories(this.user.id);
        }
      })
  }

}
