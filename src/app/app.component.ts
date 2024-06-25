import { Component, OnInit, inject } from '@angular/core';

import { TodosService } from './services/todos.service';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { ITodo } from './models/todo/todo.interface';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodosListComponent, AddTodoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  todosService = inject(TodosService);

  ngOnInit() {
    this.todosService.getAll();
  }

  onToggle() {
    let $this = this;
    return (id: ITodo['_id']) => {
      $this.todosService.toggleTodo(id).subscribe(() => {
        $this.todosService.getAll();
      });
    };
  }

  onEdit() {
    let $this = this;
    return (id: ITodo['_id'], data: Partial<ITodo>) => {
      $this.todosService.editTodo(id, data).subscribe(() => {
        $this.todosService.getAll();
      });
    };
  }

  onDelete() {
    let $this = this;
    return (id: ITodo['_id']) => {
      $this.todosService.deleteTodo(id).subscribe(() => {
        $this.todosService.getAll();
      });
    };
  }

  onCreate() {
    let $this = this;
    return (todo: Partial<ITodo>) => {
      $this.todosService.addTodo(todo).subscribe(() => {
        $this.todosService.getAll();
      });
    };
  }
}
