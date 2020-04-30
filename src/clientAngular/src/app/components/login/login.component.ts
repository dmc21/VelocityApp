import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/User';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public router: Router,private loginService: TaskService) { }

  ngOnInit() {
    
    let logged = JSON.parse(localStorage.getItem("session"));

    if(logged != null) this.router.navigate(["/activity"])

  }

  user = new User()

  login(formData: NgForm){
    this.user.username = formData.controls['user'].value
    this.user.password = formData.controls['password'].value

    this.loginService.login(this.user).subscribe(r => {

      this.user = r

      localStorage.setItem('session', JSON.stringify(this.user));

      this.router.navigate(["/activity"])
      
    }, err => {
      console.log("Error al loguear");
    });
  }

}
