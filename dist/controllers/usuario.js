"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let usuarios = yield usuario_1.default.findAll();
    res.json({
        msg: "getUsuarios",
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: "usuario no encontrado",
        });
    }
    else {
        res.json({
            msg: "getUsuario",
            usuario,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email,
            });
        }
        else {
            const usuario = yield usuario_1.default.create(body);
            res.json({
                msg: "postUsuario",
                usuario,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "error en la base de datos",
            error,
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                msg: "el usuario no se encontro",
            });
        }
        else {
            yield usuario.update(body);
            res.json({
                msg: "Todo OK",
                usuario,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "error en la base de datos",
            error,
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                msg: "el usuario no se encontro",
            });
        }
        else {
            // await usuario.destroy(); //ELIMINACION FISICA
            yield usuario.update({ estado: "false" });
            res.json({
                msg: "Usuario Eliminado",
                usuario,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "error en la base de datos",
            error,
        });
    }
    res.json({
        msg: "putUsuario",
        id,
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map