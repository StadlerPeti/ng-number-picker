/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NumberPickerService } from './number-picker.service';
var NumberPickerComponent = /** @class */ (function () {
    function NumberPickerComponent(numberPickerService) {
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
    NumberPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initPicker();
    };
    /**
     * @return {?}
     */
    NumberPickerComponent.prototype.isHorizontal = /**
     * @return {?}
     */
    function () {
        return (this.buttonsOrientation !== 'v' && this.buttonsOrientation !== 'vertical');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onFocus = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.isInputFocused = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.isInputFocused = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onMouseWheel = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isInputFocused) {
            event.preventDefault();
            /** @type {?} */
            var wheelUp = null;
            /** @type {?} */
            var delta = null;
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
    };
    /**
     * @private
     * @param {?} wheelUp
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.afterMouseWheels = /**
     * @private
     * @param {?} wheelUp
     * @param {?} event
     * @return {?}
     */
    function (wheelUp, event) {
        this.onPickStarted(wheelUp);
        if (wheelUp) {
            this.onIncrease(event);
        }
        else {
            this.onDecrease(event);
        }
        this.onPickStoped(wheelUp);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onValueChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onDecrease = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (this.canDecrease()) {
            this.value = this.round((this.value > this.min) ? this.value -= this.step : this.value);
            this.valueChange.emit(this.value);
        }
        else {
            this.minReached.emit(true);
        }
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onIncrease = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (this.canIncrease()) {
            this.value = this.round((this.value < this.max) ? this.value += this.step : this.value);
            this.valueChange.emit(this.value);
        }
        else {
            this.maxReached.emit(true);
        }
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @param {?=} increase
     * @return {?}
     */
    NumberPickerComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @param {?=} increase
     * @return {?}
     */
    function (event, increase) {
        if (increase === void 0) { increase = true; }
        this.afterMouseDown(increase, event);
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    NumberPickerComponent.prototype.isArrowUpDown = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        return keyCode === 38 || keyCode === 40;
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    NumberPickerComponent.prototype.isArowUp = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        return keyCode === 38;
    };
    /**
     * @private
     * @param {?} increase
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.loopPick = /**
     * @private
     * @param {?} increase
     * @param {?} event
     * @return {?}
     */
    function (increase, event) {
        var _this = this;
        this.onPickStarted(increase);
        this.eventHolder = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.countInterval = setInterval((/**
             * @return {?}
             */
            function () {
                if (increase) {
                    _this.onIncrease(event);
                }
                else {
                    _this.onDecrease(event);
                }
            }), _this.pickTimer);
        }), this.pickStartAfter);
    };
    /**
     * @param {?} event
     * @param {?=} increase
     * @return {?}
     */
    NumberPickerComponent.prototype.onMouseUp = /**
     * @param {?} event
     * @param {?=} increase
     * @return {?}
     */
    function (event, increase) {
        if (increase === void 0) { increase = true; }
        this.afterMouseUp(increase, event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isArrowUpDown(event.keyCode)) {
            event.preventDefault();
            if (!this.eventHolder) {
                this.loopPick(this.isArowUp(event.keyCode), event);
            }
        }
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onKeyUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isArrowUpDown(event.keyCode)) {
            event.preventDefault();
            this.afterPick(this.isArowUp(event.keyCode));
        }
        event.stopPropagation();
    };
    /**
     * @private
     * @param {?} up
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.afterMouseDown = /**
     * @private
     * @param {?} up
     * @param {?} event
     * @return {?}
     */
    function (up, event) {
        event.preventDefault();
        if (this.isLeftClick(event.which)) {
            this.loopPick(up, event);
        }
        event.stopPropagation();
    };
    /**
     * @private
     * @param {?} up
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.afterMouseUp = /**
     * @private
     * @param {?} up
     * @param {?} event
     * @return {?}
     */
    function (up, event) {
        event.preventDefault();
        this.afterPick(up);
        event.stopPropagation();
    };
    /**
     * @private
     * @param {?} up
     * @return {?}
     */
    NumberPickerComponent.prototype.afterPick = /**
     * @private
     * @param {?} up
     * @return {?}
     */
    function (up) {
        this.onPickStoped(up);
        this.clearTimers();
    };
    /**
     * @private
     * @return {?}
     */
    NumberPickerComponent.prototype.clearTimers = /**
     * @private
     * @return {?}
     */
    function () {
        clearTimeout(this.eventHolder);
        clearInterval(this.countInterval);
        this.eventHolder = null;
        this.countInterval = null;
    };
    /**
     * @private
     * @param {?} up
     * @param {?} event
     * @param {?} start
     * @return {?}
     */
    NumberPickerComponent.prototype.afterArrowKeysPressed = /**
     * @private
     * @param {?} up
     * @param {?} event
     * @param {?} start
     * @return {?}
     */
    function (up, event, start) {
        if (start) {
            this.loopPick(up, event);
        }
        else {
            this.afterPick(up);
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NumberPickerComponent.prototype.parseVal = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'number') {
            return value;
        }
        return parseFloat(value);
    };
    /**
     * @private
     * @param {?} step
     * @return {?}
     */
    NumberPickerComponent.prototype.getPrecision = /**
     * @private
     * @param {?} step
     * @return {?}
     */
    function (step) {
        return /\d*$/.exec(String(step))[0].length;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NumberPickerComponent.prototype.round = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === null ? null : Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
    };
    /**
     * @private
     * @return {?}
     */
    NumberPickerComponent.prototype.canIncrease = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canIncrease = (this.value <= this.max - this.step);
        if (!canIncrease) {
            this.value = this.max;
        }
        return canIncrease;
    };
    /**
     * @private
     * @return {?}
     */
    NumberPickerComponent.prototype.canDecrease = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canDecrease = (this.value >= this.min + this.step);
        if (!canDecrease) {
            this.value = this.min;
        }
        return canDecrease;
    };
    /**
     * @private
     * @param {?} increase
     * @return {?}
     */
    NumberPickerComponent.prototype.onPickStarted = /**
     * @private
     * @param {?} increase
     * @return {?}
     */
    function (increase) {
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
    };
    /**
     * @private
     * @param {?} increase
     * @return {?}
     */
    NumberPickerComponent.prototype.onPickStoped = /**
     * @private
     * @param {?} increase
     * @return {?}
     */
    function (increase) {
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
    };
    /**
     * @private
     * @param {?} witch
     * @return {?}
     */
    NumberPickerComponent.prototype.isLeftClick = /**
     * @private
     * @param {?} witch
     * @return {?}
     */
    function (witch) {
        return witch === 1;
    };
    /**
     * @private
     * @return {?}
     */
    NumberPickerComponent.prototype.initPicker = /**
     * @private
     * @return {?}
     */
    function () {
        this.min = this.parseVal(this.min) || this.numberPickerService.min;
        this.max = this.parseVal(this.max) || this.numberPickerService.max;
        this.step = this.parseVal(this.step) || this.numberPickerService.step;
        this.value = this.parseVal(this.value) || this.numberPickerService.value;
        this.pickStartAfter = this.parseVal(this.pickStartAfter) || this.numberPickerService.pickStartAfter;
        this.pickTimer = this.parseVal(this.pickTimer) || this.numberPickerService.pickTimer;
        this.precision = this.getPrecision(this.step) || this.numberPickerService.precision;
        this.value = this.round(this.value);
        this.placeholder = this.placeholder !== undefined ? this.placeholder : '';
    };
    NumberPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-number-picker',
                    template: "\n  <div class=\"input-group mb-3 input-{{size}} {{customClass.container}}\">\n  <!-- Horizontal decrease button orientation -->\n  <div class=\"input-group-prepend\" *ngIf=\"isHorizontal() && showDownButton\">\n    <span class=\"input-group-text decrease {{customClass.down}}\" (click)=\"onDecrease($event)\"\n    (mouseup)=\"onMouseUp($event, false)\" (mousedown)=\"onMouseDown($event, false)\">-</span>\n  </div>\n  <!-- Input prefix -->\n  <div *ngIf=\"prefix\" class=\"input-group-prepend\">\n    <span class=\"input-group-text {{customClass.prefix}}\">{{prefix}}</span>\n  </div>\n  <input type=\"number\" class=\"form-control\" name=\"input-spin-val\"\n  [(ngModel)]=\"value\"\n  [readOnly]=\"inputReadOnly\"\n  (blur)=\"onBlur($event)\"\n  (focus)=\"onFocus($event)\"\n  (mousewheel)=\"mouseWheel && onMouseWheel($event)\"\n  (keyup)=\"arrowKeys && onKeyUp($event)\"\n  (keydown)=\"arrowKeys && onKeyDown($event)\"\n  (keydown.arrowup)=\"arrowKeys && onIncrease($event)\"\n  (keydown.arrowdown)=\"arrowKeys && onDecrease($event)\"\n  (change)=\"onValueChange($event)\"\n  [placeholder]=\"placeholder\"\n  >\n  <!-- Input postfix -->\n  <div *ngIf=\"postfix\" class=\"input-group-prepend\">\n    <span class=\"input-group-text {{customClass.postfix}}\" [style.borderLeft]=\"'0'\">{{postfix}}</span>\n  </div>\n  <!-- Horizontal increase button orientation -->\n  <div class=\"input-group-prepend\" *ngIf=\"isHorizontal() && showUpButton\">\n    <span class=\"input-group-text increase {{customClass.up}}\" [style.borderLeft]=\"(!postfix) ? '0' : ''\" (click)=\"onIncrease($event)\"\n    (mouseup)=\"onMouseUp($event)\" (mousedown)=\"onMouseDown($event)\">+</span>\n  </div>\n  <!-- Vertical buttons orientation -->\n  <div class=\"input-group-append\" *ngIf=\"!isHorizontal()\">\n    <span class=\"input-group-text vertical p-0\">\n      <span *ngIf=\"showUpButton\" class=\"{{customClass.up}}\" (click)=\"onIncrease($event)\" (mouseup)=\"onMouseUp($event)\"\n      (mousedown)=\"onMouseDown($event)\">+</span>\n      <span *ngIf=\"showDownButton\" class=\"{{customClass.down}}\" (click)=\"onDecrease($event)\" (mouseup)=\"onMouseUp($event, false)\"\n      (mousedown)=\"onMouseDown($event, false)\">-</span>\n    </span>\n  </div>\n</div>\n  ",
                    styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.decrease:hover,.increase:hover{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;background-color:#d8d8d8}.increase{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important}.vertical{display:flex;justify-content:center;flex-direction:column;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vertical span{line-height:15px}.input-md .vertical span,.input-sm .vertical span{padding:2px 10px}.input-lg .vertical span{padding:4px 10px}.input-xlg .vertical span{padding:7px 10px}.input-md,.input-medium{height:45px}.input-large,.input-lg{height:50px}.input-xlarge,.input-xlg{height:75px}.input-md input,.input-md span,.input-medium input,.input-medium span{font-size:22px}.input-large input,.input-large span,.input-lg input,.input-lg span{font-size:25px}.input-xlarge input,.input-xlarge span,.input-xlg input,.input-xlg span{font-size:38px}"]
                }] }
    ];
    /** @nocollapse */
    NumberPickerComponent.ctorParameters = function () { return [
        { type: NumberPickerService }
    ]; };
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
    return NumberPickerComponent;
}());
export { NumberPickerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1udW1iZXItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL251bWJlci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RDtJQWlGRSwrQkFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUEvQnBELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBWXRCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNyQixnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxRCxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFFLENB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LG9DQUFxQjs7SUFDckIscUNBQXNCOztJQUN0QixzQ0FBdUI7O0lBQ3ZCLCtDQUFnQzs7SUFDaEMsMENBQTJCOztJQUMzQix1Q0FBd0I7O0lBQ3hCLHdDQUF5Qjs7SUFDekIsNENBQTZCOztJQUM3QixtREFBb0Q7O0lBQ3BELHFDQUErQjs7SUFDL0IsNENBQXlDOztJQUN6QywyQ0FBNEI7O0lBQzVCLDBDQUEwQjs7SUFDMUIsOENBQStCOztJQUMvQiw2Q0FBNkI7O0lBQzdCLCtDQUErQjs7SUFDL0IsNENBQWlFOztJQUNqRSwyQ0FBaUU7O0lBQ2pFLDJDQUFpRTs7SUFDakUsNENBQWtFOztJQUNsRSwyQ0FBaUU7O0lBQ2pFLDhDQUFvRTs7SUFDcEUsNkNBQW1FOztJQUNuRSxnREFBc0U7O0lBQ3RFLCtDQUFxRTs7Ozs7SUFFekQsb0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBidXR0b25zT3JpZW50YXRpb25UeXBlLCBzaXplVHlwZSwgQ3VzdG9tQ2xhc3NlcyB9IGZyb20gJy4vbnVtYmVyLXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgTnVtYmVyUGlja2VyU2VydmljZSB9IGZyb20gJy4vbnVtYmVyLXBpY2tlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbnVtYmVyLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBtYi0zIGlucHV0LXt7c2l6ZX19IHt7Y3VzdG9tQ2xhc3MuY29udGFpbmVyfX1cIj5cbiAgPCEtLSBIb3Jpem9udGFsIGRlY3JlYXNlIGJ1dHRvbiBvcmllbnRhdGlvbiAtLT5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIiAqbmdJZj1cImlzSG9yaXpvbnRhbCgpICYmIHNob3dEb3duQnV0dG9uXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGRlY3JlYXNlIHt7Y3VzdG9tQ2xhc3MuZG93bn19XCIgKGNsaWNrKT1cIm9uRGVjcmVhc2UoJGV2ZW50KVwiXG4gICAgKG1vdXNldXApPVwib25Nb3VzZVVwKCRldmVudCwgZmFsc2UpXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIGZhbHNlKVwiPi08L3NwYW4+XG4gIDwvZGl2PlxuICA8IS0tIElucHV0IHByZWZpeCAtLT5cbiAgPGRpdiAqbmdJZj1cInByZWZpeFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCB7e2N1c3RvbUNsYXNzLnByZWZpeH19XCI+e3twcmVmaXh9fTwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiaW5wdXQtc3Bpbi12YWxcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgW3JlYWRPbmx5XT1cImlucHV0UmVhZE9ubHlcIlxuICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAobW91c2V3aGVlbCk9XCJtb3VzZVdoZWVsICYmIG9uTW91c2VXaGVlbCgkZXZlbnQpXCJcbiAgKGtleXVwKT1cImFycm93S2V5cyAmJiBvbktleVVwKCRldmVudClcIlxuICAoa2V5ZG93bik9XCJhcnJvd0tleXMgJiYgb25LZXlEb3duKCRldmVudClcIlxuICAoa2V5ZG93bi5hcnJvd3VwKT1cImFycm93S2V5cyAmJiBvbkluY3JlYXNlKCRldmVudClcIlxuICAoa2V5ZG93bi5hcnJvd2Rvd24pPVwiYXJyb3dLZXlzICYmIG9uRGVjcmVhc2UoJGV2ZW50KVwiXG4gIChjaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgPlxuICA8IS0tIElucHV0IHBvc3RmaXggLS0+XG4gIDxkaXYgKm5nSWY9XCJwb3N0Zml4XCIgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IHt7Y3VzdG9tQ2xhc3MucG9zdGZpeH19XCIgW3N0eWxlLmJvcmRlckxlZnRdPVwiJzAnXCI+e3twb3N0Zml4fX08L3NwYW4+XG4gIDwvZGl2PlxuICA8IS0tIEhvcml6b250YWwgaW5jcmVhc2UgYnV0dG9uIG9yaWVudGF0aW9uIC0tPlxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiICpuZ0lmPVwiaXNIb3Jpem9udGFsKCkgJiYgc2hvd1VwQnV0dG9uXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGluY3JlYXNlIHt7Y3VzdG9tQ2xhc3MudXB9fVwiIFtzdHlsZS5ib3JkZXJMZWZ0XT1cIighcG9zdGZpeCkgPyAnMCcgOiAnJ1wiIChjbGljayk9XCJvbkluY3JlYXNlKCRldmVudClcIlxuICAgIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQpXCI+Kzwvc3Bhbj5cbiAgPC9kaXY+XG4gIDwhLS0gVmVydGljYWwgYnV0dG9ucyBvcmllbnRhdGlvbiAtLT5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiICpuZ0lmPVwiIWlzSG9yaXpvbnRhbCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IHZlcnRpY2FsIHAtMFwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VXBCdXR0b25cIiBjbGFzcz1cInt7Y3VzdG9tQ2xhc3MudXB9fVwiIChjbGljayk9XCJvbkluY3JlYXNlKCRldmVudClcIiAobW91c2V1cCk9XCJvbk1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIj4rPC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzaG93RG93bkJ1dHRvblwiIGNsYXNzPVwie3tjdXN0b21DbGFzcy5kb3dufX1cIiAoY2xpY2spPVwib25EZWNyZWFzZSgkZXZlbnQpXCIgKG1vdXNldXApPVwib25Nb3VzZVVwKCRldmVudCwgZmFsc2UpXCJcbiAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBmYWxzZSlcIj4tPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbnVtYmVyLXBpY2tlci5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHByZWNpc2lvbjogbnVtYmVyO1xuICBwcml2YXRlIGV2ZW50SG9sZGVyID0gbnVsbDtcbiAgcHJpdmF0ZSBjb3VudEludGVydmFsID0gbnVsbDtcbiAgcHJpdmF0ZSBpc0lucHV0Rm9jdXNlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgc3RlcDogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xuICBASW5wdXQoKSBwaWNrU3RhcnRBZnRlcjogbnVtYmVyO1xuICBASW5wdXQoKSBwaWNrVGltZXI6IG51bWJlcjtcbiAgQElucHV0KCkgcHJlZml4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBvc3RmaXg6IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgYnV0dG9uc09yaWVudGF0aW9uOiBidXR0b25zT3JpZW50YXRpb25UeXBlO1xuICBASW5wdXQoKSBzaXplOiBzaXplVHlwZSA9ICdtZCc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBDdXN0b21DbGFzc2VzID0ge307XG4gIEBJbnB1dCgpIG1vdXNlV2hlZWwgPSBmYWxzZTtcbiAgQElucHV0KCkgYXJyb3dLZXlzID0gdHJ1ZTtcbiAgQElucHV0KCkgaW5wdXRSZWFkT25seSA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93VXBCdXR0b24gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93RG93bkJ1dHRvbiA9IHRydWU7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtaW5SZWFjaGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtYXhSZWFjaGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwaWNrU3RhcnRlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGlja1N0b3BlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGlja1VwU3RhcnRlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGlja1VwU3RvcGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwaWNrRG93blN0YXJ0ZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBpY2tEb3duU3RvcGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBudW1iZXJQaWNrZXJTZXJ2aWNlOiBOdW1iZXJQaWNrZXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRQaWNrZXIoKTtcbiAgfVxuXG4gIGlzSG9yaXpvbnRhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuYnV0dG9uc09yaWVudGF0aW9uICE9PSAndicgJiYgdGhpcy5idXR0b25zT3JpZW50YXRpb24gIT09ICd2ZXJ0aWNhbCcpO1xuICB9XG5cbiAgb25Gb2N1cyhldmVudDogRm9jdXNFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5pc0lucHV0Rm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICBvbkJsdXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmlzSW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gIH1cblxuICBvbk1vdXNlV2hlZWwoZXZlbnQ6IE1vdXNlV2hlZWxFdmVudCkge1xuICAgIGlmICh0aGlzLmlzSW5wdXRGb2N1c2VkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdoZWVsVXAgPSBudWxsO1xuICAgICAgbGV0IGRlbHRhID0gbnVsbDtcblxuICAgICAgaWYgKGV2ZW50LmRlbHRhWSkge1xuICAgICAgICBkZWx0YSA9IGV2ZW50LmRlbHRhWSAvIDYwO1xuICAgICAgfVxuICAgICAgaWYgKGV2ZW50LmRldGFpbCkge1xuICAgICAgICBkZWx0YSA9IC1ldmVudC5kZXRhaWwgLyAyO1xuICAgICAgfVxuICAgICAgaWYgKGRlbHRhICE9PSBudWxsKSB7XG4gICAgICAgIHdoZWVsVXAgPSBkZWx0YSA+IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWZ0ZXJNb3VzZVdoZWVscyh3aGVlbFVwLCBldmVudCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFmdGVyTW91c2VXaGVlbHMod2hlZWxVcDogYW55LCBldmVudDogV2hlZWxFdmVudCkge1xuICAgIHRoaXMub25QaWNrU3RhcnRlZCh3aGVlbFVwKTtcbiAgICBpZiAod2hlZWxVcCkge1xuICAgICAgdGhpcy5vbkluY3JlYXNlKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkRlY3JlYXNlKGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5vblBpY2tTdG9wZWQod2hlZWxVcCk7XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGlmICh0aGlzLnZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heDtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgIH1cbiAgICBcbiAgICBpZiAoaXNGaW5pdGUodGhpcy52YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGVjcmVhc2UoZXZlbnQ6IE1vdXNlRXZlbnQgfCBNb3VzZVdoZWVsRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5jYW5EZWNyZWFzZSgpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5yb3VuZCgodGhpcy52YWx1ZSA+IHRoaXMubWluKSA/IHRoaXMudmFsdWUgLT0gdGhpcy5zdGVwIDogdGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluUmVhY2hlZC5lbWl0KHRydWUpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG9uSW5jcmVhc2UoZXZlbnQ6IE1vdXNlRXZlbnQgfCBNb3VzZVdoZWVsRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5jYW5JbmNyZWFzZSgpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5yb3VuZCgodGhpcy52YWx1ZSA8IHRoaXMubWF4KSA/IHRoaXMudmFsdWUgKz0gdGhpcy5zdGVwIDogdGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF4UmVhY2hlZC5lbWl0KHRydWUpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmNyZWFzZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLmFmdGVyTW91c2VEb3duKGluY3JlYXNlLCBldmVudCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXJyb3dVcERvd24oa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleUNvZGUgPT09IDM4IHx8IGtleUNvZGUgPT09IDQwO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0Fyb3dVcChrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4ga2V5Q29kZSA9PT0gMzg7XG4gIH1cblxuICBwcml2YXRlIGxvb3BQaWNrKGluY3JlYXNlOiBib29sZWFuLCBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLm9uUGlja1N0YXJ0ZWQoaW5jcmVhc2UpO1xuICAgIHRoaXMuZXZlbnRIb2xkZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY291bnRJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKGluY3JlYXNlKSB7XG4gICAgICAgICAgdGhpcy5vbkluY3JlYXNlKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uRGVjcmVhc2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLnBpY2tUaW1lcik7XG4gICAgfSwgdGhpcy5waWNrU3RhcnRBZnRlcik7XG4gIH1cblxuICBvbk1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQsIGluY3JlYXNlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuYWZ0ZXJNb3VzZVVwKGluY3JlYXNlLCBldmVudCk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc0Fycm93VXBEb3duKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCF0aGlzLmV2ZW50SG9sZGVyKSB7XG4gICAgICAgIHRoaXMubG9vcFBpY2sodGhpcy5pc0Fyb3dVcChldmVudC5rZXlDb2RlKSwgZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG9uS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc0Fycm93VXBEb3duKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5hZnRlclBpY2sodGhpcy5pc0Fyb3dVcChldmVudC5rZXlDb2RlKSk7XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlck1vdXNlRG93bih1cDogYm9vbGVhbiwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmlzTGVmdENsaWNrKGV2ZW50LndoaWNoKSkge1xuICAgICAgdGhpcy5sb29wUGljayh1cCwgZXZlbnQpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJNb3VzZVVwKHVwOiBib29sZWFuLCBldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hZnRlclBpY2sodXApO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlclBpY2sodXA6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9uUGlja1N0b3BlZCh1cCk7XG4gICAgdGhpcy5jbGVhclRpbWVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclRpbWVycygpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5ldmVudEhvbGRlcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50SW50ZXJ2YWwpO1xuICAgIHRoaXMuZXZlbnRIb2xkZXIgPSBudWxsO1xuICAgIHRoaXMuY291bnRJbnRlcnZhbCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyQXJyb3dLZXlzUHJlc3NlZCh1cDogYm9vbGVhbiwgZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHN0YXJ0OiBib29sZWFuKSB7XG4gICAgaWYgKHN0YXJ0KSB7XG4gICAgICB0aGlzLmxvb3BQaWNrKHVwLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWZ0ZXJQaWNrKHVwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJlY2lzaW9uKHN0ZXA6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIC9cXGQqJC8uZXhlYyhTdHJpbmcoc3RlcCkpWzBdLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgcm91bmQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsID8gbnVsbCA6IE1hdGgucm91bmQodmFsdWUgKiBNYXRoLnBvdygxMCwgdGhpcy5wcmVjaXNpb24pKSAvIE1hdGgucG93KDEwLCB0aGlzLnByZWNpc2lvbik7XG4gIH1cblxuICBwcml2YXRlIGNhbkluY3JlYXNlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNhbkluY3JlYXNlID0gKHRoaXMudmFsdWUgPD0gdGhpcy5tYXggLSB0aGlzLnN0ZXApO1xuICAgIGlmICghY2FuSW5jcmVhc2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heDtcbiAgICB9XG4gICAgcmV0dXJuIGNhbkluY3JlYXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5EZWNyZWFzZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjYW5EZWNyZWFzZSA9ICh0aGlzLnZhbHVlID49IHRoaXMubWluICsgdGhpcy5zdGVwKTtcbiAgICBpZiAoIWNhbkRlY3JlYXNlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgfVxuICAgIHJldHVybiBjYW5EZWNyZWFzZTtcbiAgfVxuXG4gIHByaXZhdGUgb25QaWNrU3RhcnRlZChpbmNyZWFzZTogYm9vbGVhbikge1xuICAgIGlmIChpbmNyZWFzZSkge1xuICAgICAgaWYgKHRoaXMuY2FuSW5jcmVhc2UoKSkge1xuICAgICAgICB0aGlzLnBpY2tTdGFydGVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMucGlja1VwU3RhcnRlZC5lbWl0KHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jYW5EZWNyZWFzZSgpKSB7XG4gICAgICAgIHRoaXMucGlja1N0YXJ0ZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgdGhpcy5waWNrRG93blN0YXJ0ZWQuZW1pdCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uUGlja1N0b3BlZChpbmNyZWFzZTogYm9vbGVhbikge1xuICAgIGlmIChpbmNyZWFzZSkge1xuICAgICAgaWYgKHRoaXMuY2FuSW5jcmVhc2UoKSkge1xuICAgICAgICB0aGlzLnBpY2tVcFN0b3BlZC5lbWl0KHRydWUpO1xuICAgICAgICB0aGlzLnBpY2tTdG9wZWQuZW1pdCh0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2FuRGVjcmVhc2UoKSkge1xuICAgICAgICB0aGlzLnBpY2tEb3duU3RvcGVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMucGlja1N0b3BlZC5lbWl0KHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNMZWZ0Q2xpY2sod2l0Y2g6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB3aXRjaCA9PT0gMTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBpY2tlcigpOiB2b2lkIHtcbiAgICB0aGlzLm1pbiA9IHRoaXMucGFyc2VWYWwodGhpcy5taW4pIHx8IHRoaXMubnVtYmVyUGlja2VyU2VydmljZS5taW47XG4gICAgdGhpcy5tYXggPSB0aGlzLnBhcnNlVmFsKHRoaXMubWF4KSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2UubWF4O1xuICAgIHRoaXMuc3RlcCA9IHRoaXMucGFyc2VWYWwodGhpcy5zdGVwKSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2Uuc3RlcDtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJzZVZhbCh0aGlzLnZhbHVlKSB8fCB0aGlzLm51bWJlclBpY2tlclNlcnZpY2UudmFsdWU7XG4gICAgdGhpcy5waWNrU3RhcnRBZnRlciA9IHRoaXMucGFyc2VWYWwodGhpcy5waWNrU3RhcnRBZnRlcikgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLnBpY2tTdGFydEFmdGVyO1xuICAgIHRoaXMucGlja1RpbWVyID0gdGhpcy5wYXJzZVZhbCh0aGlzLnBpY2tUaW1lcikgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLnBpY2tUaW1lcjtcbiAgICB0aGlzLnByZWNpc2lvbiA9IHRoaXMuZ2V0UHJlY2lzaW9uKHRoaXMuc3RlcCkgfHwgdGhpcy5udW1iZXJQaWNrZXJTZXJ2aWNlLnByZWNpc2lvbjtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5yb3VuZCh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkID8gdGhpcy5wbGFjZWhvbGRlciA6ICcnO1xuICB9XG5cbn1cbiJdfQ==