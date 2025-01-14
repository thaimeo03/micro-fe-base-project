import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private fakedTransactionList: any[] = [
    {
      id: 1,
      cifoffDesc: 'Nguyen Van A',
      acn: '85082',
      oin: '084069000125',
      status: 0,
    },
    {
      id: 2,
      cifoffDesc: 'Nguyen Van B',
      acn: '85082',
      oin: '084069000125',
      status: 0,
    },
    {
      id: 3,
      cifoffDesc: 'Nguyen Van C',
      acn: '85082',
      oin: '084069000125',
      status: 1,
    },
  ];

  fakedTransactionList$ = new BehaviorSubject(this.fakedTransactionList);

  addNewTransaction(newData: any) {
    this.fakedTransactionList.push(newData);
    this.fakedTransactionList$.next(this.fakedTransactionList);
  }
}
