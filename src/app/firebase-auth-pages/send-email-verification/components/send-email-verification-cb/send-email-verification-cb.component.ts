import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-email-verification-cb',
  templateUrl: './send-email-verification-cb.component.html',
  styleUrls: ['./send-email-verification-cb.component.css']
})
export class SendEmailVerificationCbComponent implements OnInit {

  @Input() debug: boolean = false;
  public code = "";
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  confirmar() {
    this.router.navigate(['auth/apply-action-code/:code', this.getCode(this.code)]);
  }

  protected getCode(_code: any) {
    let code = _code.split('&')[1].substring("oobCode=".length);
    return code;
  }

}
