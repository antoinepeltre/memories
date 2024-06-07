import { Injectable } from '@angular/core';
import {
  createClient, SupabaseClient
} from '@supabase/supabase-js';
import { catchError, from, map, Observable, throwError } from 'rxjs';
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
    return from(
      this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })
    );
  }

  
  /**
   * Login a user
   */
  signIn(email: string, password: string): Observable<any> {
    return from(this.supabase.auth.signInWithPassword({
      email,
      password
    })).pipe(
      map(({ data, error }) => {
        if (error) {
          localStorage.setItem('access_token', '');
          throw new Error(error.message);
        }
        if (data.session?.access_token) {
          localStorage.setItem('access_token', data.session.access_token);
          return data;
        }
        throw new Error('No access token found in response');
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
