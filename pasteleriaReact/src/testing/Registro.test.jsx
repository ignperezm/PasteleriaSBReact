import { describe, test, expect } from 'vitest';

// Import de efecto lateral: define window.RegistroLogic (no destructurar)
import '../components/Registro.logic.js';

// Pruebas de la lógica pura de Registro expuesta en window.RegistroLogic

describe('RegistroLogic (funciones puras)', () => {
  test('API expuesta en window', () => {
    expect(window.RegistroLogic).toBeDefined();
    expect(typeof window.RegistroLogic.initialState).toBe('function');
    expect(typeof window.RegistroLogic.handleChange).toBe('function');
    expect(typeof window.RegistroLogic.togglePassword).toBe('function');
    expect(typeof window.RegistroLogic.resetForm).toBe('function');
    expect(typeof window.RegistroLogic.validateSubmit).toBe('function');
  });

  // initialState()
  describe('initialState()', () => {
    test('retorna objeto con valores por defecto', () => {
      const s = window.RegistroLogic.initialState();
      expect(s).toEqual({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
      });
    });

    test('retorna copia nueva en cada llamada', () => {
      const a = window.RegistroLogic.initialState();
      const b = window.RegistroLogic.initialState();
      a.nombre = 'x';
      expect(b.nombre).toBe('');
    });

    test('objetos resultantes no comparten referencias', () => {
      const a = window.RegistroLogic.initialState();
      const b = window.RegistroLogic.initialState();
      a.showPassword = true;
      expect(b.showPassword).toBe(false);
    });
  });

  // handleChange(prev, name, value)
  describe('handleChange(prev, name, value)', () => {
    test('actualiza el campo indicado', () => {
      const prev = window.RegistroLogic.initialState();
      const next = window.RegistroLogic.handleChange(prev, 'nombre', 'Nico');
      expect(next.nombre).toBe('Nico');
      expect(prev.nombre).toBe(''); // no muta el previo
    });

    test('name inválido retorna estado sin cambios', () => {
      const prev = window.RegistroLogic.initialState();
      prev.nombre = 'Ana';
      const next = window.RegistroLogic.handleChange(prev, null, 'X');
      expect(next).toEqual(prev);
    });

    test('value null/undefined guarda cadena vacía', () => {
      const prev = window.RegistroLogic.initialState();
      const next = window.RegistroLogic.handleChange(prev, 'email', undefined);
      expect(next.email).toBe('');
    });
  });

  // togglePassword(prev, field)
  describe('togglePassword(prev, field)', () => {
    test('alterna showPassword cuando field válido', () => {
      const prev = window.RegistroLogic.initialState();
      const next = window.RegistroLogic.togglePassword(prev, 'showPassword');
      expect(next.showPassword).toBe(true);
      expect(prev.showPassword).toBe(false); // no muta el previo
    });

    test('alterna showConfirmPassword cuando field válido', () => {
      const prev = window.RegistroLogic.initialState();
      const next = window.RegistroLogic.togglePassword(prev, 'showConfirmPassword');
      expect(next.showConfirmPassword).toBe(true);
    });

    test('field inválido retorna estado sin cambios', () => {
      const prev = window.RegistroLogic.initialState();
      const next = window.RegistroLogic.togglePassword(prev, 'otro');
      expect(next).toEqual(prev);
    });
  });

  // resetForm()
  describe('resetForm()', () => {
    test('devuelve el estado inicial limpio', () => {
      const s = window.RegistroLogic.resetForm();
      expect(s).toEqual(window.RegistroLogic.initialState());
    });

    test('retorna objeto nuevo en cada llamada', () => {
      const a = window.RegistroLogic.resetForm();
      const b = window.RegistroLogic.resetForm();
      a.nombre = 'Z';
      expect(b.nombre).toBe('');
    });

    test('no comparte referencia con initialState', () => {
      const a = window.RegistroLogic.resetForm();
      const b = window.RegistroLogic.initialState();
      a.apellido = 'Y';
      expect(b.apellido).toBe('');
    });
  });

  // validateSubmit(formState)
  describe('validateSubmit(formState)', () => {
    test('falla si hay campos vacíos', () => {
      const s = window.RegistroLogic.initialState();
      const r = window.RegistroLogic.validateSubmit(s);
      expect(r.ok).toBe(false);
      expect(r.message).toContain('completa');
    });

    test('falla si las contraseñas no coinciden', () => {
      const s = window.RegistroLogic.initialState();
      s.nombre = 'Ana';
      s.apellido = 'Pérez';
      s.email = 'ana@example.com';
      s.password = '1234';
      s.confirmPassword = '12345';
      const r = window.RegistroLogic.validateSubmit(s);
      expect(r.ok).toBe(false);
      expect(r.message).toContain('no coinciden');
    });

    test('pasa con datos completos y contraseñas iguales', () => {
      const s = window.RegistroLogic.initialState();
      s.nombre = 'Ana';
      s.apellido = 'Pérez';
      s.email = 'ana@example.com';
      s.password = '1234';
      s.confirmPassword = '1234';
      const r = window.RegistroLogic.validateSubmit(s);
      expect(r.ok).toBe(true);
      expect(r.message).toContain('Registro exitoso');
      expect(r.message).toContain('Ana Pérez');
    });
  });
});
