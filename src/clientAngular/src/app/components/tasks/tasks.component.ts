import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { Router } from '@angular/router';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription, timer } from 'rxjs';
import * as momentjs from 'moment';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from 'ng-apexcharts';
import { CountupTimerService } from 'ngx-timer';
import { User } from 'src/app/models/User';
import {JwtResponseI} from '../../models/JwtResponseI';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  constructor(private ngxTimer: CountupTimerService, private mqttService: MqttService, public router: Router, private taskService: TaskService) {

   }

   private subscription: Subscription;
   loggedUser: User;
   distance = '';
   kmh = '';
   timeout: any;
   duration: string;
   options: any;
   updateOptions: any;
   data = [];
   private timer: any;
   @ViewChild('chart') chart: ChartComponent;
   public chartOptions: Partial<ChartOptions>;
   public stop = true;



  ngOnInit() {


  this.loggedUser = JSON.parse(localStorage.getItem('USER'));

    if (this.loggedUser._id == null) {
      this.router.navigate(['/login']);
    } else {

      this.chartOptions = {
        series: [
          {
            name: 'Velocidad',
            data: this.data,
          }
        ],
        yaxis: {
          min: 0,
          max: 100
        },
        chart: {
          height: 300,
          type: 'area',
        }
      };

      const dur = momentjs.duration();

     this.timeout = setInterval(() => {
          dur.add(1, 'second');
         this.duration = dur.hours() + ':' + dur.minutes() + ':' + dur.seconds() + ' h';
      }, 1000);

    }
  }

  toggleStartStop() {

    this.stop = !this.stop;

    if (!this.stop) {
      let acum = 1;
      this.subscription = this.mqttService.observe('sensor/velocity').subscribe((message: IMqttMessage) => {
        this.distance = (acum * 0.001).toFixed(1);
        this.kmh = message.payload.toString();

        console.log({km: Number(this.kmh), max: this.loggedUser.maxSpeed});

        if (Number(this.kmh) > this.loggedUser.maxSpeed) {

          this.loggedUser.maxSpeed = Number(this.kmh);
        }

          if (Number(this.distance) > this.loggedUser.acumDistance) {
          this.loggedUser.acumDistance = Number(this.distance);
          }

        this.data.push(Number(this.kmh));

        if (this.data.length > 10) {
          this.data.shift();
        }

        this.chartOptions.series = [{
          data: this.data
        }];

        acum++;
      });

      this.ngxTimer.startTimer();

    } else {
      this.subscription.unsubscribe();
      clearInterval(this.timeout);
      clearInterval(this.timer);
      this.ngxTimer.stopTimer();
    }
  }

  logout() {
    this.taskService.logout();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timeout);
  }
}
