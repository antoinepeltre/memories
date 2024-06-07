import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date: Date | undefined;
  @Input() location: string = '';
  @Input() word: string = '';
  @Input() memoryId: string = '';
  @Input() index: number = 0;
  @Output() deleteMemory: EventEmitter<string> = new EventEmitter<string>();
  

  onDeleteMemory(memoryId: string) {
    this.deleteMemory.emit(memoryId);
    
  }


}
