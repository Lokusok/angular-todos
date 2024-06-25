import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo/todo.interface';
import { tap } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  loading = false;

  actualTodos: ITodo[] = [];
  completedTodos: ITodo[] = [];
  overdueTodos: ITodo[] = [];

  getAll() {
    this.loading = true;
    this.resetAllLists();

    return this.http.get<ITodo[]>(`${BASE_API_URL}todos`).subscribe((todos) => {
      todos.forEach((todo) => {
        if (todo.completed) this.completedTodos.push(todo);
        else if (new Date() > new Date(todo.deadline))
          this.overdueTodos.push(todo);
        else this.actualTodos.push(todo);

        this.loading = false;
      });
    });
  }

  toggleTodo(id: ITodo['_id']) {
    this.loading = true;
    return this.http.get(`${BASE_API_URL}todos/toggle-status/${id}`).pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }

  editTodo(id: ITodo['_id'], data: Partial<ITodo>) {
    this.loading = true;
    return this.http.patch(`${BASE_API_URL}todos/${id}`, data).pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }

  deleteTodo(id: ITodo['_id']) {
    this.loading = true;
    return this.http.delete(`${BASE_API_URL}todos/${id}`).pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }

  addTodo(todo: Partial<ITodo>) {
    this.loading = true;
    return this.http.post(`${BASE_API_URL}todos`, todo).pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }

  resetAllLists() {
    this.actualTodos = [];
    this.completedTodos = [];
    this.overdueTodos = [];
  }
}
