import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getVersions(): any {
    return this.http.get<any>(environment.API_URL);
  }

  getMessages(phoneNumber: string): any {
    // return this.http.get<any>(
    //   `${environment.API_URL}?phone=${phoneNumber}`
    // );
    return this.http.get<any>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
