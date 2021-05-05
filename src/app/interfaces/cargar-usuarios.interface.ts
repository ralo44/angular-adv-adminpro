import { Usuario } from "../models/usuario.model";

export interface ICargarUsuario{
    total:number,
    usuarios:Usuario[],
}