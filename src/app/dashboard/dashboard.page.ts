import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { ToastController } from '@ionic/angular';
import { Student } from '../interface/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dashboardOption = 'overview';
  choosedCarril = '1';
  studentSign = { name: '', type: 'Preescolar' };
  sentStudents = false;
  foundStudents: Student[] = [];

  constructor(
    private dashboardService: DashboardService,
    private toastController: ToastController,
    private router: Router
  ) { }

  async loadStudents() {
    const studentsFound = await this.dashboardService.getCurrentStudents();
    this.foundStudents = studentsFound;
  }

  async ngOnInit() {
    await this.loadStudents();
    const uploadedStudents = await this.dashboardService.isPublished();
    if (uploadedStudents[0]) {
      this.sentStudents = true;
    }
  }

  changeDashboardOption(option: 'overview' | 'students') {
    this.dashboardOption = option;
  }

  async deleteStudent(record: Student) {
    await this.dashboardService.deleteStudent(record);
    await this.loadStudents();
  }

  confirmStudents() {
    this.dashboardService.confirmStudents();
    this.sentStudents = false;
  }

  async publishStudents() {
    this.dashboardService.publishStudents(this.choosedCarril);
    const publishedMessage = await this.toastController.create({
      message: 'Se ha enviado la información al colegio!',
      duration: 3000
    });
    this.sentStudents = true;
    publishedMessage.present();
  }

  async saveStudent() {
    const resMessage = await this.dashboardService.addStudent(this.studentSign);
    this.studentSign = { name: '', type: 'Preescolar' };
    const toastMessage = await this.toastController.create({ message: resMessage, duration: 3000 });
    toastMessage.present();
  }

  signOut() {
    this.dashboardService.signOut();
    this.router.navigate(['/auth']);
  }

}
