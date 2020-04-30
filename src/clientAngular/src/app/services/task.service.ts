import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Task } from '../Task';
import { User } from '../User';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  domain: String = 'http://192.168.1.150:3000';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(`${this.domain}/tasks`)
    .pipe(map(res => res));
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.domain}/tasks`, newTask).pipe(map(res => res));
  }

  deleteTask(id) {
    return this.http.delete<Task>(`${this.domain}/tasks/${id}`).pipe(map(res => res));
  }

  updateTask(newTask) {
    return this.http.put(`${this.domain}/tasks/${newTask.id}`, newTask).pipe(map(res => res));
  }

  login(user){
    return this.http.post<User>(`${this.domain}/sigin`, user).pipe(map(res => res));
  }

}
