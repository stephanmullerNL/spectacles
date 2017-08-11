import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() value: string;
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
