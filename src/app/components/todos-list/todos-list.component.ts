import { Component, Input } from '@angular/core';

import { ITodo } from '../../models/todo/todo.interface';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  @Input() list!: ITodo[];

  @Input() onToggle!: (id: ITodo['_id']) => void;
  @Input() onEdit!: (id: ITodo['_id'], data: Partial<ITodo>) => void;
  @Input() onDelete!: (id: ITodo['_id']) => void;
}
