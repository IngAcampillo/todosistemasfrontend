/**
 * Clase que representa la respuesta desde el backend
 */
export interface RespuestaServicio{
    ok: boolean;
    message: string;
    body: Object;
}