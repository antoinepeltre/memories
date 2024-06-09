import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Memory } from 'src/app/models/Memory';

@Injectable({
  providedIn: 'root'
})
export class MemoryService{
  private supabase: SupabaseClient
  user: User | undefined;

  private readonly supabaseUrl = 'https://zblqfuxaqjymyfmyndlu.supabase.co';
  private readonly supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibHFmdXhhcWp5bXlmbXluZGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1OTg4OTEsImV4cCI6MjAzMzE3NDg5MX0.le_7D9YmGa1j_QGHKE1WPzZWuQraQbRMSzVk-jV6cmc';

  constructor(private authService: AuthService) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
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
          latitude: memory.latitude,
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
      .order('date', { ascending: false })
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

  uploadMemoryPicture(filePath: string, file: File) {
    return from(this.supabase.storage.from('memories').upload(filePath, file));
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('memories').download(path);
  }


}
