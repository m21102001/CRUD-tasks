import { Component, Inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.scss']
})
export class DetailsTaskComponent implements OnInit {
  task: any = {}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _service: TasksService,
    public dialogRef: MatDialogRef<DetailsTaskComponent>,
  ) { }

  ngOnInit(): void {
    this.detailsTask();
  }
  detailsTask() {
    this._service.viewDetailsTask(this.data.id).subscribe({
      next: (res: any) => {
        this.task = res?.tasks
        console.log(this.task);
        
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }
}
