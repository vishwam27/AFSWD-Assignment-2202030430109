// Real-time form validation utilities using HTML5 Constraint Validation API
import React from 'react';
export class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = new Map();
    this.setupValidation();
  }

  setupValidation() {
    if (!this.form) return;

    // Add event listeners for real-time validation
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    
    // Clear previous errors
    this.clearFieldError(field);

    // HTML5 validation first
    if (!field.checkValidity()) {
      this.setFieldError(field, field.validationMessage);
      return false;
    }

    // Custom validation rules
    const validationRules = {
      email: this.validateEmail,
      password: this.validatePassword,
      confirmPassword: this.validateConfirmPassword,
      name: this.validateName,
      phone: this.validatePhone
    };

    const validator = validationRules[fieldName] || validationRules[field.type];
    if (validator) {
      const result = validator.call(this, value, field);
      if (!result.isValid) {
        this.setFieldError(field, result.message);
        return false;
      }
    }

    this.setFieldSuccess(field);
    return true;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true };
  }

  validatePassword(password) {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true };
  }

  validateConfirmPassword(confirmPassword, field) {
    const passwordField = this.form.querySelector('input[name="password"]');
    if (!passwordField) {
      return { isValid: true };
    }
    
    if (confirmPassword !== passwordField.value) {
      return { isValid: false, message: 'Passwords do not match' };
    }
    return { isValid: true };
  }

  validateName(name) {
    if (name.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true };
  }

  validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return { isValid: false, message: 'Please enter a valid phone number' };
    }
    return { isValid: true };
  }

  setFieldError(field, message) {
    const fieldName = field.name;
    this.errors.set(fieldName, message);
    
    // Update field styling
    field.classList.add('input-error');
    field.classList.remove('input-success');
    
    // Show error message
    this.showFieldMessage(field, message, 'error');
  }

  setFieldSuccess(field) {
    const fieldName = field.name;
    this.errors.delete(fieldName);
    
    // Update field styling
    field.classList.add('input-success');
    field.classList.remove('input-error');
    
    // Hide error message
    this.hideFieldMessage(field);
  }

  clearFieldError(field) {
    const fieldName = field.name;
    this.errors.delete(fieldName);
    
    // Reset field styling
    field.classList.remove('input-error', 'input-success');
    
    // Hide messages
    this.hideFieldMessage(field);
  }

  showFieldMessage(field, message, type) {
    const existingMessage = field.parentNode.querySelector('.field-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `field-message ${type === 'error' ? 'error-message' : 'success-message'}`;
    messageElement.textContent = message;
    
    field.parentNode.appendChild(messageElement);
  }

  hideFieldMessage(field) {
    const existingMessage = field.parentNode.querySelector('.field-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  getErrors() {
    return Object.fromEntries(this.errors);
  }

  hasErrors() {
    return this.errors.size > 0;
  }
}

// React hook for form validation
export const useFormValidation = (initialValues = {}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = (name, value) => {
    const validator = new FormValidator();
    const mockField = { name, value, type: name };
    
    // Create a mock form for validation
    const mockForm = {
      querySelector: (selector) => {
        if (selector.includes('password') && name === 'confirmPassword') {
          return { value: values.password };
        }
        return null;
      }
    };
    
    validator.form = mockForm;
    const isValid = validator.validateField(mockField);
    
    return {
      isValid,
      error: validator.errors.get(name) || null
    };
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const { error } = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const { error } = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(name => {
      const { error } = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  };
};
