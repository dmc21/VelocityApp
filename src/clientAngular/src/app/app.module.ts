import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxTimerModule } from 'ngx-timer';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';

// services
import { TaskService } from './services/task.service';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { Observable } from 'rxjs';
import { NgxEchartsCoreModule } from 'ngx-echarts/core';
import { NgApexchartsModule } from 'ng-apexcharts'

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.100.24',
  port: 9001,
  username: "david",
  password: "aA639563504aA",
  path: '/mqtt'
};

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sigin',      component: LoginComponent },
  {
    path: 'activity',
    component: TasksComponent,
    data: { title: 'Activity' }
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsCoreModule,
    NgxTimerModule,
    NgApexchartsModule,
    FormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
