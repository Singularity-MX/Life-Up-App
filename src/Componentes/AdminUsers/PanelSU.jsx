import React, { useState, useEffect } from 'react';

const PanelAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://192.168.1.66:3000/api/tabla');
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

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Pass</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.SU_ID}>
                        <td>{user.SU_ID}</td>
                        <td>{user.Username}</td>
                        <td>{user.Contraseña}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PanelAdmin;
