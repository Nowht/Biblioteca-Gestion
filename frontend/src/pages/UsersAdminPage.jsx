import SectionHero from "../components/ui/SectionHero"
import ListLayout from "../components/features/ListLayout"
import UserItemAdmin from "../components/features/UserItemAdmin"

import Modal from "../components/common/Modal"
import UserDetailsModal from "../components/modalcontent/UserDetailsModal"
import EditUserModal from "../components/forms/EditUserModal"
import ConfirmActionModal from "../components/modalcontent/ConfirmActionModal"

import { useState } from "react"

function UsersAdminPage() {

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
                    <UserItemAdmin name="humberto" role="admin" onViewDetail={() => openDetails("humberto")} onEdit={() => openEdit("Humberto")} onDelete={() => openDelete("Humberto")} />
                </ListLayout>
            </div>

            <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detalles Usuario">
                <UserDetailsModal user="Humberto" role="admin" />
            </Modal>

            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Actualizar Datos">
                <EditUserModal user="Humberto" role="admin" />
            </Modal>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar Usuario">
                <ConfirmActionModal content="Humberto" onCancel={() => setIsDeleteOpen(false)} />
            </Modal>
        </SectionHero>
    )
}

export default UsersAdminPage