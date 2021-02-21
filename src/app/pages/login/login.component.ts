import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',   //templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = {} as UserModel;
  recordarme = false;
  errMsg = "";
  
  constructor(private authLogin: AuthService,
    private router: Router, public authService: AuthService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
  }
  loginGmail(){

    this.authLogin.GoogleAuth().then(val=>{
      this.router.navigateByUrl('/home');
    }).catch(error =>{
      this.router.navigateByUrl('/register');
    })
  }
  recoveryPass(mail: string){
    this.errMsg = "";
    Swal
    .fire({
        title: "Inserta tu email",
        input: "email",
        showCancelButton: true,
        confirmButtonText: "Recuperar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            let email = resultado.value;
          
            Swal.fire("Enviando mensaje a ",email,"info");
            this.authService.recoveryPassword(email).then(()=>{
              this.errMsg = "Email enviado a "+email;
              this.user.email ="";
              this.user.password ="";
              Swal.close();
              Swal.fire("Mensaje Enviado ",email,"success");
          }).catch((error) => {
            // An error happened.
            this.errMsg = "Email NO enviado!: "+ error.message;
            Swal.close();
            Swal.fire("Mensaje No Enviado ",error.message,"error");
          }).finally( ()=>{
            //Swal.close();
          });
           
        }
    });
     
  }
  loginFace(){

    this.authLogin.FacebookAuth().then(val=>{
      this.router.navigateByUrl('/home');
    }).catch(error =>{
      this.router.navigateByUrl('/register');
    })
  }

  async onLogin(form: NgForm) {
    this.errMsg = "";
    if ( !form.valid ) {
      this.errMsg = "Tus datos contienen algún error.";
     return;
    }
    try {
      const user = await this.authService.login(this.user);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  private checkUserIsVerified(user: UserModel) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/verification']);
    } else {
      this.router.navigate(['/register']);
    }
  }
 /* login(form: NgForm) {
    this.errMsg = "";
    if ( !form.valid ) {
      this.errMsg = "Tus datos contienen algún error.";
     return;
    }
    Swal.fire('Autenticando','Espera por Favor','info');
    Swal.showLoading();
    this.authLogin.login( this.user ).subscribe(
     resp => {
      //console.log("USERDATA!",resp);
       Swal.close();
       this.router.navigateByUrl('/home');
       

       if ( this.recordarme ) {
          localStorage.setItem('email', this.user.email);
       }
     }, (err) => {
       if(err.error.error.message == "INVALID_PASSWORD" || err.error.error.message == "INVALID_EMAIL")
        this.errMsg = "Email o contraseña invalidos";
        else if(err.error.error.message == "EMAIL_NOT_FOUND")
        this.errMsg = "No estas registrado";
        else
        this.errMsg = "Intenta más tarde";
        Swal.fire('Error de autenticación',this.errMsg,'error');

        console.log(err.error.error.message);
     }
    );
    console.log(form);
  }*/
}
