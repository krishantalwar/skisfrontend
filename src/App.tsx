import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { Layout as Layout1 } from "@/components/layout/layout1"
import Dashboard from "@/pages/dashboard"
import Profile from "@/pages/profile"
// import NewCoverNote from "@/pages/covernote/NewCoverNote"
// import { CoverNoteForm } from "@/components/forms/CoverNoteForm"
// import TabbedForm from "@/components/forms/TabbedForm"
import MotorForm from "@/pages/covernote/MotorForm"
import NonMotorForm from "@/pages/covernote/NonMotorForm"
import HealthForm from "@/pages/covernote/HelathForm"
import LicForm from "@/pages/covernote/LicForm"
import UserTable from "@/pages/covernote/Covernote"
// import MotorFormWrapper from "@/pages/covernote/MotorFormWrapper"
// import Lic from "@/pages/covernote/LicForm"

import Login from "@/pages/login"
import Navigation from "@/privateRoutes/navigation.component"
import OldMaster from "@/privateRoutes/OldMaster"
import AgentGroupTable from "@/pages/covernote/dummy"
import Dummmy from "@/pages/covernote/newdummy"
import Newdummyy from "@/pages/covernote/newdummyy"



function App() {

  return (
    <Routes>
      <Route element={<Navigation />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="MotorForm"  element={<MotorForm />} />
          <Route path="NonMotorForm"  element={<NonMotorForm />} />
          <Route path="HealthForm"  element={<HealthForm />} />
          <Route path="LicForm"  element={<LicForm />} /> 
          <Route path="Covernote"  element={<UserTable />} />
          <Route path="AgentGroupTable"  element={<AgentGroupTable />} />
          <Route path="dummy"  element={<Dummmy />} />
          <Route path="dumy"  element={<Newdummyy />} />
        </Route>
      </Route>
      <Route element={<OldMaster />}>
          <Route path="/" element={<Layout1 />}>
            <Route path="login" element={<Login />} />
      </Route>
      </Route>
    </Routes>

  )
}

export default App
