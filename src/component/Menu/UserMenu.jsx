import React from 'react';
import MenuItem from './MenuItem';
import { CgProfile } from 'react-icons/cg';
import { MdHomeWork, MdPostAdd } from 'react-icons/md';

const UserMenu = () => {
    return (
        <> 
            {/* Profile Menu */}
            <MenuItem
                label='My Profile'
                address='/dashboard'
                icon={CgProfile}
              />
              {/* Add post */}
              <MenuItem
                label='Add Post'
                address='add-post'
                icon={MdPostAdd}
              />
              {/* My post */}
              <MenuItem
                label='My Post'
                address='my-post'
                icon={MdHomeWork}
              />
        </>
    );
};

export default UserMenu;