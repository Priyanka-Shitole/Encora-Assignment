import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Contacts {
  firstName: string;
  lastName: string;
  phone: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  form: FormGroup;
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Contacts, private formBuilder: FormBuilder,) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
  }

  doAction() {
    console.log('this.local_data', this.local_data);
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}