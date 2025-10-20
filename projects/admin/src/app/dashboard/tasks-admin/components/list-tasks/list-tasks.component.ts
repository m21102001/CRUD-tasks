import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DetailsTaskComponent } from '../details-task/details-task.component';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, Subject } from 'rxjs';


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([])
  displayedColumns: string[] = ['position', 'title', 'user', 'deadLineDate', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tasksFilter!: FormGroup
  users: any = []
  status: any = [{ name: "In-Progress" }, { name: 'Complete' }]
  searchSubject = new Subject<string>()
  filteration: any = {}
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _service: TasksService,
    private _toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.createform()
    this.searchSubject.pipe(debounceTime(1000)).subscribe((value: any) => {
      this.filteration.keyword = value
      this.getAllTasks()
    })
    this.getAllTasks()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // ✅ تأكد أن الباجينيتور اتربط بعد الريندر
  }

  search(value: string) {
    this.searchSubject.next(value);
  }
  filterUserName(event: any) {
    this.filteration['userId'] = event
    this.getAllTasks()

  }
  filterStatus(event: any) {
    this.filteration['status'] = event
    this.getAllTasks()
  }
  selectDate(event: any, typed: any) {
    if (event) {
      const day = String(event.getDate()).padStart(2, '0');
      const month = String(event.getMonth() + 1).padStart(2, '0');
      const year = event.getFullYear();
      this.filteration[typed] = `${day}-${month}-${year}`;
    }
    // this.filteration[typed] = event.format('DD-MM-YYYY')
    if (typed === 'toDate' && this.filteration['toDate'] && this.filteration['fromDate']) {
      this.getAllTasks()
    }
  }
  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: ['']
    })
  }

  getAllTasks() {
    this._service.getAllTasks(this.filteration).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.tasks.map((tasks: any) => ({
          ...tasks,
          user: tasks?.userId?.username,
          deadLineDate: tasks.deadline
        }))
        this.users = this.dataSource.data
          .map(task => task.userId) // خُد object المستخدم
          .filter(
            (user, index, self) => user && index === self.findIndex(u => u._id === user._id)
          )

        //  this.dataSource.filterPredicate = (data, filter) => {
        //     // Transform the data into a lowercase string of all property values.
        //     const dataStr = Object.keys(data)
        //       .reduce((currentTerm, key) => {
        //         // Use an obscure Unicode character to delimit the words in the concatenated string.
        //         // This avoids matches where the values of two columns combined will match the user's query
        //         // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
        //         // that has a very low chance of being typed in by somebody in a text field. This one in
        //         // particular is "White up-pointing triangle with dot" from
        //         // https://en.wikipedia.org/wiki/List_of_Unicode_characters
        //         return currentTerm + data[key] + '◬';
        //       }, '')
        //       .toLowerCase();
        //     // Transform the filter by converting it to lowercase and removing whitespace.
        //     const transformedFilter = filter.trim().toLowerCase();
        //     return dataStr.indexOf(transformedFilter) != -1;
        //   };

        this._toastr.success('success')
      },
      error: err => {
      }
    })
  }

  openDialog(component: any, width: string = '750px', data: any = null) {
    const dialogRef = this.dialog.open(component, {
      width,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
  addTask() {
    this.openDialog(AddTaskComponent, '750px')
  }
  detailsTask(id: string) {
    this.openDialog(DetailsTaskComponent, '750px', { id })
  }
  UpdateStatusTask(id: string) {
    const model = { id }
    this._service.UpdateStatusTask(model).subscribe({
      next: (res: any) => {
        this.getAllTasks()
      }, error: err => console.log(err)
    })
  }
  deleteTask(id: any) {
    this._service.deleteTask(id).subscribe({
      next: (res: any) => {
        this._toastr.success(res.massage, "succecc")
        this.getAllTasks()
        console.log(res);
      }, error: err => {
      }
    })
  }
}
