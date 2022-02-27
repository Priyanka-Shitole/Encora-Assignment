import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  public getContacts() {
		return this.httpClient.get('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts');
	}
}
