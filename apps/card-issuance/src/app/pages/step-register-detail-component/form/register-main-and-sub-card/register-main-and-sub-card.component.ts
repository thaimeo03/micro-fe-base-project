import { Component } from '@angular/core';
import { FeeCollectionComponent } from '../fee-collection/fee-collection.component';
import { RegisterMainCardComponent } from '../register-main-card/register-main-card.component';
import { RegisterSubCardComponent } from '../register-sub-card/register-sub-card.component';

@Component({
  standalone: true,
  selector: 'app-register-main-and-sub-card',
  imports: [
    RegisterMainCardComponent,
    RegisterSubCardComponent,
    FeeCollectionComponent,
  ],
  templateUrl: './register-main-and-sub-card.component.html',
  styleUrls: ['./register-main-and-sub-card.component.less'],
})
export class RegisterMainAndSubCardComponent {}
