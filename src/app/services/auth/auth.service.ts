import { Injectable } from '@angular/core';
import {
  createClient, SupabaseClient
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }



  /**
   * Register a new user
   */
  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.supabase.auth.signUp({
      email, password, options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })
  }
}
