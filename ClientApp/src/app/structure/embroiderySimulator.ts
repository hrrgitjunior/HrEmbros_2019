import { Component } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ChoiceEmbColorModalComponent } from './choice.embcolor.modal';


@Component({
    selector: "embroidery-simulator",
    templateUrl: "./embroiderySimulator.component.html",
    styleUrls: ['./choice.embcolor.component.scss']
})

export class EmbroiderySimulatorComponent {
    flLoading: boolean = false;
    private cx: CanvasRenderingContext2D;
    closeResult: string;
    modalOptions: NgbModalOptions;
    intervalId: any = 0;
    fl_run: boolean = false;
    needles_15: string[] = [
        '#005592',
        '#FFBC16',
        '#008B87',
        '#C5ADC5',
        '#892533',
        '#00874F',
        '#ED532A',
        '#413F79',
        '#4F6B80',
        '#E86276',
        '#927038',
        '#588773',
        '#E4BA82',
        '#8F7154',
        '#8B796C',
        '#C2C4BF',
    ];
    canvasEl: HTMLCanvasElement = null;

    constructor(private repo: Repository,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private modalService: NgbModal,
        private location: Location) {
        this.modalOptions = {
            //backdrop: 'static'
            //backdropClass: 'customBackdrop'
        }
    }

  open(needle_index) {
        const modalRef = this.modalService.open(ChoiceEmbColorModalComponent);
/*        modalRef.componentInstance.modal_title = 'I your title';
        modalRef.componentInstance.modal_content = 'I am your content';*/
/*        modalRef.result.then((color) => {
            this.needles_15[needle_index] = color;
            this.drawEmbStitches(this.canvasEl);
        });*/
        modalRef.result.then((color) => {
          this.needles_15[needle_index] = color;
          this.drawEmbStitches(this.canvasEl);
        }, () => { });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    ngOnInit() {
        let id = Number.parseInt(this.activeRoute.snapshot.params["id"]);
        this.fetch_stitches(id);
    }

    fetch_stitches(id: number) {
        this.repo.fetch_stitches(id);
    }

  get isLoadedStitches(): boolean {
        return this.repo.isLoadedStitches;
    }

    public get_offsets(width: number, height: number, sz_x, sz_y: number, kz: number) {
        let offs_x: number = 0;
        let offs_y: number = 0;
        if ((sz_x * kz) < width) {
            offs_x = (width - sz_x * kz) / 2;
        } else {
            offs_y = (height - sz_y * kz) / 2;
        }
        return { x: offs_x, y:offs_y};
    }
    // Event is an const embCanvas: HTMLCanvasElement = this.canvas.nativeElement;
    // in embCanvs.ts
  public drawEmbStitches(event) {
        this.canvasEl = event;
        let ctx: CanvasRenderingContext2D;
        ctx = event.getContext('2d');

        let kx: number = event.width / this.repo.embTitle.Sz_x;
        let ky: number = event.height / this.repo.embTitle.Sz_y;
        let kz: number = kx;
        if (ky < kx) kz = ky;
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, event.width, 600);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        //ctx.rect(0, 0, event.width, 600);
        //ctx.stroke();

        let ax: number = this.repo.embTitle.AbsSP.x * kz;
        let ay: number = this.repo.embTitle.AbsSP.y * kz;

        let prev_ax: number = ax;
        let prev_ay: number = ay;

        let offsets: any = this.get_offsets(event.width, event.height,
            this.repo.embTitle.Sz_x, this.repo.embTitle.Sz_y, kz);

        let offs_x = offsets.x;
        let offs_y = offsets.y;

        let needle_index = 0;
        let needles_15: string[] = this.needles_15;

        ctx.moveTo(offs_x + ax, 600 - offs_y - ay);
        ctx.stroke();

        this.repo.embStitches.forEach(function (st) {
        switch (st.cmn) {
            case 64: {
                ctx.strokeStyle = needles_15[needle_index];
                needle_index++;
                break;
            }
            case 0:
                {
                    prev_ax = ax; prev_ay = ay;
                    ax += st.rx * kz;
                    ay += st.ry * kz;
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(offs_x + prev_ax, 600 - offs_y- prev_ay);
                    ctx.lineTo(offs_x + ax, 600 - offs_y- ay);
                    ctx.stroke();
                    break;
                }

            case 128:
                {
                    prev_ax = ax; prev_ay = ay;
                    ax += st.rx * kz;
                    ay += st.ry * kz;
                    ctx.beginPath();
                    ctx.setLineDash([2, 15]);
                    ctx.moveTo(offs_x + prev_ax, 600 - offs_y - prev_ay);
                    ctx.lineTo(offs_x + ax, 600 - offs_y - ay);
                    ctx.stroke();
                    break;
                }

        }
    });
    }


    public slaw_draw_stitches(ctx, interval,  idx, kz, offs_x, offs_y) {
        let ax: number = this.repo.embTitle.AbsSP.x * kz;
        let ay: number = this.repo.embTitle.AbsSP.y * kz;

        let prev_ax: number = ax;
        let prev_ay: number = ay;

        let needle_index = 0;
        let needles_15: string[] = this.needles_15;


        this.intervalId =
        setInterval(() => {
            idx++;
            //console.log(idx, interval);
            if ((idx >= this.repo.embStitches.length) || (!this.fl_run)) {
                clearInterval(this.intervalId);
                this.drawEmbStitches(this.canvasEl);
            }
            else {
                var st = this.repo.embStitches[idx];
                switch (st.cmn) {
                    case 64: {
                        ctx.strokeStyle = needles_15[needle_index];
                        needle_index++;
                        break;
                    }
                    case 0:
                        {
                            prev_ax = ax; prev_ay = ay;
                            ax += st.rx * kz;
                            ay += st.ry * kz;
                            ctx.beginPath();
                            ctx.setLineDash([]);
                            ctx.moveTo(offs_x + prev_ax, 600 - offs_y-prev_ay);
                            ctx.lineTo(offs_x + ax, 600 - offs_y-ay);
                            ctx.stroke();
                            break;
                        }

                    case 128:
                        {
                            prev_ax = ax; prev_ay = ay;
                            ax += st.rx * kz;
                            ay += st.ry * kz;
                            ctx.beginPath();
                            ctx.setLineDash([2, 15]);
                            ctx.moveTo(offs_x + prev_ax, 600 - offs_y - prev_ay);
                            ctx.lineTo(offs_x + ax, 600 - offs_y - ay);
                            ctx.stroke();
                            break;
                        }

                }
            }
        }, interval)
}


  public run_stitches() {
      this.fl_run = true;
      let ctx: CanvasRenderingContext2D;
      ctx = this.canvasEl.getContext('2d');

      let kx: number = this.canvasEl.width / this.repo.embTitle.Sz_x;
      let ky: number = this.canvasEl.height / this.repo.embTitle.Sz_y;
      let kz: number = kx;
      if (ky < kx) kz = ky;
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, this.canvasEl.width, 600);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "red";
      let ax: number = this.repo.embTitle.AbsSP.x * kz;
      let ay: number = this.repo.embTitle.AbsSP.y * kz;

      let offsets: any = this.get_offsets(this.canvasEl.width, this.canvasEl.height,
                          this.repo.embTitle.Sz_x, this.repo.embTitle.Sz_y, kz);

      let offs_x = offsets.x;
      let offs_y = offsets.y;

      this.slaw_draw_stitches(ctx, 10, -1, kz, offs_x, offs_y);
}


  public stop_stitches() {
    this.fl_run = false;
}

}

