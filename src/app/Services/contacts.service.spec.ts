import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;
  function setup() {
    const contactsService = TestBed.inject(ContactsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { contactsService, httpTestingController };
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [DialogBoxComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      // providers: [
      //   { provide: MatDialogRef, useValue: mockDialogRef },
      //   { provide: MAT_DIALOG_DATA, useValue: {} },
      // ],
    })
      .compileComponents();
  });

  beforeEach(() => {

    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const service: ContactsService = TestBed.get(ContactsService);
    expect(service).toBeTruthy();
  });

  it('should get ordering provider list', (done) => {
    const { contactsService, httpTestingController } = setup();
    const mockList = [
      {
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
      }
    ]
    // const worklistFilters = new PatientListsSearchFilter();
    contactsService.getContacts().subscribe((data: any) => {
      expect(data.list).toEqual(mockList);
      done();
    });
    const req = httpTestingController.expectOne('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts');
    expect(req.request.method).toBe('GET');
    req.flush({
      list: mockList
    });
  });
});
