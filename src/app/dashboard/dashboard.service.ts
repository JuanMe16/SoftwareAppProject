import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../interface/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private students: Student[] = [];
  private publishedStudents: string[] = [];

  constructor(
    private firestoreService: AngularFirestore,
    private storageService: StorageService
  ) { }

  async signOut() {
    await this.storageService.set('dni', '');
    await this.storageService.set('password', '');
  }

  async addStudent(newStudent: Student) {
    if (this.students.includes(newStudent)) return 'Este estudiante ya ha sido añadido.';
    this.students.push(newStudent);
    this.saveStudents();
    return 'Estudiante añadido!';
  }

  async deleteStudent(student: Student) {
    this.students = this.students.filter((v) => v !== student ? v : null);
    this.saveStudents();
  }

  async saveStudents() {
    await this.storageService.set('students', this.students);
  }

  async isPublished() {
    return this.publishedStudents;
  }

  confirmStudents() {
    this.publishedStudents.forEach(async (v) => {
      await this.firestoreService.collection('Carrils').doc(v).delete();
    });
    this.storageService.set('published', []);
    this.publishedStudents = [];
  }

  async publishStudents(carril: string) {
    for (const student of this.students) {
      const studentToPublish = { ...student, number: carril }
      const createdDoc = await this.firestoreService.collection('Carrils').add(studentToPublish);
      this.publishedStudents.push(createdDoc.id);
    }
    this.storageService.set('published', this.publishedStudents);
  }

  async getCurrentStudents() {
    this.students = await this.storageService.get('students') || [];
    this.publishedStudents = await this.storageService.get('published') || [];
    return this.students;
  }
}
