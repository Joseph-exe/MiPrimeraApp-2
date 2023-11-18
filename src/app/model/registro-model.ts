export class RegistroModel {
    public edit_mode: boolean = false;

    constructor(
        public id: string,
        public rut: string,
        public nombre: string,
        public contrasena: string,
        public telefono: string,
        public sector_registro: string,
    ) {}
}
