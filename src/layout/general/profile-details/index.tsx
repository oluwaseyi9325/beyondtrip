   import React, { useState } from 'react'
import { BiKey } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
// import EditProfile from '../modals/profile/edit-profile'
import ChangePassword from '../modals/profile/change-password'
import EditProfile from '../modals/profile/edit-profile'
   
function BasicDetailsContent() {
  const [open, setOpen] = useState(false)
  const [isChangePws,setIsChangePws]=useState(false)
     return (
       <>
         <div className="space-y-6">
             {/* Profile Card */}
             <div className="bg-white p-8 rounded-lg">
               <div className="bg-white border border-gray-300 rounded-xl p-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="h-14 w-14 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white text-xl font-bold">
                       S
                     </div>
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900">Samuel Emmaeus</h3>
                       <p className="text-sm text-gray-500">sammemma@gmail.com</p>
                     </div>
                   </div>
                   <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors">
                     Verified
                   </button>
                 </div>
               </div>
             </div>
       
             {/* Personal Information */}
             <div className="bg-white p-8 rounded-lg">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                 <button onClick={()=>setOpen(true)} className="bg-[#2C4C9C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#234080] transition-colors flex items-center gap-2">
                   <MdEdit size={18} />
                   Edit Profile
                 </button>
               </div>
               <div className="bg-white border border-gray-300 rounded-xl p-6">
                 <div className="grid grid-cols-3 gap-6">
                   <div>
                     <p className="text-sm font-semibold text-gray-900 mb-1">First Name</p>
                     <p className="text-sm text-gray-500">Samuel</p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-900 mb-1">Last Name</p>
                     <p className="text-sm text-gray-500">Emmaeus</p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-900 mb-1">Email Address</p>
                     <p className="text-sm text-gray-500">sammemma@gmail.com</p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-900 mb-1">Phone No.</p>
                     <p className="text-sm text-gray-500">08456230345</p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-900 mb-1">Address</p>
                     <p className="text-sm text-gray-500">Loremipsum.rdscimse</p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-900 mb-1">Reference</p>
                     <p className="text-sm text-gray-500">Loremipsum.rdscimse</p>
                   </div>
                 </div>
               </div>
             </div>
       
             {/* Password Reset */}
             <div className="bg-white p-8 rounded-lg">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Reset</h2>
               <div className="bg-white border border-gray-300 rounded-xl p-6">
                 <p className="text-sm text-gray-600 mb-3">Change your password at any time</p>
                 <button onClick={()=>setIsChangePws(true)} className="text-[#2C4C9C] font-medium hover:underline flex items-center gap-2">
                   <BiKey size={20} />
                   Change password
                 </button>
               </div>
             </div>
       
         </div>
         
         <EditProfile open={open} handleClose={() => setOpen(false)} />
         <ChangePassword open={isChangePws} handleClose={()=>setIsChangePws(false)} />
       </>
     )
   }
   
   export default BasicDetailsContent
   