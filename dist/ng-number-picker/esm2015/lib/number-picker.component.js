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
        this.min = this.parseVal(this.min) || this.numberPickerService.min;
        this.max = this.parseVal(this.max) || this.numberPickerService.max;
        this.step = this.parseVal(this.step) || this.numberPickerService.step;
        this.value = this.parseVal(this.value) || this.numberPickerService.value;
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
  <input type="number" class="form-control" name="input-spin-val"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1udW1iZXItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL251bWJlci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWtEOUQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQWlDaEMsWUFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUEvQnBELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBWXRCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNyQixnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxRCxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELG9CQUFlLEdB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QXNFOztJQUN0RSwrQ0FBcUU7Ozs7O0lBRXpELG9EQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYnV0dG9uc09yaWVudGF0aW9uVHlwZSwgc2l6ZVR5cGUsIEN1c3RvbUNsYXNzZXMgfSBmcm9tICcuL251bWJlci1waWNrZXIuY29uZmlnJztcbmltcG9ydCB7IE51bWJlclBpY2tlclNlcnZpY2UgfSBmcm9tICcuL251bWJlci1waWNrZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW51bWJlci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItMyBpbnB1dC17e3NpemV9fSB7e2N1c3RvbUNsYXNzLmNvbnRhaW5lcn19XCI+XG4gIDwhLS0gSG9yaXpvbnRhbCBkZWNyZWFzZSBidXR0b24gb3JpZW50YXRpb24gLS0+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCIgKm5nSWY9XCJpc0hvcml6b250YWwoKSAmJiBzaG93RG93bkJ1dHRvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBkZWNyZWFzZSB7e2N1c3RvbUNsYXNzLmRvd259fVwiIChjbGljayk9XCJvbkRlY3JlYXNlKCRldmVudClcIlxuICAgIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQsIGZhbHNlKVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBmYWxzZSlcIj4tPC9zcGFuPlxuICA8L2Rpdj5cbiAgPCEtLSBJbnB1dCBwcmVmaXggLS0+XG4gIDxkaXYgKm5nSWY9XCJwcmVmaXhcIiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQge3tjdXN0b21DbGFzcy5wcmVmaXh9fVwiPnt7cHJlZml4fX08L3NwYW4+XG4gIDwvZGl2PlxuICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cImlucHV0LXNwaW4tdmFsXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtyZWFkT25seV09XCJpbnB1dFJlYWRPbmx5XCJcbiAgKGJsdXIpPVwib25CbHVyKCRldmVudClcIlxuICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgKG1vdXNld2hlZWwpPVwibW91c2VXaGVlbCAmJiBvbk1vdXNlV2hlZWwoJGV2ZW50KVwiXG4gIChrZXl1cCk9XCJhcnJvd0tleXMgJiYgb25LZXlVcCgkZXZlbnQpXCJcbiAgKGtleWRvd24pPVwiYXJyb3dLZXlzICYmIG9uS2V5RG93bigkZXZlbnQpXCJcbiAgKGtleWRvd24uYXJyb3d1cCk9XCJhcnJvd0tleXMgJiYgb25JbmNyZWFzZSgkZXZlbnQpXCJcbiAgKGtleWRvd24uYXJyb3dkb3duKT1cImFycm93S2V5cyAmJiBvbkRlY3JlYXNlKCRldmVudClcIlxuICAoY2hhbmdlKT1cIm9uVmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gID5cbiAgPCEtLSBJbnB1dCBwb3N0Zml4IC0tPlxuICA8ZGl2ICpuZ0lmPVwicG9zdGZpeFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCB7e2N1c3RvbUNsYXNzLnBvc3RmaXh9fVwiIFtzdHlsZS5ib3JkZXJMZWZ0XT1cIicwJ1wiPnt7cG9zdGZpeH19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPCEtLSBIb3Jpem9udGFsIGluY3JlYXNlIGJ1dHRvbiBvcmllbnRhdGlvbiAtLT5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIiAqbmdJZj1cImlzSG9yaXpvbnRhbCgpICYmIHNob3dVcEJ1dHRvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBpbmNyZWFzZSB7e2N1c3RvbUNsYXNzLnVwfX1cIiBbc3R5bGUuYm9yZGVyTGVmdF09XCIoIXBvc3RmaXgpID8gJzAnIDogJydcIiAoY2xpY2spPVwib25JbmNyZWFzZSgkZXZlbnQpXCJcbiAgICAobW91c2V1cCk9XCJvbk1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiPis8L3NwYW4+XG4gIDwvZGl2PlxuICA8IS0tIFZlcnRpY2FsIGJ1dHRvbnMgb3JpZW50YXRpb24gLS0+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIiAqbmdJZj1cIiFpc0hvcml6b250YWwoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCB2ZXJ0aWNhbCBwLTBcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1VwQnV0dG9uXCIgY2xhc3M9XCJ7e2N1c3RvbUNsYXNzLnVwfX1cIiAoY2xpY2spPVwib25JbmNyZWFzZSgkZXZlbnQpXCIgKG1vdXNldXApPVwib25Nb3VzZVVwKCRldmVudClcIlxuICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQpXCI+Kzwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0Rvd25CdXR0b25cIiBjbGFzcz1cInt7Y3VzdG9tQ2xhc3MuZG93bn19XCIgKGNsaWNrKT1cIm9uRGVjcmVhc2UoJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQsIGZhbHNlKVwiXG4gICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgZmFsc2UpXCI+LTwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL251bWJlci1waWNrZXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBwcmVjaXNpb246IG51bWJlcjtcbiAgcHJpdmF0ZSBldmVudEhvbGRlciA9IG51bGw7XG4gIHByaXZhdGUgY291bnRJbnRlcnZhbCA9IG51bGw7XG4gIHByaXZhdGUgaXNJbnB1dEZvY3VzZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcbiAgQElucHV0KCkgcGlja1N0YXJ0QWZ0ZXI6IG51bWJlcjtcbiAgQElucHV0KCkgcGlja1RpbWVyOiBudW1iZXI7XG4gIEBJbnB1dCgpIHByZWZpeDogc3RyaW5nO1xuICBASW5wdXQoKSBwb3N0Zml4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJ1dHRvbnNPcmllbnRhdGlvbjogYnV0dG9uc09yaWVudGF0aW9uVHlwZTtcbiAgQElucHV0KCkgc2l6ZTogc2l6ZVR5cGUgPSAnbWQnO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogQ3VzdG9tQ2xhc3NlcyA9IHt9O1xuICBASW5wdXQoKSBtb3VzZVdoZWVsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFycm93S2V5cyA9IHRydWU7XG4gIEBJbnB1dCgpIGlucHV0UmVhZE9ubHkgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1VwQnV0dG9uID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0Rvd25CdXR0b24gPSB0cnVlO1xuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbWluUmVhY2hlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbWF4UmVhY2hlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGlja1N0YXJ0ZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBpY2tTdG9wZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBpY2tVcFN0YXJ0ZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBpY2tVcFN0b3BlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGlja0Rvd25TdGFydGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwaWNrRG93blN0b3BlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbnVtYmVyUGlja2VyU2VydmljZTogTnVtYmVyUGlja2VyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0UGlja2VyKCk7XG4gIH1cblxuICBpc0hvcml6b250YWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmJ1dHRvbnNPcmllbnRhdGlvbiAhPT0gJ3YnICYmIHRoaXMuYnV0dG9uc09yaWVudGF0aW9uICE9PSAndmVydGljYWwnKTtcbiAgfVxuXG4gIG9uRm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaXNJbnB1dEZvY3VzZWQgPSB0cnVlO1xuICB9XG5cbiAgb25CbHVyKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5pc0lucHV0Rm9jdXNlZCA9IGZhbHNlO1xuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBNb3VzZVdoZWVsRXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc0lucHV0Rm9jdXNlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB3aGVlbFVwID0gbnVsbDtcbiAgICAgIGxldCBkZWx0YSA9IG51bGw7XG5cbiAgICAgIGlmIChldmVudC5kZWx0YVkpIHtcbiAgICAgICAgZGVsdGEgPSBldmVudC5kZWx0YVkgLyA2MDtcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5kZXRhaWwpIHtcbiAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsIC8gMjtcbiAgICAgIH1cbiAgICAgIGlmIChkZWx0YSAhPT0gbnVsbCkge1xuICAgICAgICB3aGVlbFVwID0gZGVsdGEgPiAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFmdGVyTW91c2VXaGVlbHMod2hlZWxVcCwgZXZlbnQpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZnRlck1vdXNlV2hlZWxzKHdoZWVsVXA6IGFueSwgZXZlbnQ6IFdoZWVsRXZlbnQpIHtcbiAgICB0aGlzLm9uUGlja1N0YXJ0ZWQod2hlZWxVcCk7XG4gICAgaWYgKHdoZWVsVXApIHtcbiAgICAgIHRoaXMub25JbmNyZWFzZShldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25EZWNyZWFzZShldmVudCk7XG4gICAgfVxuICAgIHRoaXMub25QaWNrU3RvcGVkKHdoZWVsVXApO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBpZiAodGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcbiAgICB9XG4gICAgXG4gICAgaWYgKGlzRmluaXRlKHRoaXMudmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChudWxsKTtcbiAgICB9XG4gIH1cblxuICBvbkRlY3JlYXNlKGV2ZW50OiBNb3VzZUV2ZW50IHwgTW91c2VXaGVlbEV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuY2FuRGVjcmVhc2UoKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucm91bmQoKHRoaXMudmFsdWUgPiB0aGlzLm1pbikgPyB0aGlzLnZhbHVlIC09IHRoaXMuc3RlcCA6IHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pblJlYWNoZWQuZW1pdCh0cnVlKTtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBvbkluY3JlYXNlKGV2ZW50OiBNb3VzZUV2ZW50IHwgTW91c2VXaGVlbEV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuY2FuSW5jcmVhc2UoKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucm91bmQoKHRoaXMudmFsdWUgPCB0aGlzLm1heCkgPyB0aGlzLnZhbHVlICs9IHRoaXMuc3RlcCA6IHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heFJlYWNoZWQuZW1pdCh0cnVlKTtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgaW5jcmVhc2U6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5hZnRlck1vdXNlRG93bihpbmNyZWFzZSwgZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0Fycm93VXBEb3duKGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBrZXlDb2RlID09PSAzOCB8fCBrZXlDb2RlID09PSA0MDtcbiAgfVxuXG4gIHByaXZhdGUgaXNBcm93VXAoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleUNvZGUgPT09IDM4O1xuICB9XG5cbiAgcHJpdmF0ZSBsb29wUGljayhpbmNyZWFzZTogYm9vbGVhbiwgZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5vblBpY2tTdGFydGVkKGluY3JlYXNlKTtcbiAgICB0aGlzLmV2ZW50SG9sZGVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNvdW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChpbmNyZWFzZSkge1xuICAgICAgICAgIHRoaXMub25JbmNyZWFzZShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbkRlY3JlYXNlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5waWNrVGltZXIpO1xuICAgIH0sIHRoaXMucGlja1N0YXJ0QWZ0ZXIpO1xuICB9XG5cbiAgb25Nb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmNyZWFzZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLmFmdGVyTW91c2VVcChpbmNyZWFzZSwgZXZlbnQpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNBcnJvd1VwRG93bihldmVudC5rZXlDb2RlKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICghdGhpcy5ldmVudEhvbGRlcikge1xuICAgICAgICB0aGlzLmxvb3BQaWNrKHRoaXMuaXNBcm93VXAoZXZlbnQua2V5Q29kZSksIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBvbktleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNBcnJvd1VwRG93bihldmVudC5rZXlDb2RlKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuYWZ0ZXJQaWNrKHRoaXMuaXNBcm93VXAoZXZlbnQua2V5Q29kZSkpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJNb3VzZURvd24odXA6IGJvb2xlYW4sIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5pc0xlZnRDbGljayhldmVudC53aGljaCkpIHtcbiAgICAgIHRoaXMubG9vcFBpY2sodXAsIGV2ZW50KTtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyTW91c2VVcCh1cDogYm9vbGVhbiwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuYWZ0ZXJQaWNrKHVwKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJQaWNrKHVwOiBib29sZWFuKSB7XG4gICAgdGhpcy5vblBpY2tTdG9wZWQodXApO1xuICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJUaW1lcnMoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZXZlbnRIb2xkZXIpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jb3VudEludGVydmFsKTtcbiAgICB0aGlzLmV2ZW50SG9sZGVyID0gbnVsbDtcbiAgICB0aGlzLmNvdW50SW50ZXJ2YWwgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlckFycm93S2V5c1ByZXNzZWQodXA6IGJvb2xlYW4sIGV2ZW50OiBLZXlib2FyZEV2ZW50LCBzdGFydDogYm9vbGVhbikge1xuICAgIGlmIChzdGFydCkge1xuICAgICAgdGhpcy5sb29wUGljayh1cCwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFmdGVyUGljayh1cCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVZhbCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldFByZWNpc2lvbihzdGVwOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAvXFxkKiQvLmV4ZWMoU3RyaW5nKHN0ZXApKVswXS5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIHJvdW5kKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBNYXRoLnJvdW5kKHZhbHVlICogTWF0aC5wb3coMTAsIHRoaXMucHJlY2lzaW9uKSkgLyBNYXRoLnBvdygxMCwgdGhpcy5wcmVjaXNpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5JbmNyZWFzZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjYW5JbmNyZWFzZSA9ICh0aGlzLnZhbHVlIDw9IHRoaXMubWF4IC0gdGhpcy5zdGVwKTtcbiAgICBpZiAoIWNhbkluY3JlYXNlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgfVxuICAgIHJldHVybiBjYW5JbmNyZWFzZTtcbiAgfVxuXG4gIHByaXZhdGUgY2FuRGVjcmVhc2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2FuRGVjcmVhc2UgPSAodGhpcy52YWx1ZSA+PSB0aGlzLm1pbiArIHRoaXMuc3RlcCk7XG4gICAgaWYgKCFjYW5EZWNyZWFzZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgIH1cbiAgICByZXR1cm4gY2FuRGVjcmVhc2U7XG4gIH1cblxuICBwcml2YXRlIG9uUGlja1N0YXJ0ZWQoaW5jcmVhc2U6IGJvb2xlYW4pIHtcbiAgICBpZiAoaW5jcmVhc2UpIHtcbiAgICAgIGlmICh0aGlzLmNhbkluY3JlYXNlKCkpIHtcbiAgICAgICAgdGhpcy5waWNrU3RhcnRlZC5lbWl0KHRydWUpO1xuICAgICAgICB0aGlzLnBpY2tVcFN0YXJ0ZWQuZW1pdCh0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2FuRGVjcmVhc2UoKSkge1xuICAgICAgICB0aGlzLnBpY2tTdGFydGVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMucGlja0Rvd25TdGFydGVkLmVtaXQodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblBpY2tTdG9wZWQoaW5jcmVhc2U6IGJvb2xlYW4pIHtcbiAgICBpZiAoaW5jcmVhc2UpIHtcbiAgICAgIGlmICh0aGlzLmNhbkluY3JlYXNlKCkpIHtcbiAgICAgICAgdGhpcy5waWNrVXBTdG9wZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgdGhpcy5waWNrU3RvcGVkLmVtaXQodHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNhbkRlY3JlYXNlKCkpIHtcbiAgICAgICAgdGhpcy5waWNrRG93blN0b3BlZC5lbWl0KHRydWUpO1xuICAgICAgICB0aGlzLnBpY2tTdG9wZWQuZW1pdCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTGVmdENsaWNrKHdpdGNoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gd2l0Y2ggPT09IDE7XG4gIH1cblxuICBwcml2YXRlIGluaXRQaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5taW4gPSB0aGlzLnBhcnNlVmFsKHRoaXMubWluKSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2UubWluO1xuICAgIHRoaXMubWF4ID0gdGhpcy5wYXJzZVZhbCh0aGlzLm1heCkgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLm1heDtcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLnBhcnNlVmFsKHRoaXMuc3RlcCkgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLnN0ZXA7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWwodGhpcy52YWx1ZSkgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLnZhbHVlO1xuICAgIHRoaXMucGlja1N0YXJ0QWZ0ZXIgPSB0aGlzLnBhcnNlVmFsKHRoaXMucGlja1N0YXJ0QWZ0ZXIpIHx8IHRoaXMubnVtYmVyUGlja2VyU2VydmljZS5waWNrU3RhcnRBZnRlcjtcbiAgICB0aGlzLnBpY2tUaW1lciA9IHRoaXMucGFyc2VWYWwodGhpcy5waWNrVGltZXIpIHx8IHRoaXMubnVtYmVyUGlja2VyU2VydmljZS5waWNrVGltZXI7XG4gICAgdGhpcy5wcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbih0aGlzLnN0ZXApIHx8IHRoaXMubnVtYmVyUGlja2VyU2VydmljZS5wcmVjaXNpb247XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucm91bmQodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCA/IHRoaXMucGxhY2Vob2xkZXIgOiAnJztcbiAgfVxuXG59XG4iXX0=