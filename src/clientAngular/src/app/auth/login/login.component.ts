import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public router: Router, private loginService: TaskService) { }

  user: User = {
    acumDistance: 0,
    maxDistance: 0,
    maxSpeed: 0,
    name: '',
    username: '',
    password: ''
  };

  ngOnInit() {

    const logged = JSON.parse(localStorage.getItem('session'));

    if (logged != null) { this.router.navigate(['/activity']); }

  }



  login(formData: NgForm): void {
    this.loginService.login(formData.value).subscribe(res => {
      this.router.navigateByUrl('/activity');
    });
  }


}
