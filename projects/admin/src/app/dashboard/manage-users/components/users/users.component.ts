import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { TaskRelatedUserComponent } from '../task-related-user/task-related-user.component';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'email', 'status', 'tasksAssigned', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private service: UsersService,
    private _toastr: ToastrService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getAlluers()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // ✅ تأكد أن الباجينيتور اتربط بعد الريندر
  }
  getAlluers() {

    this.service.getAllUsers().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.users.map((user: any) => ({
          ...user,
          name: user.username,
          tasksAssigned: user.assignedTasks, // 🔁 إعادة التسمية
        }));
        // ✅ اتأكد أن paginator متربط بعد تحميل البيانات
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.dataSource.paginator = this.paginator; // 👈 ربط الجدول بالـ paginator
        this._toastr.success('success')
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  applyfilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase()
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // search username column in table
      return (
        data.username.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter)
      )
    }
    this.dataSource.filter = filterValue;
    // search all column in table
    // this.dataSource.filter = filterValue.trim().toLowerCase()
  }


  openDialog(component: any, width: string = '750px', data: any = null) {
    const dialogRef = this.dialog.open(component, {
      width,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAlluers(); // 🔁 إعادة تحميل المستخدمين
      }
    });
  }

  addNewUser() {
    this.openDialog(AddUserComponent, "750px");
  }
  updateUserStatus(id: string) {
    this.openDialog(UpdateUserComponent, '750px', { id })
  }
  getAllTasksRelatedUser(id: string) {
    this.openDialog(TaskRelatedUserComponent, '750px', { id })
  }
  deleteUser(id: string) {
    this.service.deleteUser(id).subscribe({
      next: (res: any) => {
        this._toastr.success(res.massage, 'success')
        this.getAlluers()
      }, error: (err) => {
      }
    })
  }

}
