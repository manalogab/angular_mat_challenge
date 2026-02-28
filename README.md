# Angular Material Challenge — EduPortal Student Registration

A polished multi-step student registration form built with Angular Material and Reactive Forms.

## 🚀 Live Demo
Deployed on Vercel/Netlify — link here after deployment.

## ✅ Features

### Validations
- **Password**: Alphanumeric only, min 8 characters, must start with a letter (`/^[a-zA-Z][a-zA-Z0-9]{7,}$/`)
- **Date of Birth**: Only accepts users born in **2006 or earlier** (custom validator)
- **Email**: Valid email format required
- **Phone**: Valid PH phone number format (09XXXXXXXXX)
- **Terms & Conditions**: Must be toggled ON to submit

### Angular Material Components Used
| Component | Usage |
|---|---|
| MatStepper | 3-step registration wizard |
| MatFormField + MatInput | All text inputs |
| MatRadioGroup | Gender selection |
| MatDatepicker | Date of birth |
| MatSlider | Study hours per day |
| MatSlideToggle | Dark/light mode + notifications + T&C |
| MatAutocomplete | School search |
| MatSelect | Course & year level dropdowns |
| MatChips | Subjects of interest |
| MatProgressBar | Password strength indicator |
| MatCard | Success result display |
| MatList + MatDivider | Submitted data list |
| MatIcon | Icons throughout the form |
| MatButton | Submit, Next, Back buttons |
| MatTooltip | Helpful hints |
| MatSnackBar | Imported (available for use) |

### Extra Features
- 🌙 **Dark / Light Mode Toggle** with smooth transitions
- 🔐 **Password strength meter** (Weak / Fair / Good / Strong)
- 📋 **Multi-step Stepper** with validation per step
- ✅ **Success card** with submitted data shown after valid submission
- 📱 **Responsive** — works on mobile

## 🛠️ Setup

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200`

## 📁 Project Structure
```
src/
  app/
    register/
      register.component.html   # Template
      register.component.ts     # Logic + validators
      register.component.css    # Styles + dark mode
    app.component.ts
    app.module.ts
  index.html
  main.ts
  styles.css
.gitignore
angular.json
package.json
tsconfig.json
```

## 📦 Deployment (Vercel)
1. Push to GitHub
2. Go to https://vercel.com → New Project → Import your repo
3. Framework: Angular → Deploy
