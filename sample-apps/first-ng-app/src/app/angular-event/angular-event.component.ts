import { Component, OnInit, Input } from '@angular/core';
import { AngularEvent } from '../angular-event';

@Component({
  selector: 'app-angular-event',
  templateUrl: './angular-event.component.html',
  styleUrls: ['./angular-event.component.scss']
})
export class AngularEventComponent implements OnInit {
  @Input() entry: AngularEvent;


  ngOnInit() {
  }
}
