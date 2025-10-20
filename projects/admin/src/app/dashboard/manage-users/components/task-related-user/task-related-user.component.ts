import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../../tasks-admin/services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-related-user',
  templateUrl: './task-related-user.component.html',
  styleUrls: ['./task-related-user.component.scss']
})
export class TaskRelatedUserComponent implements OnInit {
  tasks: any = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public dialogRef: MatDialogRef<TaskRelatedUserComponent>,
    private _service: TasksService,
    private _spanner: NgxSpinnerService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.AllTasksRelatedUser()
  }

  AllTasksRelatedUser() {
    this._service.getAllTasksRelatedUser(this.data.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.tasks = res
      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
