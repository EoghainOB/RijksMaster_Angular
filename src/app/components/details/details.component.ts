import { Component, Input } from '@angular/core';
import { IData } from 'src/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  @Input() data?: IData;
}
