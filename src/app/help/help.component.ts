import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  preview: object = {};

  step = 0;

  constructor() { }

  ngOnInit() {
  }

  togglePreview(i: number) {
    this.preview[i] = !this.preview[i];
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
