import Navbar from "../common/navbar"
import Footer from "../common/footer"

import Modal from "../common/Modal";
import LogOutModal from "../modalcontent/LogOutModal";

import { useState } from "react";

function SiteLayout({ children }) {

  const [isLogOutOpen, setIsLogOutOpen] = useState(false)

  const confirmLogout = () => {
    setIsLogOutOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onExit={()=>setIsLogOutOpen(true)} />
      <main className="grow">
        <Modal isOpen={isLogOutOpen} onClose={()=>setIsLogOutOpen(false)}>
          <LogOutModal onCancel={()=>setIsLogOutOpen(false)}/>
        </Modal>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout