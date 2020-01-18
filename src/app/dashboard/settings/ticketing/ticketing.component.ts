import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.css']
})
export class TicketingComponent implements OnInit {
  @Input() id: number;

  loadingData = true;
  savingFormData: boolean;
  categories = [];
  categoriesModal: boolean;
  agentRole: string;
  category: string;
  ticketingEnabled: boolean;

  constructor(private func: AngularFireFunctions) { }

  ngOnInit() {
    const call = this.func.httpsCallable('ticketingLoad');
    call({ server: this.id })
      .subscribe(data => {
        if (data.auth === true) {
          if (data.success === true) {
            this.loadingData = false;
            this.agentRole = data.agentRole,
            this.category = data.category;
            this.ticketingEnabled = true;
            this.categories = data.categories;
          } else {
            this.loadingData = false;
            this.agentRole = '',
            this.category = '';
            this.ticketingEnabled = false;
          }
        } else {
          Swal.fire('Whoops!', 'Authetication Error', 'error');
        }
      });
  }

  updateTicketing(data) {
    this.savingFormData = true;
    const call = this.func.httpsCallable('ticketingSet');
    call({ server: this.id, data: {
      agentRole: data.value.agentRole,
      categories: this.categories,
      category: data.value.category
    } })
    .subscribe(callback => {
      if (callback.success === true) {
        this.savingFormData = false;
        Swal.fire({
          title: 'All done!',
          position: 'bottom',
          // tslint:disable-next-line: quotemark
          text: 'Support is good to go',
          type: 'success',
          toast: true,
          showConfirmButton: false,
          timer: 5000
        });
      }
    });
  }

  openTicketModal() {
    this.categoriesModal = true;
  }

  closeTicketModal() {
    this.categoriesModal = false;
  }

  updateCategories(data) {
    this.categories.push(data.value.categoryName);
  }

  deleteCategory(id){
    const index = this.categories.indexOf(id);
    this.categories.splice(index, 1);
  }

  enableTicketing() {
    this.ticketingEnabled = true;
  }

}
