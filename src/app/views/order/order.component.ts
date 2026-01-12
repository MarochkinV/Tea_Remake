import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../shared/services/products.service';
import {OrderData} from "../../../types/order.data";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  public productName: string = '';
  public isSubmitted: boolean = false;
  public isSuccess: boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.orderForm = this.createForm();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.orderForm.controls;
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.productName = params['product'];
        this.orderForm.patchValue({
          product: this.productName
        });
      }
    });
  }

  public onlyLettersValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    return regex.test(value) ? null : {onlyLetters: true};
  }

  public phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const validCharsRegex = /^[+\d]+$/;
    if (!validCharsRegex.test(value)) {
      return {invalidPhoneChars: true};
    }

    const digitsOnly = value.replace('+', '');
    const digitCount = digitsOnly.replace(/\D/g, '').length;

    if (digitCount !== 11) {
      return {invalidPhoneLength: true};
    }

    if (value.includes('+') && value.indexOf('+') !== 0) {
      return {invalidPlusPosition: true};
    }

    const plusCount = (value.match(/\+/g) || []).length;
    if (plusCount > 1) {
      return {multiplePlus: true};
    }

    return null;
  }

  public addressValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-\/]+$/;
    return regex.test(value) ? null : {invalidAddress: true};
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.orderForm.invalid) {
      return;
    }

    this.isLoading = true;

    const formData = this.orderForm.getRawValue();

    const orderData: OrderData = {
      name: formData.name,
      last_name: formData.last_name,
      phone: formData.phone,
      country: formData.country,
      zip: formData.zip,
      product: formData.product,
      address: formData.address,
      comment: formData.comment || ''
    };

    this.productsService.createOrder(orderData).subscribe({
      next: (response): void => {
        this.isLoading = false;
        if (response.success === 1) {
          this.isSuccess = true;
        } else {
          this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
        }
      },
      error: (): void => {
        this.isLoading = false;
        this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator
      ]],
      last_name: ['', [
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator
      ]],
      phone: ['', [
        Validators.required,
        this.phoneValidator
      ]],
      country: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      zip: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]],
      product: [{value: '', disabled: true}, Validators.required],
      address: ['', [
        Validators.required,
        Validators.minLength(5),
        this.addressValidator
      ]],
      comment: ['']
    });
  }
}
