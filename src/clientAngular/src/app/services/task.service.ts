import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, tap} from 'rxjs/operators';

import { Task } from '../models/Task';
import { User } from '../models/User';
import {BehaviorSubject} from 'rxjs';
import {JwtResponseI} from '../models/JwtResponseI';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  DOMAIN: String = 'http://192.168.1.224:3000';
  authSubject = new BehaviorSubject(false);
  private user: User;
  private token: string;
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(`${this.DOMAIN}/tasks`)
    .pipe(map(res => res));
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.DOMAIN}/tasks`, newTask).pipe(map(res => res));
  }

  deleteTask(id) {
    return this.http.delete<Task>(`${this.DOMAIN}/tasks/${id}`).pipe(map(res => res));
  }

  updateTask(newTask) {
    return this.http.put(`${this.DOMAIN}/tasks/${newTask.id}`, newTask).pipe(map(res => res));
  }

  login(user) {
    return this.http.post<JwtResponseI>(`${this.DOMAIN}/login`, user).pipe(tap(
      (res: any) => {
              if (res) {
                this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.infoUser);
              }
        })
    );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    localStorage.removeItem('USER');
  }

  private saveToken(token: string, expiresIn: string, user: User): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    localStorage.setItem('USER', JSON.stringify(user));
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }

    return this.token;
  }

}
