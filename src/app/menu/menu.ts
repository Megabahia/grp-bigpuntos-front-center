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
        icon: 'home',
        url: 'corp/empresas/lista',
      },
      {
        id: 'usuariosCorp',
        title: 'Usuarios',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'home',
        url: 'corp/usuarios/lista',
      },
      {
        id: 'rolesCorp',
        title: 'Roles',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'home',
        url: 'corp/roles/lista',
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
        icon: 'home',
        url: 'center/usuarios/lista',
      },
      {
        id: 'rolesCenter',
        title: 'Roles',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'home',
        url: 'center/roles/lista',
      },
      {
        id: 'parametrizaciones',
        title: 'Parametrizaciones',
        // translate: 'MENU.HOME',
        // role: [Role.SuperMonedas],
        type: 'item',
        icon: 'home',
        url: 'center/parametrizaciones/lista',
      },
    ]
  },
]
