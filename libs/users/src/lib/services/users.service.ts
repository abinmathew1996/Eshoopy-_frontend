import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { user } from '../models/user';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
declare const require: (arg0: string) => countriesLib.LocaleData;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURLUser = environment.apiURL + 'users';

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUSers(): Observable<user[]> {
    return this.http.get<user[]>(this.apiURLUser);
  }
  getUser(userId: string): Observable<user> {
    return this.http.get<user>(`${this.apiURLUser}/${userId}`);
  }

  createUser(user: FormData): Observable<user> {
    return this.http.post<user>(this.apiURLUser, user,{ withCredentials: false });
  }

  updateUser(user: user): Observable<user> {
    return this.http.put<user>(`${this.apiURLUser}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUser}/${userId}`);
  }
  
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUser}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
  getCountries(): { id: string; name: string }[] {
    return Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
