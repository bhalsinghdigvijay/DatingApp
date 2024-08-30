import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit{
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  messages: Message[];
  messageContent: string;

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username).subscribe({
      next: (response) => {
        this.messages = response;
      }
    });
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: (message) => {
        this.messages.push(message);
        this.messageForm.reset();
      }
    });
  }

}
