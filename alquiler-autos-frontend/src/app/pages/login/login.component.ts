import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  modoRegistro = false;

 
  rolesDisponibles: string[] = [
    'Administrador',
    'Adminisrador de Datos',
    'Gerente',
    'Jefe de Ventas'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required] 
    });
  }

  toggleModo(): void {
    this.modoRegistro = !this.modoRegistro;
    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
    this.loginForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, rol } = this.loginForm.value;

    if (this.modoRegistro) {
     
      this.authService.register(username, password, rol).subscribe({
        next: (msg) => {
          this.successMessage = msg;
          this.toggleModo(); 
        },
        error: (err) => {
          console.error('❌ Error de registro:', err);
          this.errorMessage = err.error || 'Error al registrar el usuario.';
        }
      });
    } else {
      
      this.authService.login(username, password, rol).subscribe({
        next: (response) => {
          console.log('✅ Login exitoso', response);
         
          localStorage.setItem('rol', rol);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('❌ Error de login:', err);
          this.errorMessage = 'Usuario, contraseña o rol inválidos.';
        }
      });
    }
  }
}
