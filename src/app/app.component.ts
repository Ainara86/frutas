import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frutas';

  constructor(private loginService: LoginService, private router: Router) {

  }

 ngOnInit() {

 }

 logOut(){
   this.loginService.logout();
   this.router.navigate(['login']);
 }
}
