export const loginService = {
    ///// usuarios por default
    usuariosSistema: [
        { email: "admin@duoc.cl", password: "admin123" },
        { email: "usuario@duoc.cl", password: "12345" },
        { email: "test@duoc.cl", password: "duoc123" }
    ],

    /////busca credenciales
    verificarCredenciales: (email, password) => {
        ///// extrae usuarios 
        const usuariosCreados = JSON.parse(localStorage.getItem('usuariosCreados') || '[]');
        const todosUsuarios = [...loginService.usuariosSistema, ...usuariosCreados];
        
        ///// verifica
        return todosUsuarios.some(usuario => usuario.email === email && usuario.password === password);
    },

    ///// NUEVAS FUNCIONES PARA ADMIN
    obtenerTodosUsuarios: () => {
        const usuariosCreados = JSON.parse(localStorage.getItem('usuariosCreados') || '[]');
        return [...loginService.usuariosSistema, ...usuariosCreados];
    },

    eliminarUsuario: (email) => {
        // No permitir eliminar usuarios del sistema
        const usuariosSistemaEmails = loginService.usuariosSistema.map(u => u.email);
        if (usuariosSistemaEmails.includes(email)) {
            throw new Error('No se puede eliminar un usuario del sistema');
        }

        const usuariosCreados = JSON.parse(localStorage.getItem('usuariosCreados') || '[]');
        const nuevosUsuarios = usuariosCreados.filter(usuario => usuario.email !== email);
        localStorage.setItem('usuariosCreados', JSON.stringify(nuevosUsuarios));
        return true;
    },

    agregarUsuario: (email, password) => {
        const usuariosCreados = JSON.parse(localStorage.getItem('usuariosCreados') || '[]');
        
        // Verificar si ya existe
        const todosUsuarios = [...loginService.usuariosSistema, ...usuariosCreados];
        const existe = todosUsuarios.some(usuario => usuario.email === email);
        
        if (existe) {
            throw new Error('El usuario ya existe');
        }

        const nuevoUsuario = { email, password };
        usuariosCreados.push(nuevoUsuario);
        localStorage.setItem('usuariosCreados', JSON.stringify(usuariosCreados));
        return nuevoUsuario;
    }
};