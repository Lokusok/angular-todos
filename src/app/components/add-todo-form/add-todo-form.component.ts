import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITodo } from '../../models/todo/todo.interface';

@Component({
  selector: 'app-add-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.scss',
})
export class AddTodoFormComponent {
  @Input() onCreate!: (data: Partial<ITodo>) => void;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
    isCompleted: new FormControl(false),
  });

  onSubmit() {
    const todo: Partial<ITodo> = {
      title: this.form.value.title || '',
      deadline: this.form.value.deadline || '',
      completed: this.form.value.isCompleted || false,
    };
    this.onCreate(todo);
    this.form.reset();
  }
}
