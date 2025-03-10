(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-number-picker', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-number-picker'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NumberPickerService = /** @class */ (function () {
        function NumberPickerService() {
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
        NumberPickerService.decorators = [
            { type: core.Injectable }
        ];
        return NumberPickerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.valueChange = new core.EventEmitter();
            this.minReached = new core.EventEmitter();
            this.maxReached = new core.EventEmitter();
            this.pickStarted = new core.EventEmitter();
            this.pickStoped = new core.EventEmitter();
            this.pickUpStarted = new core.EventEmitter();
            this.pickUpStoped = new core.EventEmitter();
            this.pickDownStarted = new core.EventEmitter();
            this.pickDownStoped = new core.EventEmitter();
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
                if (increase === void 0) {
                    increase = true;
                }
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
                this.eventHolder = setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.countInterval = setInterval(( /**
                     * @return {?}
                     */function () {
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
                if (increase === void 0) {
                    increase = true;
                }
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
                this.min = isFinite(this.value) ? this.parseVal(this.min) : this.numberPickerService.min;
                this.max = isFinite(this.value) ? this.parseVal(this.max) : this.numberPickerService.max;
                this.step = this.parseVal(this.step) || this.numberPickerService.step;
                this.value = isFinite(this.value) ? this.parseVal(this.value) : this.numberPickerService.value;
                this.pickStartAfter = this.parseVal(this.pickStartAfter) || this.numberPickerService.pickStartAfter;
                this.pickTimer = this.parseVal(this.pickTimer) || this.numberPickerService.pickTimer;
                this.precision = this.getPrecision(this.step) || this.numberPickerService.precision;
                this.value = this.round(this.value);
                this.placeholder = this.placeholder !== undefined ? this.placeholder : '';
            };
        NumberPickerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng-number-picker',
                        template: "\n  <div class=\"input-group mb-3 input-{{size}} {{customClass.container}}\">\n  <!-- Horizontal decrease button orientation -->\n  <div class=\"input-group-prepend\" *ngIf=\"isHorizontal() && showDownButton\">\n    <span class=\"input-group-text decrease {{customClass.down}}\" (click)=\"onDecrease($event)\"\n    (mouseup)=\"onMouseUp($event, false)\" (mousedown)=\"onMouseDown($event, false)\">-</span>\n  </div>\n  <!-- Input prefix -->\n  <div *ngIf=\"prefix\" class=\"input-group-prepend\">\n    <span class=\"input-group-text {{customClass.prefix}}\">{{prefix}}</span>\n  </div>\n  <input type=\"number\" class=\"form-control\" name=\"input-spin-val\"\n  [(ngModel)]=\"value\"\n  [readOnly]=\"inputReadOnly\"\n  (blur)=\"onBlur($event)\"\n  (focus)=\"onFocus($event)\"\n  (mousewheel)=\"mouseWheel && onMouseWheel($event)\"\n  (keyup)=\"arrowKeys && onKeyUp($event)\"\n  (keydown)=\"arrowKeys && onKeyDown($event)\"\n  (keydown.arrowup)=\"arrowKeys && onIncrease($event)\"\n  (keydown.arrowdown)=\"arrowKeys && onDecrease($event)\"\n  (change)=\"onValueChange($event)\"\n  [placeholder]=\"placeholder\"\n  >\n  <!-- Input postfix -->\n  <div *ngIf=\"postfix\" class=\"input-group-prepend\">\n    <span class=\"input-group-text {{customClass.postfix}}\" [style.borderLeft]=\"'0'\">{{postfix}}</span>\n  </div>\n  <!-- Horizontal increase button orientation -->\n  <div class=\"input-group-prepend\" *ngIf=\"isHorizontal() && showUpButton\">\n    <span class=\"input-group-text increase {{customClass.up}}\" [style.borderLeft]=\"(!postfix) ? '0' : ''\" (click)=\"onIncrease($event)\"\n    (mouseup)=\"onMouseUp($event)\" (mousedown)=\"onMouseDown($event)\">+</span>\n  </div>\n  <!-- Vertical buttons orientation -->\n  <div class=\"input-group-append\" *ngIf=\"!isHorizontal()\">\n    <span class=\"input-group-text vertical p-0\">\n      <span *ngIf=\"showUpButton\" class=\"{{customClass.up}}\" (click)=\"onIncrease($event)\" (mouseup)=\"onMouseUp($event)\"\n      (mousedown)=\"onMouseDown($event)\">+</span>\n      <span *ngIf=\"showDownButton\" class=\"{{customClass.down}}\" (click)=\"onDecrease($event)\" (mouseup)=\"onMouseUp($event, false)\"\n      (mousedown)=\"onMouseDown($event, false)\">-</span>\n    </span>\n  </div>\n</div>\n  ",
                        styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}.decrease:hover,.increase:hover{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;background-color:#d8d8d8}.increase{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important}.vertical{display:flex;justify-content:center;flex-direction:column;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vertical span{line-height:15px}.input-md .vertical span,.input-sm .vertical span{padding:2px 10px}.input-lg .vertical span{padding:4px 10px}.input-xlg .vertical span{padding:7px 10px}.input-md,.input-medium{height:45px}.input-large,.input-lg{height:50px}.input-xlarge,.input-xlg{height:75px}.input-md input,.input-md span,.input-medium input,.input-medium span{font-size:22px}.input-large input,.input-large span,.input-lg input,.input-lg span{font-size:25px}.input-xlarge input,.input-xlarge span,.input-xlg input,.input-xlg span{font-size:38px}"]
                    }] }
        ];
        /** @nocollapse */
        NumberPickerComponent.ctorParameters = function () {
            return [
                { type: NumberPickerService }
            ];
        };
        NumberPickerComponent.propDecorators = {
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            step: [{ type: core.Input }],
            value: [{ type: core.Input }],
            pickStartAfter: [{ type: core.Input }],
            pickTimer: [{ type: core.Input }],
            prefix: [{ type: core.Input }],
            postfix: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            buttonsOrientation: [{ type: core.Input }],
            size: [{ type: core.Input }],
            customClass: [{ type: core.Input }],
            mouseWheel: [{ type: core.Input }],
            arrowKeys: [{ type: core.Input }],
            inputReadOnly: [{ type: core.Input }],
            showUpButton: [{ type: core.Input }],
            showDownButton: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            minReached: [{ type: core.Output }],
            maxReached: [{ type: core.Output }],
            pickStarted: [{ type: core.Output }],
            pickStoped: [{ type: core.Output }],
            pickUpStarted: [{ type: core.Output }],
            pickUpStoped: [{ type: core.Output }],
            pickDownStarted: [{ type: core.Output }],
            pickDownStoped: [{ type: core.Output }]
        };
        return NumberPickerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NumberPickerModule = /** @class */ (function () {
        function NumberPickerModule() {
        }
        NumberPickerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule
                        ],
                        providers: [NumberPickerService],
                        declarations: [NumberPickerComponent],
                        exports: [NumberPickerComponent]
                    },] }
        ];
        return NumberPickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NumberPickerService = NumberPickerService;
    exports.NumberPickerComponent = NumberPickerComponent;
    exports.NumberPickerModule = NumberPickerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-number-picker.umd.js.map