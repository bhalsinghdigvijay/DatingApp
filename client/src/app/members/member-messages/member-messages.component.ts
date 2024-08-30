import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { take } from 'rxjs';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, AsyncPipe],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit, OnDestroy{
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  messages: Message[];
  messageContent: string;
  user:User;

  constructor(
    public messageService: MessageService, 
    private accountService: AccountService
  ){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }
  

  ngOnInit(): void {
    // this.loadMessages();
    this.loadMessagesThroughMessageHub();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username).subscribe({
      next: (response) => {
        this.messages = response;
      }
    });
  }

  loadMessagesThroughMessageHub() {
    this.messageService.createHubConnection(this.user, this.username)
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: (message) => {
        this.messages.push(message);
        this.messageForm.reset();
      }
    });
  }

  sendMessageThroughMessageHub() {
    this.messageService.sendMessageThroughMessageHub(this.username, this.messageContent).then(() => this.messageForm.reset());
  }


  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

}
