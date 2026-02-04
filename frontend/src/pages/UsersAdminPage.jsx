import SectionHero from "../components/ui/SectionHero"
import ListLayout from "../components/features/ListLayout"
import UserItemAdmin from "../components/features/UserItemAdmin"
import ErrorMessage, { getErrorMessage } from "../components/common/ErrorMessage"
import LoadingMessage from "../components/common/LoadingMessage"

import Modal from "../components/common/Modal"
import UserDetailsModal from "../components/modalcontent/UserDetailsModal"
import EditUserModal from "../components/forms/EditUserModal"
import ConfirmActionModal from "../components/modalcontent/ConfirmActionModal"

import { useState } from "react"

import { useUsers, useDeleteUser } from "../hooks/useUsers"

function UsersAdminPage() {

    // Busqueda 
    const [serachquery, setSearchQuery] = useState("")

    // Cargador de usuarios
    const { data: users, isLoading, isError, error, refetch } = useUsers(serachquery)

    // Metodo para eliminar usuarios
    const deleteUserMutation = useDeleteUser()

    // Usuario elegido 
    const [selectedUser, setSelectedUser] = useState(null);

    // Manejador de modals
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

    if (isLoading) return <LoadingMessage message="Cargando usuarios" />
    if (isError) return <ErrorMessage message={getErrorMessage(error)} retryFn={refetch} />

    return (
        <SectionHero title="Administración de Usuarios" paragraph="Gestiona y Crea Usuarios" createTo="/dashboard/users/add" onSearch={setSearchQuery}>
            <div className="h-full overflow-y-auto pr-2">
                <ListLayout>
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

            <Modal isOpen={isDetailOpen} onClose={() => { setIsDetailOpen(false), setSelectedUser(null) }} title="Detalles Usuario">
                {selectedUser && <UserDetailsModal userdata={selectedUser} />}
            </Modal>

            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Actualizar Datos">
                {selectedUser && <EditUserModal userdata={selectedUser} onClickClose={() => setIsEditOpen(false)} />}
            </Modal>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar Usuario">
                {selectedUser && <ConfirmActionModal
                    title={selectedUser.username}
                    onCancel={() => setIsDeleteOpen(false)}
                    onConfirm={() => deleteUserMutation.mutate(selectedUser.id)}
                    isLoading={deleteUserMutation.isPending}
                />}
            </Modal>
        </SectionHero>
    )
}

export default UsersAdminPage