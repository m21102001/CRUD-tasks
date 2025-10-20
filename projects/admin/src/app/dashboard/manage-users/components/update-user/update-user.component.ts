import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { UpdateUserStatusModel } from '../../context/DOT';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _service: UsersService,
    private _toastr: ToastrService,
  ) { }

  myControl = new FormControl('');
  options: string[] = ['active', 'In-Active'];;
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updateUsrStatus() {
    if (!this.myControl.value) {
      this._toastr.warning('Please select a status');
      return;
    }

    const model: UpdateUserStatusModel = {
      id: this.data.id,          // ✅ من الـ dialog data
      status: this.myControl.value // ✅ القيمة المختارة
    };
    this._service.UpdateUserStatus(model).subscribe({
      next: (res: any) => {
        this._toastr.success('success', 'error')

      }, error: (err) => {
      }
    })
  }
}
