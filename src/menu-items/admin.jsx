// assets
import { IconHome, IconKey, IconUsers } from '@tabler/icons-react';

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
    {
      id: 'Members',
      title: 'Members',
      type: 'item',
      icon: IconUsers,
      url: '/members'
    },
  ]
};

export default admin;
