/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NumberPickerService } from './number-picker.service';
export class NumberPickerComponent {
    /**
     * @param {?} numberPickerService
     */
    constructor(numberPickerService) {
        this.numberPickerService = numberPickerService;
        this.eventHolder = null;
        this.countInterval = null;
        this.isInputFocused = false;
        this.size = 'md';
        this.customClass = {};
        this.mouseWheel = false;
        this.arrowKeys = true;
        this.inputReadOnly = false;
        this.showUpButton = true;
        this.showDownButton = true;
        this.valueChange = new EventEmitter();
        this.minReached = new EventEmitter();
        this.maxReached = new EventEmitter();
        this.pickStarted = new EventEmitter();
        this.pickStoped = new EventEmitter();
        this.pickUpStarted = new EventEmitter();
        this.pickUpStoped = new EventEmitter();
        this.pickDownStarted = new EventEmitter();
        this.pickDownStoped = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initPicker();
    }
    /**
     * @return {?}
     */
    isHorizontal() {
        return (this.buttonsOrientation !== 'v' && this.buttonsOrientation !== 'vertical');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocus(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isInputFocused = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onBlur(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isInputFocused = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseWheel(event) {
        if (this.isInputFocused) {
            event.preventDefault();
            /** @type {?} */
            let wheelUp = null;
            /** @type {?} */
            let delta = null;
            if (event.deltaY) {
                delta = event.deltaY / 60;
            }
            if (event.detail) {
                delta = -event.detail / 2;
            }
            if (delta !== null) {
                wheelUp = delta > 0;
            }
            this.afterMouseWheels(wheelUp, event);
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @param {?} wheelUp
     * @param {?} event
     * @return {?}
     */
    afterMouseWheels(wheelUp, event) {
        this.onPickStarted(wheelUp);
        if (wheelUp) {
            this.onIncrease(event);
        }
        else {
            this.onDecrease(event);
        }
        this.onPickStoped(wheelUp);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChange(event) {
        if (this.value > this.max) {
            this.value = this.max;
        }
        else if (this.value < this.min) {
            this.value = this.min;
        }
        if (isFinite(this.value)) {
            this.valueChange.emit(this.value);
        }
        else {
            this.valueChange.emit(null);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDecrease(event) {
        event.preventDefault();
        if (this.canDecrease()) {
            this.value = this.round((this.value > this.min) ? this.value -= this.step : this.value);
            this.valueChange.emit(this.value);
        }
        else {
            this.minReached.emit(true);
        }
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onIncrease(event) {
        event.preventDefault();
        if (this.canIncrease()) {
            this.value = this.round((this.value < this.max) ? this.value += this.step : this.value);
            this.valueChange.emit(this.value);
        }
        else {
            this.maxReached.emit(true);
        }
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @param {?=} increase
     * @return {?}
     */
    onMouseDown(event, increase = true) {
        this.afterMouseDown(increase, event);
    }
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    isArrowUpDown(keyCode) {
        return keyCode === 38 || keyCode === 40;
    }
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    isArowUp(keyCode) {
        return keyCode === 38;
    }
    /**
     * @private
     * @param {?} increase
     * @param {?} event
     * @return {?}
     */
    loopPick(increase, event) {
        this.onPickStarted(increase);
        this.eventHolder = setTimeout((/**
         * @return {?}
         */
        () => {
            this.countInterval = setInterval((/**
             * @return {?}
             */
            () => {
                if (increase) {
                    this.onIncrease(event);
                }
                else {
                    this.onDecrease(event);
                }
            }), this.pickTimer);
        }), this.pickStartAfter);
    }
    /**
     * @param {?} event
     * @param {?=} increase
     * @return {?}
     */
    onMouseUp(event, increase = true) {
        this.afterMouseUp(increase, event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (this.isArrowUpDown(event.keyCode)) {
            event.preventDefault();
            if (!this.eventHolder) {
                this.loopPick(this.isArowUp(event.keyCode), event);
            }
        }
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyUp(event) {
        if (this.isArrowUpDown(event.keyCode)) {
            event.preventDefault();
            this.afterPick(this.isArowUp(event.keyCode));
        }
        event.stopPropagation();
    }
    /**
     * @private
     * @param {?} up
     * @param {?} event
     * @return {?}
     */
    afterMouseDown(up, event) {
        event.preventDefault();
        if (this.isLeftClick(event.which)) {
            this.loopPick(up, event);
        }
        event.stopPropagation();
    }
    /**
     * @private
     * @param {?} up
     * @param {?} event
     * @return {?}
     */
    afterMouseUp(up, event) {
        event.preventDefault();
        this.afterPick(up);
        event.stopPropagation();
    }
    /**
     * @private
     * @param {?} up
     * @return {?}
     */
    afterPick(up) {
        this.onPickStoped(up);
        this.clearTimers();
    }
    /**
     * @private
     * @return {?}
     */
    clearTimers() {
        clearTimeout(this.eventHolder);
        clearInterval(this.countInterval);
        this.eventHolder = null;
        this.countInterval = null;
    }
    /**
     * @private
     * @param {?} up
     * @param {?} event
     * @param {?} start
     * @return {?}
     */
    afterArrowKeysPressed(up, event, start) {
        if (start) {
            this.loopPick(up, event);
        }
        else {
            this.afterPick(up);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseVal(value) {
        if (typeof value === 'number') {
            return value;
        }
        return parseFloat(value);
    }
    /**
     * @private
     * @param {?} step
     * @return {?}
     */
    getPrecision(step) {
        return /\d*$/.exec(String(step))[0].length;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    round(value) {
        return value === null ? null : Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
    }
    /**
     * @private
     * @return {?}
     */
    canIncrease() {
        /** @type {?} */
        const canIncrease = (this.value <= this.max - this.step);
        if (!canIncrease) {
            this.value = this.max;
        }
        return canIncrease;
    }
    /**
     * @private
     * @return {?}
     */
    canDecrease() {
        /** @type {?} */
        const canDecrease = (this.value >= this.min + this.step);
        if (!canDecrease) {
            this.value = this.min;
        }
        return canDecrease;
    }
    /**
     * @private
     * @param {?} increase
     * @return {?}
     */
    onPickStarted(increase) {
        if (increase) {
            if (this.canIncrease()) {
                this.pickStarted.emit(true);
                this.pickUpStarted.emit(true);
            }
        }
        else {
            if (this.canDecrease()) {
                this.pickStarted.emit(true);
                this.pickDownStarted.emit(true);
            }
        }
    }
    /**
     * @private
     * @param {?} increase
     * @return {?}
     */
    onPickStoped(increase) {
        if (increase) {
            if (this.canIncrease()) {
                this.pickUpStoped.emit(true);
                this.pickStoped.emit(true);
            }
        }
        else {
            if (this.canDecrease()) {
                this.pickDownStoped.emit(true);
                this.pickStoped.emit(true);
            }
        }
    }
    /**
     * @private
     * @param {?} witch
     * @return {?}
     */
    isLeftClick(witch) {
        return witch === 1;
    }
    /**
     * @private
     * @return {?}
     */
    initPicker() {
        this.min = isFinite(this.value) ? this.parseVal(this.min) : this.numberPickerService.min;
        this.max = isFinite(this.value) ? this.parseVal(this.max) : this.numberPickerService.max;
        this.step = this.parseVal(this.step) || this.numberPickerService.step;
        this.value = isFinite(this.value) ? this.parseVal(this.value) : this.numberPickerService.value;
        this.pickStartAfter = this.parseVal(this.pickStartAfter) || this.numberPickerService.pickStartAfter;
        this.pickTimer = this.parseVal(this.pickTimer) || this.numberPickerService.pickTimer;
        this.precision = this.getPrecision(this.step) || this.numberPickerService.precision;
        this.value = this.round(this.value);
        this.placeholder = this.placeholder !== undefined ? this.placeholder : '';
    }
}
NumberPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-number-picker',
                template: `
  <div class="input-group mb-3 input-{{size}} {{customClass.container}}">
  <!-- Horizontal decrease button orientation -->
  <div class="input-group-prepend" *ngIf="isHorizontal() && showDownButton">
    <span class="input-group-text decrease {{customClass.down}}" (click)="onDecrease($event)"
    (mouseup)="onMouseUp($event, false)" (mousedown)="onMouseDown($event, false)">-</span>
  </div>
  <!-- Input prefix -->
  <div *ngIf="prefix" class="input-group-prepend">
    <span class="input-group-text {{customClass.prefix}}">{{prefix}}</span>
  </div>
  x<input type="number" class="form-control" name="input-spin-val"
  [(ngModel)]="value"
  [readOnly]="inputReadOnly"
  (blur)="onBlur($event)"
  (focus)="onFocus($event)"
  (mousewheel)="mouseWheel && onMouseWheel($event)"
  (keyup)="arrowKeys && onKeyUp($event)"
  (keydown)="arrowKeys && onKeyDown($event)"
  (keydown.arrowup)="arrowKeys && onIncrease($event)"
  (keydown.arrowdown)="arrowKeys && onDecrease($event)"
  (change)="onValueChange($event)"
  [placeholder]="placeholder"
  >
  <!-- Input postfix -->
  <div *ngIf="postfix" class="input-group-prepend">
    <span class="input-group-text {{customClass.postfix}}" [style.borderLeft]="'0'">{{postfix}}</span>
  </div>
  <!-- Horizontal increase button orientation -->
  <div class="input-group-prepend" *ngIf="isHorizontal() && showUpButton">
    <span class="input-group-text increase {{customClass.up}}" [style.borderLeft]="(!postfix) ? '0' : ''" (click)="onIncrease($event)"
    (mouseup)="onMouseUp($event)" (mousedown)="onMouseDown($event)">+</span>
  </div>
  <!-- Vertical buttons orientation -->
  <div class="input-group-append" *ngIf="!isHorizontal()">
    <span class="input-group-text vertical p-0">
      <span *ngIf="showUpButton" class="{{customClass.up}}" (click)="onIncrease($event)" (mouseup)="onMouseUp($event)"
      (mousedown)="onMouseDown($event)">+</span>
      <span *ngIf="showDownButton" class="{{customClass.down}}" (click)="onDecrease($event)" (mouseup)="onMouseUp($event, false)"
      (mousedown)="onMouseDown($event, false)">-</span>
    </span>
  </div>
</div>
  `,
                styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.decrease:hover,.increase:hover{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;background-color:#d8d8d8}.increase{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important}.vertical{display:flex;justify-content:center;flex-direction:column;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vertical span{line-height:15px}.input-md .vertical span,.input-sm .vertical span{padding:2px 10px}.input-lg .vertical span{padding:4px 10px}.input-xlg .vertical span{padding:7px 10px}.input-md,.input-medium{height:45px}.input-large,.input-lg{height:50px}.input-xlarge,.input-xlg{height:75px}.input-md input,.input-md span,.input-medium input,.input-medium span{font-size:22px}.input-large input,.input-large span,.input-lg input,.input-lg span{font-size:25px}.input-xlarge input,.input-xlarge span,.input-xlg input,.input-xlg span{font-size:38px}"]
            }] }
];
/** @nocollapse */
NumberPickerComponent.ctorParameters = () => [
    { type: NumberPickerService }
];
NumberPickerComponent.propDecorators = {
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    value: [{ type: Input }],
    pickStartAfter: [{ type: Input }],
    pickTimer: [{ type: Input }],
    prefix: [{ type: Input }],
    postfix: [{ type: Input }],
    placeholder: [{ type: Input }],
    buttonsOrientation: [{ type: Input }],
    size: [{ type: Input }],
    customClass: [{ type: Input }],
    mouseWheel: [{ type: Input }],
    arrowKeys: [{ type: Input }],
    inputReadOnly: [{ type: Input }],
    showUpButton: [{ type: Input }],
    showDownButton: [{ type: Input }],
    valueChange: [{ type: Output }],
    minReached: [{ type: Output }],
    maxReached: [{ type: Output }],
    pickStarted: [{ type: Output }],
    pickStoped: [{ type: Output }],
    pickUpStarted: [{ type: Output }],
    pickUpStoped: [{ type: Output }],
    pickDownStarted: [{ type: Output }],
    pickDownStoped: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NumberPickerComponent.prototype.precision;
    /**
     * @type {?}
     * @private
     */
    NumberPickerComponent.prototype.eventHolder;
    /**
     * @type {?}
     * @private
     */
    NumberPickerComponent.prototype.countInterval;
    /**
     * @type {?}
     * @private
     */
    NumberPickerComponent.prototype.isInputFocused;
    /** @type {?} */
    NumberPickerComponent.prototype.min;
    /** @type {?} */
    NumberPickerComponent.prototype.max;
    /** @type {?} */
    NumberPickerComponent.prototype.step;
    /** @type {?} */
    NumberPickerComponent.prototype.value;
    /** @type {?} */
    NumberPickerComponent.prototype.pickStartAfter;
    /** @type {?} */
    NumberPickerComponent.prototype.pickTimer;
    /** @type {?} */
    NumberPickerComponent.prototype.prefix;
    /** @type {?} */
    NumberPickerComponent.prototype.postfix;
    /** @type {?} */
    NumberPickerComponent.prototype.placeholder;
    /** @type {?} */
    NumberPickerComponent.prototype.buttonsOrientation;
    /** @type {?} */
    NumberPickerComponent.prototype.size;
    /** @type {?} */
    NumberPickerComponent.prototype.customClass;
    /** @type {?} */
    NumberPickerComponent.prototype.mouseWheel;
    /** @type {?} */
    NumberPickerComponent.prototype.arrowKeys;
    /** @type {?} */
    NumberPickerComponent.prototype.inputReadOnly;
    /** @type {?} */
    NumberPickerComponent.prototype.showUpButton;
    /** @type {?} */
    NumberPickerComponent.prototype.showDownButton;
    /** @type {?} */
    NumberPickerComponent.prototype.valueChange;
    /** @type {?} */
    NumberPickerComponent.prototype.minReached;
    /** @type {?} */
    NumberPickerComponent.prototype.maxReached;
    /** @type {?} */
    NumberPickerComponent.prototype.pickStarted;
    /** @type {?} */
    NumberPickerComponent.prototype.pickStoped;
    /** @type {?} */
    NumberPickerComponent.prototype.pickUpStarted;
    /** @type {?} */
    NumberPickerComponent.prototype.pickUpStoped;
    /** @type {?} */
    NumberPickerComponent.prototype.pickDownStarted;
    /** @type {?} */
    NumberPickerComponent.prototype.pickDownStoped;
    /**
     * @type {?}
     * @private
     */
    NumberPickerComponent.prototype.numberPickerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1udW1iZXItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL251bWJlci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWtEOUQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQWlDaEMsWUFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUEvQnBELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBWXRCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNyQixnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxRCxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELG9CQUFlLEdB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OztJQUM1QiwwQ0FBMEI7O0lBQzFCLDhDQUErQjs7SUFDL0IsNkNBQTZCOztJQUM3QiwrQ0FBK0I7O0lBQy9CLDRDQUFpRTs7SUFDakUsMkNBQWlFOztJQUNqRSwyQ0FBaUU7O0lBQ2pFLDRDQUFrRTs7SUFDbEUsMkNBQWlFOztJQUNqRSw4Q0FBb0U7O0lBQ3BFLDZDQUFtRTs7SUFDbkUsZ0RBQXNFOztJQUN0RSwrQ0FBcUU7Ozs7O0lBRXpELG9EQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYnV0dG9uc09yaWVudGF0aW9uVHlwZSwgc2l6ZVR5cGUsIEN1c3RvbUNsYXNzZXMgfSBmcm9tICcuL251bWJlci1waWNrZXIuY29uZmlnJztcbmltcG9ydCB7IE51bWJlclBpY2tlclNlcnZpY2UgfSBmcm9tICcuL251bWJlci1waWNrZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW51bWJlci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItMyBpbnB1dC17e3NpemV9fSB7e2N1c3RvbUNsYXNzLmNvbnRhaW5lcn19XCI+XG4gIDwhLS0gSG9yaXpvbnRhbCBkZWNyZWFzZSBidXR0b24gb3JpZW50YXRpb24gLS0+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCIgKm5nSWY9XCJpc0hvcml6b250YWwoKSAmJiBzaG93RG93bkJ1dHRvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBkZWNyZWFzZSB7e2N1c3RvbUNsYXNzLmRvd259fVwiIChjbGljayk9XCJvbkRlY3JlYXNlKCRldmVudClcIlxuICAgIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQsIGZhbHNlKVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBmYWxzZSlcIj4tPC9zcGFuPlxuICA8L2Rpdj5cbiAgPCEtLSBJbnB1dCBwcmVmaXggLS0+XG4gIDxkaXYgKm5nSWY9XCJwcmVmaXhcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQge3tjdXN0b21DbGFzcy5wcmVmaXh9fVwiPnt7cHJlZml4fX08L3NwYW4+XG4gIDwvZGl2PlxuICB4PGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJpbnB1dC1zcGluLXZhbFwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICBbcmVhZE9ubHldPVwiaW5wdXRSZWFkT25seVwiXG4gIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gIChtb3VzZXdoZWVsKT1cIm1vdXNlV2hlZWwgJiYgb25Nb3VzZVdoZWVsKCRldmVudClcIlxuICAoa2V5dXApPVwiYXJyb3dLZXlzICYmIG9uS2V5VXAoJGV2ZW50KVwiXG4gIChrZXlkb3duKT1cImFycm93S2V5cyAmJiBvbktleURvd24oJGV2ZW50KVwiXG4gIChrZXlkb3duLmFycm93dXApPVwiYXJyb3dLZXlzICYmIG9uSW5jcmVhc2UoJGV2ZW50KVwiXG4gIChrZXlkb3duLmFycm93ZG93bik9XCJhcnJvd0tleXMgJiYgb25EZWNyZWFzZSgkZXZlbnQpXCJcbiAgKGNoYW5nZSk9XCJvblZhbHVlQ2hhbmdlKCRldmVudClcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICA+XG4gIDwhLS0gSW5wdXQgcG9zdGZpeCAtLT5cbiAgPGRpdiAqbmdJZj1cInBvc3RmaXhcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQge3tjdXN0b21DbGFzcy5wb3N0Zml4fX1cIiBbc3R5bGUuYm9yZGVyTGVmdF09XCInMCdcIj57e3Bvc3RmaXh9fTwvc3Bhbj5cbiAgPC9kaXY+XG4gIDwhLS0gSG9yaXpvbnRhbCBpbmNyZWFzZSBidXR0b24gb3JpZW50YXRpb24gLS0+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCIgKm5nSWY9XCJpc0hvcml6b250YWwoKSAmJiBzaG93VXBCdXR0b25cIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgaW5jcmVhc2Uge3tjdXN0b21DbGFzcy51cH19XCIgW3N0eWxlLmJvcmRlckxlZnRdPVwiKCFwb3N0Zml4KSA/ICcwJyA6ICcnXCIgKGNsaWNrKT1cIm9uSW5jcmVhc2UoJGV2ZW50KVwiXG4gICAgKG1vdXNldXApPVwib25Nb3VzZVVwKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIj4rPC9zcGFuPlxuICA8L2Rpdj5cbiAgPCEtLSBWZXJ0aWNhbCBidXR0b25zIG9yaWVudGF0aW9uIC0tPlxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCIgKm5nSWY9XCIhaXNIb3Jpem9udGFsKClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgdmVydGljYWwgcC0wXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cInNob3dVcEJ1dHRvblwiIGNsYXNzPVwie3tjdXN0b21DbGFzcy51cH19XCIgKGNsaWNrKT1cIm9uSW5jcmVhc2UoJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQpXCJcbiAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiPis8L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cInNob3dEb3duQnV0dG9uXCIgY2xhc3M9XCJ7e2N1c3RvbUNsYXNzLmRvd259fVwiIChjbGljayk9XCJvbkRlY3JlYXNlKCRldmVudClcIiAobW91c2V1cCk9XCJvbk1vdXNlVXAoJGV2ZW50LCBmYWxzZSlcIlxuICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIGZhbHNlKVwiPi08L3NwYW4+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9udW1iZXItcGlja2VyLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgcHJlY2lzaW9uOiBudW1iZXI7XG4gIHByaXZhdGUgZXZlbnRIb2xkZXIgPSBudWxsO1xuICBwcml2YXRlIGNvdW50SW50ZXJ2YWwgPSBudWxsO1xuICBwcml2YXRlIGlzSW5wdXRGb2N1c2VkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbWluOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuICBASW5wdXQoKSBzdGVwOiBudW1iZXI7XG4gIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBpY2tTdGFydEFmdGVyOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBpY2tUaW1lcjogbnVtYmVyO1xuICBASW5wdXQoKSBwcmVmaXg6IHN0cmluZztcbiAgQElucHV0KCkgcG9zdGZpeDogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBidXR0b25zT3JpZW50YXRpb246IGJ1dHRvbnNPcmllbnRhdGlvblR5cGU7XG4gIEBJbnB1dCgpIHNpemU6IHNpemVUeXBlID0gJ21kJztcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IEN1c3RvbUNsYXNzZXMgPSB7fTtcbiAgQElucHV0KCkgbW91c2VXaGVlbCA9IGZhbHNlO1xuICBASW5wdXQoKSBhcnJvd0tleXMgPSB0cnVlO1xuICBASW5wdXQoKSBpbnB1dFJlYWRPbmx5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dVcEJ1dHRvbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dEb3duQnV0dG9uID0gdHJ1ZTtcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1pblJlYWNoZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1heFJlYWNoZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBpY2tTdGFydGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwaWNrU3RvcGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwaWNrVXBTdGFydGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwaWNrVXBTdG9wZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBpY2tEb3duU3RhcnRlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGlja0Rvd25TdG9wZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG51bWJlclBpY2tlclNlcnZpY2U6IE51bWJlclBpY2tlclNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdFBpY2tlcigpO1xuICB9XG5cbiAgaXNIb3Jpem9udGFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5idXR0b25zT3JpZW50YXRpb24gIT09ICd2JyAmJiB0aGlzLmJ1dHRvbnNPcmllbnRhdGlvbiAhPT0gJ3ZlcnRpY2FsJyk7XG4gIH1cblxuICBvbkZvY3VzKGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmlzSW5wdXRGb2N1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIG9uQmx1cihldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaXNJbnB1dEZvY3VzZWQgPSBmYWxzZTtcbiAgfVxuXG4gIG9uTW91c2VXaGVlbChldmVudDogTW91c2VXaGVlbEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNJbnB1dEZvY3VzZWQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgd2hlZWxVcCA9IG51bGw7XG4gICAgICBsZXQgZGVsdGEgPSBudWxsO1xuXG4gICAgICBpZiAoZXZlbnQuZGVsdGFZKSB7XG4gICAgICAgIGRlbHRhID0gZXZlbnQuZGVsdGFZIC8gNjA7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuZGV0YWlsKSB7XG4gICAgICAgIGRlbHRhID0gLWV2ZW50LmRldGFpbCAvIDI7XG4gICAgICB9XG4gICAgICBpZiAoZGVsdGEgIT09IG51bGwpIHtcbiAgICAgICAgd2hlZWxVcCA9IGRlbHRhID4gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZnRlck1vdXNlV2hlZWxzKHdoZWVsVXAsIGV2ZW50KTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJNb3VzZVdoZWVscyh3aGVlbFVwOiBhbnksIGV2ZW50OiBXaGVlbEV2ZW50KSB7XG4gICAgdGhpcy5vblBpY2tTdGFydGVkKHdoZWVsVXApO1xuICAgIGlmICh3aGVlbFVwKSB7XG4gICAgICB0aGlzLm9uSW5jcmVhc2UoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uRGVjcmVhc2UoZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLm9uUGlja1N0b3BlZCh3aGVlbFVwKTtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKHRoaXMudmFsdWUgPiB0aGlzLm1heCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xuICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgfVxuICAgIFxuICAgIGlmIChpc0Zpbml0ZSh0aGlzLnZhbHVlKSkge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgb25EZWNyZWFzZShldmVudDogTW91c2VFdmVudCB8IE1vdXNlV2hlZWxFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmNhbkRlY3JlYXNlKCkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnJvdW5kKCh0aGlzLnZhbHVlID4gdGhpcy5taW4pID8gdGhpcy52YWx1ZSAtPSB0aGlzLnN0ZXAgOiB0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taW5SZWFjaGVkLmVtaXQodHJ1ZSk7XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgb25JbmNyZWFzZShldmVudDogTW91c2VFdmVudCB8IE1vdXNlV2hlZWxFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmNhbkluY3JlYXNlKCkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnJvdW5kKCh0aGlzLnZhbHVlIDwgdGhpcy5tYXgpID8gdGhpcy52YWx1ZSArPSB0aGlzLnN0ZXAgOiB0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXhSZWFjaGVkLmVtaXQodHJ1ZSk7XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGluY3JlYXNlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuYWZ0ZXJNb3VzZURvd24oaW5jcmVhc2UsIGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBcnJvd1VwRG93bihrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4ga2V5Q29kZSA9PT0gMzggfHwga2V5Q29kZSA9PT0gNDA7XG4gIH1cblxuICBwcml2YXRlIGlzQXJvd1VwKGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBrZXlDb2RlID09PSAzODtcbiAgfVxuXG4gIHByaXZhdGUgbG9vcFBpY2soaW5jcmVhc2U6IGJvb2xlYW4sIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMub25QaWNrU3RhcnRlZChpbmNyZWFzZSk7XG4gICAgdGhpcy5ldmVudEhvbGRlciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3VudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoaW5jcmVhc2UpIHtcbiAgICAgICAgICB0aGlzLm9uSW5jcmVhc2UoZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25EZWNyZWFzZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMucGlja1RpbWVyKTtcbiAgICB9LCB0aGlzLnBpY2tTdGFydEFmdGVyKTtcbiAgfVxuXG4gIG9uTW91c2VVcChldmVudDogTW91c2VFdmVudCwgaW5jcmVhc2U6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5hZnRlck1vdXNlVXAoaW5jcmVhc2UsIGV2ZW50KTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmlzQXJyb3dVcERvd24oZXZlbnQua2V5Q29kZSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRIb2xkZXIpIHtcbiAgICAgICAgdGhpcy5sb29wUGljayh0aGlzLmlzQXJvd1VwKGV2ZW50LmtleUNvZGUpLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgb25LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmlzQXJyb3dVcERvd24oZXZlbnQua2V5Q29kZSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmFmdGVyUGljayh0aGlzLmlzQXJvd1VwKGV2ZW50LmtleUNvZGUpKTtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyTW91c2VEb3duKHVwOiBib29sZWFuLCBldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuaXNMZWZ0Q2xpY2soZXZlbnQud2hpY2gpKSB7XG4gICAgICB0aGlzLmxvb3BQaWNrKHVwLCBldmVudCk7XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlck1vdXNlVXAodXA6IGJvb2xlYW4sIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFmdGVyUGljayh1cCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyUGljayh1cDogYm9vbGVhbikge1xuICAgIHRoaXMub25QaWNrU3RvcGVkKHVwKTtcbiAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyVGltZXJzKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmV2ZW50SG9sZGVyKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuY291bnRJbnRlcnZhbCk7XG4gICAgdGhpcy5ldmVudEhvbGRlciA9IG51bGw7XG4gICAgdGhpcy5jb3VudEludGVydmFsID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJBcnJvd0tleXNQcmVzc2VkKHVwOiBib29sZWFuLCBldmVudDogS2V5Ym9hcmRFdmVudCwgc3RhcnQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoc3RhcnQpIHtcbiAgICAgIHRoaXMubG9vcFBpY2sodXAsIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZnRlclBpY2sodXApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VWYWwodmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcmVjaXNpb24oc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gL1xcZCokLy5leGVjKFN0cmluZyhzdGVwKSlbMF0ubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSByb3VuZCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTWF0aC5yb3VuZCh2YWx1ZSAqIE1hdGgucG93KDEwLCB0aGlzLnByZWNpc2lvbikpIC8gTWF0aC5wb3coMTAsIHRoaXMucHJlY2lzaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FuSW5jcmVhc2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2FuSW5jcmVhc2UgPSAodGhpcy52YWx1ZSA8PSB0aGlzLm1heCAtIHRoaXMuc3RlcCk7XG4gICAgaWYgKCFjYW5JbmNyZWFzZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xuICAgIH1cbiAgICByZXR1cm4gY2FuSW5jcmVhc2U7XG4gIH1cblxuICBwcml2YXRlIGNhbkRlY3JlYXNlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNhbkRlY3JlYXNlID0gKHRoaXMudmFsdWUgPj0gdGhpcy5taW4gKyB0aGlzLnN0ZXApO1xuICAgIGlmICghY2FuRGVjcmVhc2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIGNhbkRlY3JlYXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBvblBpY2tTdGFydGVkKGluY3JlYXNlOiBib29sZWFuKSB7XG4gICAgaWYgKGluY3JlYXNlKSB7XG4gICAgICBpZiAodGhpcy5jYW5JbmNyZWFzZSgpKSB7XG4gICAgICAgIHRoaXMucGlja1N0YXJ0ZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgdGhpcy5waWNrVXBTdGFydGVkLmVtaXQodHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNhbkRlY3JlYXNlKCkpIHtcbiAgICAgICAgdGhpcy5waWNrU3RhcnRlZC5lbWl0KHRydWUpO1xuICAgICAgICB0aGlzLnBpY2tEb3duU3RhcnRlZC5lbWl0KHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25QaWNrU3RvcGVkKGluY3JlYXNlOiBib29sZWFuKSB7XG4gICAgaWYgKGluY3JlYXNlKSB7XG4gICAgICBpZiAodGhpcy5jYW5JbmNyZWFzZSgpKSB7XG4gICAgICAgIHRoaXMucGlja1VwU3RvcGVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMucGlja1N0b3BlZC5lbWl0KHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jYW5EZWNyZWFzZSgpKSB7XG4gICAgICAgIHRoaXMucGlja0Rvd25TdG9wZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgdGhpcy5waWNrU3RvcGVkLmVtaXQodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0xlZnRDbGljayh3aXRjaDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpdGNoID09PSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGlja2VyKCk6IHZvaWQge1xuICAgIHRoaXMubWluID0gaXNGaW5pdGUodGhpcy52YWx1ZSkgPyB0aGlzLnBhcnNlVmFsKHRoaXMubWluKSA6IHRoaXMubnVtYmVyUGlja2VyU2VydmljZS5taW47XG4gICAgdGhpcy5tYXggPSBpc0Zpbml0ZSh0aGlzLnZhbHVlKSA/IHRoaXMucGFyc2VWYWwodGhpcy5tYXgpIDogdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLm1heDtcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLnBhcnNlVmFsKHRoaXMuc3RlcCkgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLnN0ZXA7XG4gICAgdGhpcy52YWx1ZSA9IGlzRmluaXRlKHRoaXMudmFsdWUpID8gdGhpcy5wYXJzZVZhbCh0aGlzLnZhbHVlKSA6IHRoaXMubnVtYmVyUGlja2VyU2VydmljZS52YWx1ZTtcbiAgICB0aGlzLnBpY2tTdGFydEFmdGVyID0gdGhpcy5wYXJzZVZhbCh0aGlzLnBpY2tTdGFydEFmdGVyKSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2UucGlja1N0YXJ0QWZ0ZXI7XG4gICAgdGhpcy5waWNrVGltZXIgPSB0aGlzLnBhcnNlVmFsKHRoaXMucGlja1RpbWVyKSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2UucGlja1RpbWVyO1xuICAgIHRoaXMucHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24odGhpcy5zdGVwKSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2UucHJlY2lzaW9uO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnJvdW5kKHRoaXMudmFsdWUpO1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyICE9PSB1bmRlZmluZWQgPyB0aGlzLnBsYWNlaG9sZGVyIDogJyc7XG4gIH1cblxufVxuIl19