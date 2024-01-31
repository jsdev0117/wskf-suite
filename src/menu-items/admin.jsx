// assets
import { IconHome, IconKey } from '@tabler/icons-react';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const admin = {
  id: 'admin',
  title: 'Admin Pages',
  icon: IconKey,
  type: 'group',
  children: [
    {
      id: 'Home',
      title: 'Home',
      type: 'item',
      icon: IconHome,
      url: '/'
    }
  ]
};

export default admin;
