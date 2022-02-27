import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogBoxComponent } from './dialog-box.component';
const mockDialogRef = {
  close: jasmine.createSpy('close')
};
describe('DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogBoxComponent],
      imports: [
        MatDialogModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the function closeDialog to close the dialog', () => {
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
  it('should call the function doAction to close the dialog', () => {
    component.doAction();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstName'].setValue("Priyanka");
    component.form.controls['lastName'].setValue("Shitole");
    component.form.controls['phone'].setValue("1234567890");
    expect(component.form.valid).toBeTruthy();
    component.submit();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
