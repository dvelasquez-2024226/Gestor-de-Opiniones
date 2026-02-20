'use strict';

export const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username, email y password son obligatorios.'
        });
    }

    if (username.length < 4) {
        return res.status(400).json({
            success: false,
            message: 'El username debe tener al menos 4 caracteres.'
        });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Correo no válido.'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'La contraseña debe tener al menos 6 caracteres.'
        });
    }

    next();
};


export const validateLogin = (req, res, next) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({
            success: false,
            message: 'Debe enviar identifier (correo o username) y password.'
        });
    }

    next();
};


export const validateUpdateProfile = (req, res, next) => {
    const {
        username,
        email,
        bio,
        currentPassword,
        newPassword
    } = req.body;

    if (username && username.length < 4) {
        return res.status(400).json({
            success: false,
            message: 'El username debe tener al menos 4 caracteres.'
        });
    }

    if (email) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Correo no válido.'
            });
        }
    }

    if (bio && bio.length > 250) {
        return res.status(400).json({
            success: false,
            message: 'La biografía no puede exceder 250 caracteres.'
        });
    }

    if (newPassword && !currentPassword) {
        return res.status(400).json({
            success: false,
            message: 'Debe enviar la contraseña actual para cambiarla.'
        });
    }

    if (newPassword && newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'La nueva contraseña debe tener al menos 6 caracteres.'
        });
    }

    next();
};
