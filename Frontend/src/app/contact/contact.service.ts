import { Injectable } from '@angular/core';
import * as EmailJS from 'emailjs-com';

// Rest of your code

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  // user: 'alpineedgestore@gmail.com',
  // pass: 'alpine123456',

  sendEmail(email: any) {
    const emailParams = {
      to_email: email.email,
      from_name: email.name,
      subject: email.subject,
      message: email.message,
    };

    EmailJS.send(
      'service_1wioyqd',
      'template_pcvv0fs',
      emailParams,
      'wMaYv5oAsm4qBGB8N'
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  }
}
