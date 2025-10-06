import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { MessageDto } from '../_models/messageDto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = 'https://localhost:7000/api/messages/';

    /**
     *
     */
    constructor(private http: HttpClient) {}

    getAll() {
      return this.http.get<Result<MessageDto[]>>(this.baseUrl);
    }
    getSeen() {
      return this.http.get<Result<MessageDto[]>>(this.baseUrl+"read");
    }
    getUnseen() {
      return this.http.get<Result<MessageDto[]>>(this.baseUrl+"unread");
    }

    getById(id: string) {
      return this.http.get<Result<MessageDto>>(this.baseUrl + id);
    }

    create(messageDto: MessageDto) {
      return this.http.post<Result<MessageDto>>(this.baseUrl, messageDto);
    }

    update(messageDto: MessageDto) {
      return this.http.put(this.baseUrl, messageDto);
    }
    delete(id: string) {
      return this.http.delete(this.baseUrl + id);
    }
}
