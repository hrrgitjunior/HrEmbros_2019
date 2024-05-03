import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'interactive-image3D-modal',
  templateUrl: './interactiveImage3D.modal.component.html'
})
export class InteractiveImage3DModalComponent implements OnInit {

  @Input() modal_title;
  @Input() modal_content;


  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
