import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
    let usuarios: {} = await Usuario.findAll();

    res.json({
        msg: "getUsuarios",
        usuarios,
    });
};
export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    let usuario: {} | null = await Usuario.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: "usuario no encontrado",
        });
    } else {
        res.json({
            msg: "getUsuario",
            usuario,
        });
    }
};
export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email,
            },
        });

        if (existeEmail) {
            res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email,
            });
        } else {
            const usuario = await Usuario.create(body);
            res.json({
                msg: "postUsuario",
                usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "error en la base de datos",
            error,
        });
    }
};
export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                msg: "el usuario no se encontro",
            });
        } else {
            await usuario.update(body);
            res.json({
                msg: "Todo OK",
                usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "error en la base de datos",
            error,
        });
    }
};
export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                msg: "el usuario no se encontro",
            });
        } else {
            // await usuario.destroy(); //ELIMINACION FISICA
            await usuario.update({ estado: "false" });
            res.json({
                msg: "Usuario Eliminado",
                usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "error en la base de datos",
            error,
        });
    }
    res.json({
        msg: "putUsuario",
        id,
    });
};
