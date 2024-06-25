import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo/todo.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() todo!: ITodo;

  @Input() onToggle!: (id: ITodo['_id']) => void;
  @Input() onEdit!: (id: ITodo['_id'], data: Partial<ITodo>) => void;
  @Input() onDelete!: (id: ITodo['_id']) => void;

  newTitle = '';
  isEditing = false;

  startEdit() {
    this.isEditing = true;
  }

  stopEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    this.onEdit(this.todo._id, { title: this.newTitle });
    this.isEditing = false;
  }

  delete() {
    this.onDelete(this.todo._id);
  }
}
