/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
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
        { type: Injectable }
    ];
    return NumberPickerService;
}());
export { NumberPickerService };
if (false) {
    /**
     * Min picker value
     * @type {?}
     */
    NumberPickerService.prototype.min;
    /**
     * Max picker value
     * @type {?}
     */
    NumberPickerService.prototype.max;
    /**
     * Pick step value
     * @type {?}
     */
    NumberPickerService.prototype.step;
    /**
     * Delay for start picking values
     * @type {?}
     */
    NumberPickerService.prototype.pickStartAfter;
    /**
     * Delay betweens each pick
     * @type {?}
     */
    NumberPickerService.prototype.pickTimer;
    /**
     * value precision
     * @type {?}
     */
    NumberPickerService.prototype.precision;
    /**
     * Inital picker value
     * @type {?}
     */
    NumberPickerService.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbnVtYmVyLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0M7SUFBQTs7OztRQUtFLFFBQUcsR0FBRyxDQUFDLENBQUM7Ozs7UUFJUixRQUFHLEdBQUcsR0FBRyxDQUFDOzs7O1FBSVYsU0FBSSxHQUFHLENBQUMsQ0FBQzs7OztRQUlULG1CQUFjLEdBQUcsR0FBRyxDQUFDOzs7O1FBSXJCLGNBQVMsR0FBRyxHQUFHLENBQUM7Ozs7UUFJaEIsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQUlkLFVBQUssR0FBRyxJQUFJLENBQUM7SUFDZixDQUFDOztnQkE5QkEsVUFBVTs7SUE4QlgsMEJBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTdCWSxtQkFBbUI7Ozs7OztJQUk5QixrQ0FBUTs7Ozs7SUFJUixrQ0FBVTs7Ozs7SUFJVixtQ0FBUzs7Ozs7SUFJVCw2Q0FBcUI7Ozs7O0lBSXJCLHdDQUFnQjs7Ozs7SUFJaEIsd0NBQWM7Ozs7O0lBSWQsb0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBidXR0b25zT3JpZW50YXRpb25UeXBlLCBzaXplVHlwZSB9IGZyb20gJy4vbnVtYmVyLXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgQ3VzdG9tQ2xhc3NlcyB9IGZyb20gJy4vbnVtYmVyLXBpY2tlci5jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnVtYmVyUGlja2VyU2VydmljZSB7XG4gIC8qKlxuICAgKiBNaW4gcGlja2VyIHZhbHVlXG4gICAqL1xuICBtaW4gPSAwO1xuICAvKipcbiAgICogTWF4IHBpY2tlciB2YWx1ZVxuICAgKi9cbiAgbWF4ID0gMTAwO1xuICAvKipcbiAgICogUGljayBzdGVwIHZhbHVlXG4gICAqL1xuICBzdGVwID0gMTtcbiAgLyoqXG4gICAqIERlbGF5IGZvciBzdGFydCBwaWNraW5nIHZhbHVlc1xuICAgKi9cbiAgcGlja1N0YXJ0QWZ0ZXIgPSA1MDA7XG4gIC8qKlxuICAgKiBEZWxheSBiZXR3ZWVucyBlYWNoIHBpY2tcbiAgICovXG4gIHBpY2tUaW1lciA9IDEwMDtcbiAgLyoqXG4gICAqIHZhbHVlIHByZWNpc2lvblxuICAgKi9cbiAgcHJlY2lzaW9uID0gMTtcbiAgLyoqXG4gICAqIEluaXRhbCBwaWNrZXIgdmFsdWVcbiAgICovXG4gIHZhbHVlID0gbnVsbDtcbn1cbiJdfQ==