import { Injectable, Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumberPickerService {
    constructor() {
        /**
         * Min picker value
         */
        this.min = 0;
        /**
         * Max picker value
         */
        this.max = 100;
        /**
         * Pick step value
         */
        this.step = 1;
        /**
         * Delay for start picking values
         */
        this.pickStartAfter = 500;
        /**
         * Delay betweens each pick
         */
        this.pickTimer = 100;
        /**
         * value precision
         */
        this.precision = 1;
        /**
         * Inital picker value
         */
        this.value = null;
    }
}
NumberPickerService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumberPickerComponent {
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
                styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}.decrease:hover,.increase:hover{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;background-color:#d8d8d8}.increase{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important}.vertical{display:flex;justify-content:center;flex-direction:column;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vertical span{line-height:15px}.input-md .vertical span,.input-sm .vertical span{padding:2px 10px}.input-lg .vertical span{padding:4px 10px}.input-xlg .vertical span{padding:7px 10px}.input-md,.input-medium{height:45px}.input-large,.input-lg{height:50px}.input-xlarge,.input-xlg{height:75px}.input-md input,.input-md span,.input-medium input,.input-medium span{font-size:22px}.input-large input,.input-large span,.input-lg input,.input-lg span{font-size:25px}.input-xlarge input,.input-xlarge span,.input-xlg input,.input-xlg span{font-size:38px}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NumberPickerModule {
}
NumberPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                providers: [NumberPickerService],
                declarations: [NumberPickerComponent],
                exports: [NumberPickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NumberPickerService, NumberPickerComponent, NumberPickerModule };

//# sourceMappingURL=ng-number-picker.js.map