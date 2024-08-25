import { FaCannabis, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { CgProfile } from 'react-icons/cg'
import { RxActivityLog } from 'react-icons/rx'

const AdminMenu = () => {
    return (
        <>
            {/* Profile Menu */}
            <MenuItem
                label='My Profile'
                address='/dashboard'
                icon={CgProfile}
            />

            {/* manage user in admin page  */}
            <MenuItem
                icon={FaUserCog}
                label='Manage Users'
                address='manage-users'
            />
            {/*  Reported Activities/Comments */}
            <MenuItem
                icon={RxActivityLog}
                label='Reported Activities/Comments'
                address='activities'
            />
            {/* announcement  */}
            <MenuItem
                icon={FaCannabis}
                label='Announcement'
                address='add-announcement'
            />


        </>
    )
}

export default AdminMenu