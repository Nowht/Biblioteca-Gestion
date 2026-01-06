import SectionHero from "../components/ui/SectionHero"
import ListLayout from "../components/features/ListLayout"
import UserItemAdmin from "../components/features/UserItemAdmin"

import Modal from "../components/common/Modal"
import UserDetailsModal from "../components/modalcontent/UserDetailsModal"
import EditUserModal from "../components/forms/EditUserModal"
import ConfirmActionModal from "../components/modalcontent/ConfirmActionModal"

import { useState } from "react"

import { useUsers } from "../hooks/useUsers"

function UsersAdminPage() {

    const { data: users, isLoading, isError } = useUsers()

    const [selectedUser, setSelectedUser] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openDetails = (user) => {
        setSelectedUser(user);
        setIsDetailOpen(true)
    }

    const openEdit = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true)
    }

    const openDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteOpen(true)
    }

    return (
        <SectionHero title="Administración de Usuarios" paragraph="Gestiona y Crea Usuarios" createTo="/dashboard/users/add">
            <div className="h-full overflow-y-auto pr-2">
                <ListLayout>
                    {isLoading && <p>Cargando usuarios...</p>}
                    {users && users.map((user) => (
                        <UserItemAdmin
                            key={user.id}
                            name={user.username}
                            role={user.is_staff ? "administrador" : "usuario"}
                            onViewDetail={() => openDetails(user)}
                            onEdit={() => openEdit(user)}
                            onDelete={() => openDelete(user)} />
                    ))}
                </ListLayout>
            </div>

            <Modal isOpen={isDetailOpen} onClose={() => {setIsDetailOpen(false), setSelectedUser(null)}} title="Detalles Usuario">
                {selectedUser && <UserDetailsModal userdata={selectedUser} />}
            </Modal>

            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Actualizar Datos">
                {selectedUser && <EditUserModal userdata={selectedUser} />}
            </Modal>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar Usuario">
                {selectedUser && <ConfirmActionModal content={selectedUser.username} onCancel={() => setIsDeleteOpen(false)} />}
            </Modal>
        </SectionHero>
    )
}

export default UsersAdminPage