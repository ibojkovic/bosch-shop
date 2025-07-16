import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

register() {
  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    return;
  }

  this.userService.register(this.username, this.password).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: () => {
      this.errorMessage = 'Registration failed. Try again.';
    }
  });
}

}
