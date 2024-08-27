import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [
    NgbDatepickerModule, 
    NgbAlertModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css'
})
export class DateInputComponent implements ControlValueAccessor{
  @Input() label: string;
  @Input() maxDate: Date;
  config: Partial<NgbInputDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl){
    this.ngControl.valueAccessor = this;
    this.config = {
      

    }
  }
    


  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }

}
