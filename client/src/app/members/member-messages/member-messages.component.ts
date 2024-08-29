import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit{
  @Input() username: string;
  messages: Message[];

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

}
