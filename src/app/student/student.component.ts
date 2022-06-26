import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentService} from "./student.service";
import {Student} from "./student";
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Action} from "./enum/action.enum";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public students : Student[] | undefined;
  public UserAction = Action;
  public studentToBeUpdated: Student | undefined;
  public studentToBeDeleted: Student | undefined;
  public loginPage = 'http://localhost:4200';
  enteredSearchValue: string = ''
  @Output()
  searchTextChanged = new EventEmitter<string>();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  public getStudents() : void {
    this.studentService.getListOfStudents().subscribe(
      response => {
        this.students = response
        console.log(response)
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    )
  }

  public saveStudent(form: NgForm) : void {
    let closeBtn = document.getElementById('add-student')
    if(closeBtn !== null)
      closeBtn.click()
    this.studentService.saveStudent(form.value)
      .subscribe(
        response => {
          console.log(response)
          this.getStudents()
          form.reset()
        },
        (error: HttpErrorResponse) =>{
          console.log(error)
          form.reset()
        }
      )
  }

  public deleteStudent(studentId: number) : void {
    let closeBtn = document.getElementById('delete-student')
    if(closeBtn !== null)
      closeBtn.click()
    this.studentService.deleteStudent(studentId)
      .subscribe(
        response => {
          console.log(response)
          this.getStudents()
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }

  public updateStudent(student: Student) : void {
    console.log(student.id)
    this.studentService.updateStudent(student)
      .subscribe(
        response => {
          console.log(response)
          this.getStudents()
        },
        (error: HttpErrorResponse) => {
          console.log(error)
          this.getStudents()
        }
      )
  }

  public openModal(student: Student, userAction: Action) : void {
    if(userAction === Action.DELETE){
      this.studentToBeDeleted = student;
    }
    if(userAction === Action.EDIT){
      this.studentToBeUpdated = student;
    }
  }

  public searchStudents(searchText: string): void {
    console.log(searchText);
    const results: Student[] = [];
    if(this.students !== undefined) {
      for (const student of this.students) {
        if (student.firstName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          || student.lastName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          || student.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          || student.faculty.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          || student.program.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          results.push(student);
        }
      }
      this.students = results;
      if (results.length === 0 || !searchText) {
        this.getStudents();
      }
    }
  }
}
