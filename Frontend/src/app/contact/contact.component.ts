import { Component } from '@angular/core';
import { ContactService } from './contact.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', [Validators.required]],
  });

  onSubmit() {
     this.contactService.sendEmail(this.contactForm.value)
  }
}
