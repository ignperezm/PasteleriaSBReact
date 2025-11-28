// Registro.logic.js
// Lógica pura extraída del componente Registro.jsx y expuesta en window.RegistroLogic
// No usa import/export; apto para correr en Vitest (jsdom) mediante import de efecto lateral.

(function (global) {
  // Evita redeclaración si el archivo se importa más de una vez
  if (global.RegistroLogic) {
    return;
  }

  // Estado inicial del formulario (misma estructura que en el componente)
  var initial = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  };

  // Clona de forma simple un objeto (suficiente para este estado plano)
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // handleChange(prevState, name, value)
  // Actualiza el campo indicado en el estado del formulario y devuelve un nuevo estado.
  function handleChange(prevState, name, value) {
    var next = clone(prevState || initial);
    if (typeof name !== "string" || !name) {
      // Si el nombre no es válido, no cambia el estado
      return next;
    }
    next[name] = value == null ? "" : value;
    return next;
  }

  // togglePassword(prevState, field)
  // Cambia el valor booleano de showPassword o showConfirmPassword y devuelve un nuevo estado.
  function togglePassword(prevState, field) {
    var next = clone(prevState || initial);
    if (field !== "showPassword" && field !== "showConfirmPassword") {
      return next;
    }
    next[field] = !Boolean(next[field]);
    return next;
  }

  // resetForm()
  // Devuelve un nuevo estado limpio con los valores por defecto.
  function resetForm() {
    return clone(initial);
  }

  // validateSubmit(formState)
  // Valida los datos del formulario y devuelve { ok: boolean, message: string }
  // No realiza side-effects (no llama alert); esto facilita testear.
  function validateSubmit(formState) {
    var s = formState || {};

    if (!s.nombre || !s.apellido || !s.email || !s.password || !s.confirmPassword) {
      return { ok: false, message: "Por favor completa todos los campos." };
    }

    if (s.password !== s.confirmPassword) {
      return { ok: false, message: "Las contraseñas no coinciden." };
    }

    var fullName = (s.nombre || "") + " " + (s.apellido || "");
    return { ok: true, message: "Registro exitoso ✅\nBienvenido/a " + fullName.trim() };
  }

  // Exponer API en el objeto global window
  global.RegistroLogic = {
    // Devuelve una copia del estado inicial
    initialState: function () { return clone(initial); },
    // Mutadores puros de estado
    handleChange: handleChange,
    togglePassword: togglePassword,
    resetForm: resetForm,
    // Validación de submit
    validateSubmit: validateSubmit,
  };
})(typeof window !== 'undefined' ? window : this);
