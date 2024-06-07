import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Memory } from 'src/app/models/Memory';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private supabase: SupabaseClient
  user: User | undefined;

  constructor(private authService: AuthService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.getCurrentUser();

  }

  /**
   * Get current user from authService
   */
  getCurrentUser() {
    this.authService.getCurrentUser()
      .subscribe(resp => {
        if (resp) {
          this.user = resp;
        }
      })
  }


  /**
   * Add Memomry to Supabase
   */
  addMemory(memory: Memory): Observable<any> {
    return from(this.supabase
      .from('memories')
      .insert([
        {
          user_id: this.user?.id,
          title: memory.title,
          date: memory.date,
          description: memory.description,
          location: memory.location,
          photo: memory.photo,
          longitude: memory.longitude,
          latitude: memory.latitude
        }
      ])
    );
  };

  /**
   * Get Memories from Supabase
   */
  getMemories(userId: string): Observable<Memory[]> {
    
    return from(this.supabase
      .from('memories')
      .select('*')
      .eq('user_id', userId)
    ).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data.map(item => new Memory(
          item.title,
          new Date(item.date),
          item.description,
          item.location,
          item.photo,
          item.latitude,
          item.longitude,
          item.id,
        ));
      })
    );
  }

  /**
   * Delete memory
   */
  deleteMemory(memoryId: string) {
    return from(this.supabase
      .from('memories')
      .delete()
      .eq('id', memoryId))
  }
}
