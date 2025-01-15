import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private fakedTransactionList: any[] = [];
  fakedTransactionList$ = new BehaviorSubject(this.fakedTransactionList);

  addNewTransaction(newData: any) {
    this.fakedTransactionList.push(newData);
    this.fakedTransactionList$.next(this.fakedTransactionList);
  }

  getTransactionDetail(id: number) {
    return this.fakedTransactionList.find((item) => item.id === id);
  }

  updateTransactionStatus(id: number, status: number) {
    this.fakedTransactionList = this.fakedTransactionList.map((item) => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    });
    this.fakedTransactionList$.next(this.fakedTransactionList);
  }
}
