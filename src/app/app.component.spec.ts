import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { AppComponent } from './app.component';
import { ContactsService } from './Services/contacts.service';
export interface Contacts {
  firstName: string;
  lastName: string;
  phone: string;
  id: number;
}
export class MatDialogStub {
  result = true;

  setResult(val: boolean) {
    this.result = val;
  }

  open() {
    return { afterClosed: () => of(this.result) };
  }
  afterClosed() {
    return of(true);
  }
}
fdescribe('AppComponent', () => {
  let component: AppComponent;
  let contactsService;
  let element;
  const dialogStub = new MatDialogStub();
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientModule
      ],
      providers: [ContactsService, { provide: MatDialog, useValue: dialogStub }],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(inject([ContactsService], (s: any) => {
    contactsService = s;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'contact-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });


  it('should update row data', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const row_obj = {
      data:
      {
        action: "Add",
        firstName: "Gaurav",
        lastName: "Gupta",
        phone: "7002873284",
        id: 1
      },
      event: "Add"
    }
    let result = component.updateRowData(row_obj);
    component.dataSource = component.dataSource.filter((value: any) => {
      expect(value.id).toEqual(row_obj.data.id)
      expect(value.firstName).toEqual(row_obj.data.firstName);
      expect(value.lastName).toEqual(row_obj.data.lastName);
      expect(value.phone).toEqual(row_obj.data.phone);
      return true;
    });
    
  });

  it("should call getUsers and return list of users", async(function (done: any) {
    // Arrange
    let response: Contacts[] = [{
      "firstName": "Amit",
      "lastName": "Roy",
      "phone": "9876543210",
      "id": 1
    },
    {
      "firstName": "Aakash",
      "lastName": "Choudhury",
      "phone": "9876584431",
      "id": 2
    },
    {
      "firstName": "Arun",
      "lastName": "Dey",
      "phone": "5748493812",
      "id": 3
    },
    {
      "firstName": "Vikash",
      "lastName": "Trivedi",
      "phone": "9873625261",
      "id": 4
    },
    {
      "firstName": "Gaurav",
      "lastName": "Gupta",
      "phone": "7002873284",
      "id": 5
    }];

    // Act
    component.getContacts();

    fixture.detectChanges();
    fixture.whenStable().then((res: any) => {
      expect(component.dataSource).toEqual(response);
      // done();
    });
  }));

  it('test open Dialog', () => {
    const action = 'Add'
    const obj = {
      "firstName": "Gaurav",
      "lastName": "Gupta",
      "phone": "7002873284",
      "id": 5
    }
    spyOn(dialogStub, 'open').and.returnValue({ afterClosed: () => of(true) });
    component.openDialog(action, obj);
    expect(dialogStub.open).toHaveBeenCalled();
    dialogStub.afterClosed().subscribe((result: any) => {
      result = {
        event: 'Add',
        data: {
          "firstName": "Gaurav",
          "lastName": "Gupta",
          "phone": "7002873284",
          "id": 5
        }
      }
      expect(result.event).toEqual('Add');
      // expect(component.addRowData).toHaveBeenCalled();
      // spyOn(component, 'addRowData').and.callThrough();
      component.addRowData(result);
      fixture.detectChanges();
      expect(component.addRowData).toBeTruthy();

      result = {
        event: 'Update',
        data: {
          "firstName": "Gaurav",
          "lastName": "Gupta",
          "phone": "7002873284",
          "id": 5
        }
      }
      expect(result.event).toEqual('Update');
      // expect(component.updateRowData).toHaveBeenCalled();
      // spyOn(component, 'updateRowData').and.callThrough();
      component.updateRowData(result.data);
      fixture.detectChanges();
      expect(component.updateRowData).toBeTruthy();
      result = {
        event: 'Delete',
        data: {
          "firstName": "Gaurav",
          "lastName": "Gupta",
          "phone": "7002873284",
          "id": 5
        }
      }
      expect(result.event).toEqual('Delete')
      component.deleteRowData(result.data);
      fixture.detectChanges();
      expect(component.deleteRowData).toBeTruthy();
      // expect(component.deleteRowData).tobe();
      // spyOn(component, 'deleteRowData').and.callThrough();

    });
  });
  it('test should deleteRowData', () => {
    const obj = {
      "firstName": "Gaurav",
      "lastName": "Gupta",
      "phone": "7002873284",
      "id": 5
    }
    component.deleteRowData(obj);
    spyOn(component, 'deleteRowData').and.returnValue();
    expect(component.deleteRowData(obj)).toEqual();
  });
  it('test should updateRowData', () => {
    const obj = {
      "firstName": "Gaurav",
      "lastName": "Gupta",
      "phone": "7002873284",
      "id": 5
    }
    let result = component.updateRowData(obj);
    component.dataSource = component.dataSource.filter((value: any) => {
      expect(value.id).not.toEqual(obj.id);
    });
  });
});
