/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class NumberPickerService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbnVtYmVyLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsTUFBTSxPQUFPLG1CQUFtQjtJQURoQzs7OztRQUtFLFFBQUcsR0FBRyxDQUFDLENBQUM7Ozs7UUFJUixRQUFHLEdBQUcsR0FBRyxDQUFDOzs7O1FBSVYsU0FBSSxHQUFHLENBQUMsQ0FBQzs7OztRQUlULG1CQUFjLEdBQUcsR0FBRyxDQUFDOzs7O1FBSXJCLGNBQVMsR0FBRyxHQUFHLENBQUM7Ozs7UUFJaEIsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQUlkLFVBQUssR0FBRyxJQUFJLENBQUM7SUFDZixDQUFDOzs7WUE5QkEsVUFBVTs7Ozs7OztJQUtULGtDQUFROzs7OztJQUlSLGtDQUFVOzs7OztJQUlWLG1DQUFTOzs7OztJQUlULDZDQUFxQjs7Ozs7SUFJckIsd0NBQWdCOzs7OztJQUloQix3Q0FBYzs7Ozs7SUFJZCxvQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJ1dHRvbnNPcmllbnRhdGlvblR5cGUsIHNpemVUeXBlIH0gZnJvbSAnLi9udW1iZXItcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBDdXN0b21DbGFzc2VzIH0gZnJvbSAnLi9udW1iZXItcGlja2VyLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOdW1iZXJQaWNrZXJTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIE1pbiBwaWNrZXIgdmFsdWVcbiAgICovXG4gIG1pbiA9IDA7XG4gIC8qKlxuICAgKiBNYXggcGlja2VyIHZhbHVlXG4gICAqL1xuICBtYXggPSAxMDA7XG4gIC8qKlxuICAgKiBQaWNrIHN0ZXAgdmFsdWVcbiAgICovXG4gIHN0ZXAgPSAxO1xuICAvKipcbiAgICogRGVsYXkgZm9yIHN0YXJ0IHBpY2tpbmcgdmFsdWVzXG4gICAqL1xuICBwaWNrU3RhcnRBZnRlciA9IDUwMDtcbiAgLyoqXG4gICAqIERlbGF5IGJldHdlZW5zIGVhY2ggcGlja1xuICAgKi9cbiAgcGlja1RpbWVyID0gMTAwO1xuICAvKipcbiAgICogdmFsdWUgcHJlY2lzaW9uXG4gICAqL1xuICBwcmVjaXNpb24gPSAxO1xuICAvKipcbiAgICogSW5pdGFsIHBpY2tlciB2YWx1ZVxuICAgKi9cbiAgdmFsdWUgPSBudWxsO1xufVxuIl19