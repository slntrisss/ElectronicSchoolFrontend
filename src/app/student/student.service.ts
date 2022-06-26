import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Student} from "./student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiURL = 'http://localhost:8080/student';
  constructor(private http: HttpClient) { }

  getListOfStudents() : Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiURL}/list`)
  }

  saveStudent(student: Student) : Observable<Student>{
    return this.http.post<Student>(`${this.apiURL}/save`, student)
  }

  deleteStudent(studentId: number) : Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/delete/${studentId}`)
  }

  updateStudent(student: Student) : Observable<Student>{
    return this.http.put<Student>(`${this.apiURL}/update`, student)
  }
}
