import { Component, Input, ElementRef, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "emb-canvas",
    template: '<canvas #canvas></canvas>',
    styles: ['canvas { border: 1px solid #000; }']
})

export class EmbCanvasComponent {
  @ViewChild('canvas', { static: false }) public canvas: ElementRef;
  
      @Input() public width = 600;
      @Input() public height = 400;
  
      @Output()
      //drawMethod = new EventEmitter<CanvasRenderingContext2D>();
      drawMethod = new EventEmitter<HTMLCanvasElement>();
  
      private cx: CanvasRenderingContext2D;
  
      constructor(private repo: Repository,
          private router: Router,
          private activeRoute: ActivatedRoute) {
      }
  
      public ngAfterViewInit() {
          const embCanvas: HTMLCanvasElement = this.canvas.nativeElement;
          this.cx = embCanvas.getContext('2d');
  
         // embCanvas.width = this.width;
         // embCanvas.height = this.height;
          embCanvas.style.width = '100%';
          embCanvas.style.height = '100%';
          // ...then set the internal size to match
          embCanvas.width = embCanvas.offsetWidth;
          embCanvas.height = embCanvas.offsetHeight;
  
          /* HERE I AM USING AN EXTERNAL METHOD FROM PARENT COMPONENT */
          this.drawMethod.emit(embCanvas);
      }
  
    /*  private drawOnCanvas() {
          this.cx.moveTo(0,0); 
          this.cx.lineTo(100, 100);
          this.cx.stroke();
      }*/

}

