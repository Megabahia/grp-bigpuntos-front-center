import { CoreMenu } from '@core/types'
import { Role } from '../auth/models/role';

export const menu: CoreMenu[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    // translate: 'MENU.HOME',
    // role: [Role.SuperMonedas],
    type: 'item',
    icon: 'home',
    url: 'central/inicio',
  },
  {
    id: 'apps',
    type: 'section',
    title: 'Administración de CORP',
    // role: [Role.SuperMonedas],
    // translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'empresasCorp',
        title: 'Empresas',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'briefcase',
        url: 'central/corp/empresas',
      },
      {
        id: 'usuariosCorp',
        title: 'Usuarios',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'user',
        url: 'central/corp/usuarios',
      },
      {
        id: 'rolesCorp',
        title: 'Roles',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'clipboard',
        url: 'central/corp/roles',
      },
    ]
  },
  {
    id: 'apps',
    type: 'section',
    title: 'Administración de Center',
    // role: [Role.SuperMonedas],
    // translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'usuariosCenter',
        title: 'Usuarios',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'user',
        url: 'central/center/usuarios',
      },
      {
        id: 'rolesCenter',
        title: 'Roles',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'clipboard',
        url: 'central/center/roles',
      },
      {
        id: 'parametrizaciones',
        title: 'Parametrizaciones',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'package',
        url: 'central/center/parametrizaciones',
      },
    ]
  },
]
