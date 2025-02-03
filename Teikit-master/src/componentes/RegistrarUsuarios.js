import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from "reactstrap"
import "../estilos/Login.css"
import ClienteService from '../servicios/ClienteService';
import { Link } from "react-router-dom";
import validator from "validator";


const RegistrarUsuarios = () => {

    const verLogin = true;
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [nombre, setNombre] = useState("");
    const [ingresa, setIngresa] = useState(null);

    const guardar = () => {
        if (!validator.isEmail(usuario)) {
            alert("Correo incorrecto.")
        } else {

            let body = {
                "nombreApellido": nombre,
                "email": usuario,
                "passUsuario": pass
            }
            if (nombre !== "" && pass !== "" && usuario !== "") {
                ClienteService.registrarUsuario(body).then(response => {
                    if (response.data.id > 0) {
                        setIngresa(response.data.id);
                        setUsuario("");
                        setPass("");
                        setNombre("");

                    } else {
                        setIngresa(response.data.id);
                        console.log(ingresa);
                    }
                }).catch(error => {
                    setIngresa(0);
                    console.log(error);

                })
            }
        }
    }

    const funUsuario = (u) => { setUsuario(u.target.value); }
    const funPass = (p) => { setPass(p.target.value); }
    const funNombre = (p) => { setNombre(p.target.value); }

    return (
        <div className='divLogin'>

            <Modal isOpen={verLogin === true}>
                <ModalHeader>
                    <p>Registrar usuario</p>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Nombre</Label>
                        <Input onChange={(name) => { funNombre(name) }} type="text" />

                        <Label for='email'>Correo</Label>
                        <Input onChange={(user) => { funUsuario(user) }} placeholder='example@gmail.com' type="email" />

                        <Label for='password'>Contraseña</Label>
                        <Input onChange={(pass) => { funPass(pass) }} type='text' />

                        <Label className='mensajeError'> {ingresa === 0 ? "No se ha podido ingresar su solicitud, Intente mas atrde." : ""}</Label>

                        <Label className='mensajeExito'> {ingresa > 0 ? "Se ha registrado exitosamente." : ""}</Label>
                        <div className='divIngresar'>
                            <Button id="ingresar" className='btnIngresar' onClick={() => guardar()}>Registrar</Button>
                        </div>

                    </FormGroup>

                </ModalBody>

                <ModalFooter className='footerModalLogin'>
                    <div className='divBtnRegistrar'>
                        <Link to="/registrarUsuario" className='' >Registrar Usuario</Link>
                        <Link to="/loginComercio" className=''>Login Cafetería</Link>
                        <Link to="/login" className=''>Login Usuario</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default RegistrarUsuarios;
