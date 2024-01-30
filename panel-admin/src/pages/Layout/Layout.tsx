import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../../Components/SideBar/SideBar'

export default function Layout() {
    return (
        <>
            <div className="w-full flex mt-2">
                <div className="w-2/12">
                    <div className="top-14 p-2 rounded-md overflow-auto bg-gray-800 sticky shadow-lg min-h-screen">
                        <SidebarAdmin />
                    </div>
                </div>
                <div className="w-10/12">
                    <div className="p-2 bg-gray-700 rounded-md mr-1 min-h-screen">
                        <div className="mt-3">
                            <Suspense fallback={<div>loading ...</div>}><Outlet /></Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
