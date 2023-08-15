import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  hasUppercase(value:string): boolean {
    const hasUppercase = /[A-Z]/.test(value);
    return hasUppercase;
  }
  hasLowercase(value:string): boolean {
    const hasUppercase = /[a-z]/.test(value);
    return hasUppercase;
  }
  hasNonAlphanumeric(value:string): boolean {
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(value);
    return hasNonAlphanumeric;
  }
  isMinOfSixChar(value:string): boolean {
    const isMinOfSixChar = value.length >= 6;
    return isMinOfSixChar;
  }
}
