
import { ContactsService } from './Services/contacts.service';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface Contacts {
  firstName: string;
  lastName: string;
  phone: string;
  id: number;
}

const ELEMENT_DATA: Contacts[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: any[] = ['id', 'firstName', 'lastName', 'phone', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.getContacts();

  }
  getContacts() {
    this.contactService.getContacts().subscribe((res: any) => {
      this.dataSource = res;
    })
  }

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(public dialog: MatDialog, private contactService: ContactsService) { }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '265px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    this.dataSource.push({ 'id': this.dataSource.length + 1, 'firstName': row_obj.data.firstName, 'lastName': row_obj.data.lastName, 'phone': row_obj.data.phone });
    this.table.renderRows();
  }
  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: any) => {
      if (value.id == row_obj.id) {
        value.firstName = row_obj.firstName;
        value.lastName = row_obj.lastName;
        value.phone = row_obj.phone;
      }
      return true;
    });
  }
  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: any) => {
      return value.id != row_obj.id;
    });


  }
}
