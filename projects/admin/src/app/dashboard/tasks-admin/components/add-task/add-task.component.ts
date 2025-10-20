import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  users: any[] = []
  newTaskForm!: FormGroup
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private _service: TasksService,
    private _UserService: UsersService,
    private _toaster: ToastrService,
  ) { }


  ngOnInit(): void {
    this.createFrom()
    this.GetAllUsers()
  }
  GetAllUsers() {
    this._UserService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users
        console.log(res);

      }, error: err => {
        console.log();

      }
    })
  }
  createFrom() {
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      userId: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
    })
  }
  selectImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // console.log('Selected file:', file.name);
    }
    this.newTaskForm.get('image')?.setValue(file)
    console.log(event);
  }

  createTask() {
    let model = this.prepareFormData()
    this._service.cteateTask(model).subscribe({
      next: (res:any) => {
        this.dialog.close()
        this._toaster.success(res.massage, 'success');
        
      },
      error: (err) => {
        console.error('❌ Error:', err);
      }
    });
  }

  prepareFormData() {
    // ⏰ تنسيق التاريخ في dd-mm-yyyy
    const deadlineDate = new Date(this.newTaskForm.value.deadline);
    const formattedDeadline = `${String(deadlineDate.getDate()).padStart(2, '0')}-${String(deadlineDate.getMonth() + 1).padStart(2, '0')}-${deadlineDate.getFullYear()}`;
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, formattedDeadline)
        // formData.append(key, value)
      } else {
        formData.append(key, value)
      }
    })
    return formData
  }



}
