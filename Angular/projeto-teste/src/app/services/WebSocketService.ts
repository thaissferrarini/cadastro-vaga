import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('Connected');
    };

    this.stompClient.activate();
  }

  public sendMessage(destination: string, message: string): void {
    this.stompClient.publish({
      destination,
      body: message,
    });
  }

  public getMessages(topic: string): Observable<string> {
    const subject = new Subject<string>();

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe(topic, (message: Message) => {
        subject.next(message.body);
      });
    };

    return subject.asObservable();
  }
}