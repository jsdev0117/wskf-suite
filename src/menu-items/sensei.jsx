// assets
import { IconHome, IconKey } from '@tabler/icons-react';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const sensei = {
  id: 'Sensei',
  title: 'Sensei Pages',
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

export default sensei;
