import { Component } from '@angular/core';
import { FeeCollectionComponent } from '../fee-collection/fee-collection.component';
import { RegisterMainCardComponent } from '../register-main-card/register-main-card.component';
import { RegisterSubCardComponent } from '../register-sub-card/register-sub-card.component';
import { ReceivedAddressFormComponent } from '../received-address/received-address.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register-main-and-sub-card',
  imports: [
    CommonModule,
    RegisterMainCardComponent,
    RegisterSubCardComponent,
    FeeCollectionComponent,
    ReceivedAddressFormComponent,
  ],
  templateUrl: './register-main-and-sub-card.component.html',
  styleUrls: ['./register-main-and-sub-card.component.less'],
})
export class RegisterMainAndSubCardComponent {
  showReceivedAddressFromMainCard = true;
  showReceivedAddressFromSubCard = true;

  onChangeShowReceivedAddress(show: boolean) {
    this.showReceivedAddressFromMainCard = show;
  }
}
