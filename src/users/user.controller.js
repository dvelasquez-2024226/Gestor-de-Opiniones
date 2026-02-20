'use strict';

import {
    createUserRecord,
    loginUser,
    updateUserProfile,
    getUserById
} from './user.service.js';


export const register = async (req, res) => {
    try {
        const user = await createUserRecord({
            userData: req.body
        });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente!',
            data: user
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error al registrar usuario.',
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const result = await loginUser(identifier, password);

        res.status(200).json({
            success: true,
            message: 'Login exitoso!',
            data: result
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Credenciales incorrectas.',
            error: err.message
        });
    }
};

export const getMyProfile = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        next(err);
    }
};


export const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = await updateUserProfile({
            userId: req.user.id,
            updateData: req.body
        });

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado correctamente!',
            data: updatedUser
        });

    } catch (err) {
        next(err);
    }
};
