// assets
import { IconHome, IconKey } from '@tabler/icons-react';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const admin = {
  id: 'admin',
  icon: IconKey,
  type: 'group',
  children: [
    {
      id: 'Dojos',
      title: 'Dojos',
      type: 'item',
      icon: IconHome,
      url: '/dojos'
    },
  ]
};

export default admin;
