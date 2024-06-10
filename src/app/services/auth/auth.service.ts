import { Injectable } from '@angular/core';
import {
  createClient, SupabaseClient,
  User
} from '@supabase/supabase-js';
import { BehaviorSubject, catchError, from, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  userId = '';
  private isLoggedInSubject: BehaviorSubject<boolean>;

  supabaseUrl = 'https://zblqfuxaqjymyfmyndlu.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibHFmdXhhcWp5bXlmbXluZGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1OTg4OTEsImV4cCI6MjAzMzE3NDg5MX0.le_7D9YmGa1j_QGHKE1WPzZWuQraQbRMSzVk-jV6cmc';

  constructor() {
    
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.supabase.auth.getSession() !== null);

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.isLoggedInSubject.next(session !== null);
    });
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
      })
    );
  }

  /**
   * Get current user detail
   */
  getCurrentUser(): Observable<User | null> {
    return from(this.supabase.auth.getUser()).pipe(
      map(({ data, error }) => {
        if (data) {
          if (data.user) {
            this.userId = data.user?.id;
          }
          return data.user;
          
        } else if (error) {
          throw new Error(error.message);
        }
        return null;
      })
    );
  }

  /**
   * Sign out a user
   */
  signOut() {
    return from(this.supabase.auth.signOut());
  }

  /**
   * Send CurrentUserId from everywhere
   */
  getCurrentUserId() {
    if (this.userId) {
      return this.userId;
    } else {
      return null;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
