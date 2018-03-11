import { Component, OnInit, OnDestroy } from '@angular/core';
import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
    selector: 'app-error',
    template: `
    <div class="backdrop" [ngStyle]="{'display' : display}" > </div>
    <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display' : display}">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">{{error?.title}}</h4>
                </div>
                <div class="modal-body">
                <p>{{error?.message}}</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-default" (click)="errorHandled()" >Close</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
`,
    styles : [`
        .backdrop{
            background-color : rgba(0,0,0,0.6);
            display : none;
            position : fixed;
            width : 100%;
            height : 100vh;
            top : 0;
            left : 0;
            z-index : 999;
        }
    `]
})

export class ErrorComponent implements OnInit,OnDestroy {
    error:Error;
    display = 'none';
    constructor(
        private errorService:ErrorService
    ) { }

    ngOnInit() { 
        this.errorService.errorOccured.subscribe(
            (error:Error)=>{this.error=error; this.display='block'}
        )
    }

    errorHandled(){
        this.display= null;
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.errorService.errorOccured.unsubscribe();
    }
}