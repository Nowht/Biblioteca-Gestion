import Navbar from "../common/navbar"
import Footer from "../common/footer"

import Modal from "../common/Modal";
import LogOutModal from "../modalcontent/LogOutModal";

import { useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function SiteLayout({ children }) {

  const { user, logout } = useContext(AuthContext)
  const [isLogOutOpen, setIsLogOutOpen] = useState(false)
  const isAdmin = user?.isStaff

  const ActionLogout = () => {
    if (isAdmin) {
      setIsLogOutOpen(true)
    }else{
      logout()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        LogOutAction={ActionLogout}
        user={user?.username}
        isAdmin={user?.isStaff} />
      <main className="grow">
        <Modal isOpen={isLogOutOpen} onClose={() => setIsLogOutOpen(false)}>
          <LogOutModal onCancel={() => setIsLogOutOpen(false)} onConfirmLogout={logout} />
        </Modal>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout