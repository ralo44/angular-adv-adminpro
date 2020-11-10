import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css'
  ]
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fecha = new Date().getFullYear();

}
