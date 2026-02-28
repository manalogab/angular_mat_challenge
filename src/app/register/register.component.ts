import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

// Custom validator: born in 2006 or earlier
function birthDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const year = new Date(control.value).getFullYear();
  if (year > 2006) {
    return { tooYoung: true };
  }
  return null;
}

// Custom validator: passwords must match
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (password && confirm && password !== confirm) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  isDarkMode = false;
  hidePassword = true;
  hideConfirm = true;
  submitted = false;
  isSubmitting = false;
  studyHours = 4;
  maxDate = new Date(2006, 11, 31); // Dec 31, 2006

  submittedData: any = null;
  selectedSubjects: string[] = [];

  subjectList = ['Mathematics', 'Programming', 'Networking', 'Database', 'Web Dev', 'Mobile Dev', 'AI/ML', 'Cybersecurity'];

  schools = [
    'University of the Philippines',
    'Ateneo de Manila University',
    'De La Salle University',
    'University of Santo Tomas',
    'Far Eastern University',
    'Mapua University',
    'Polytechnic University of the Philippines',
    'Technological University of the Philippines',
    'National University',
    'Adamson University'
  ];
  filteredSchools: string[] = [];

  // Form Groups
  personalInfo = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl(null, [Validators.required, birthDateValidator]),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)])
  });

  academicInfo = new FormGroup({
    school: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    yearLevel: new FormControl('', Validators.required),
    subjects: new FormControl([]),
    studyHours: new FormControl(4)
  });

  accountInfo = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{7,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required),
    emailNotifs: new FormControl(true),
    terms: new FormControl(false, Validators.requiredTrue)
  }, { validators: passwordMatchValidator });

  formdata = new FormGroup({
    personalInfo: this.personalInfo,
    academicInfo: this.academicInfo,
    accountInfo: this.accountInfo
  });

  ngOnInit(): void {
    this.filteredSchools = this.schools;

    this.academicInfo.get('school')?.valueChanges.subscribe(val => {
      this.filteredSchools = this.schools.filter(s =>
        s.toLowerCase().includes((val || '').toLowerCase())
      );
    });
  }

  toggleSubject(subject: string): void {
    const idx = this.selectedSubjects.indexOf(subject);
    if (idx >= 0) {
      this.selectedSubjects.splice(idx, 1);
    } else {
      this.selectedSubjects.push(subject);
    }
    this.academicInfo.get('subjects')?.setValue(this.selectedSubjects as never[]);
  }

  get passwordStrength(): number {
    const pwd = this.accountInfo.get('password')?.value || '';
    if (pwd.length === 0) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.length >= 12) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    return strength;
  }

  get passwordStrengthColor(): string {
    if (this.passwordStrength <= 25) return 'warn';
    if (this.passwordStrength <= 50) return 'accent';
    return 'primary';
  }

  get passwordStrengthLabel(): string {
    if (this.passwordStrength <= 25) return 'Weak';
    if (this.passwordStrength <= 50) return 'Fair';
    if (this.passwordStrength <= 75) return 'Good';
    return 'Strong';
  }

  onSubmit(): void {
    if (this.formdata.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.submitted = true;
        this.isSubmitting = false;
        this.submittedData = this.formdata.value;
        console.log('Registered:', this.submittedData);
      }, 1000);
    } else {
      this.formdata.markAllAsTouched();
    }
  }
}