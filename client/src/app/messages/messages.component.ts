import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, TitleCasePipe, NgbPaginationModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  messages: Message[];
  pagination: Pagination;
  container = "Unread";
  page = 1;
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: (response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    });
  }

  pageChange(event: any) {
    if(this.pageNumber != event) {
      this.pageNumber = event;
      this.loadMessages();
    }
  }

  toggleContainer(event: any) {
    this.container = event.target.attributes['value'].value;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
      }
    });
  }

}
