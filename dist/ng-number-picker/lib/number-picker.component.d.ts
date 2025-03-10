import { OnInit, EventEmitter } from '@angular/core';
import { buttonsOrientationType, sizeType, CustomClasses } from './number-picker.config';
import { NumberPickerService } from './number-picker.service';
export declare class NumberPickerComponent implements OnInit {
    private numberPickerService;
    private precision;
    private eventHolder;
    private countInterval;
    private isInputFocused;
    min: number;
    max: number;
    step: number;
    value: number;
    pickStartAfter: number;
    pickTimer: number;
    prefix: string;
    postfix: string;
    placeholder: string;
    buttonsOrientation: buttonsOrientationType;
    size: sizeType;
    customClass: CustomClasses;
    mouseWheel: boolean;
    arrowKeys: boolean;
    inputReadOnly: boolean;
    showUpButton: boolean;
    showDownButton: boolean;
    valueChange: EventEmitter<number>;
    minReached: EventEmitter<boolean>;
    maxReached: EventEmitter<boolean>;
    pickStarted: EventEmitter<boolean>;
    pickStoped: EventEmitter<boolean>;
    pickUpStarted: EventEmitter<boolean>;
    pickUpStoped: EventEmitter<boolean>;
    pickDownStarted: EventEmitter<boolean>;
    pickDownStoped: EventEmitter<boolean>;
    constructor(numberPickerService: NumberPickerService);
    ngOnInit(): void;
    isHorizontal(): boolean;
    onFocus(event: FocusEvent): void;
    onBlur(event: Event): void;
    onMouseWheel(event: MouseWheelEvent): void;
    private afterMouseWheels;
    onValueChange(event: Event): void;
    onDecrease(event: MouseEvent | MouseWheelEvent | KeyboardEvent): void;
    onIncrease(event: MouseEvent | MouseWheelEvent | KeyboardEvent): void;
    onMouseDown(event: MouseEvent, increase?: boolean): void;
    private isArrowUpDown;
    private isArowUp;
    private loopPick;
    onMouseUp(event: MouseEvent, increase?: boolean): void;
    onKeyDown(event: KeyboardEvent): void;
    onKeyUp(event: KeyboardEvent): void;
    private afterMouseDown;
    private afterMouseUp;
    private afterPick;
    private clearTimers;
    private afterArrowKeysPressed;
    private parseVal;
    private getPrecision;
    private round;
    private canIncrease;
    private canDecrease;
    private onPickStarted;
    private onPickStoped;
    private isLeftClick;
    private initPicker;
}
