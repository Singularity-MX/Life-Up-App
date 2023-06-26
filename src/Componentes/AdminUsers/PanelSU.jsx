import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import backendUrl from '../../serverConfig';


const PanelAdmin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(backendUrl+'/api/tableRol');
                const responseData = await response.json();
                if (response.ok) {
                    setUsers(responseData);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        fetchUsers();
    }, []);

    function GoAddUser(){
        navigate("/FormularioPersonal");
    }
    
    return (
        <div>
            <button onClick={GoAddUser}>Agregar usuario</button>
            <button onClick={""}>Eliminar usuario</button>
            <button onClick={""}>Modificar usuario</button>
        <table>
            <thead>
                <tr>
                    <th>ID de Personal</th>
                    <th>Rol</th>
                    <th>ID Centro</th>
                    <th>Email</th>
                
                    <th>Acceso</th>
                  
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.PersonalID}>
                        <td>{user.PersonalID}</td>
                        <td>{user.Rol}</td>
                        <td>{user.ID_Centro}</td>
                        <td>{user.Email}</td>
                        <td>{user.Acceso}</td>
                     
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default PanelAdmin;
