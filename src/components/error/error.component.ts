import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

export type ErrorInput = any;

@Component({
    selector: 'error',
    templateUrl: 'error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error {
    @Input() error: ErrorInput;
}