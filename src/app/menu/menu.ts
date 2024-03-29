import { CoreMenu } from '@core/types';
export const menu: CoreMenu[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    // translate: 'MENU.HOME',
    // role: [Role.BigPuntos],
    type: 'item',
    icon: 'home',
    url: 'central/inicio',
  },
  {
    id: 'apps',
    type: 'section',
    title: 'Administración de CORP',
    // role: [Role.BigPuntos],
    // translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'cargarComisiones',
        title: 'Cargar Comisiones',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'dollar-sign',
        url: 'central/corp/cargarComisiones',
      },
      {
        id: 'empresasCorp',
        title: 'Empresas',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'briefcase',
        url: 'central/corp/empresas',
      },
      {
        id: 'empleadosEmpresas',
        title: 'EMPLEADOS DE EMPRESAS',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'briefcase',
        url: 'central/corp/empleados',
      },
      {
        id: 'empresasQR',
        title: 'Generar QR Establecimiento',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'briefcase',
        url: 'central/corp/empresas-qr',
      },
      {
        id: 'usuariosCorp',
        title: 'Usuarios',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'user',
        url: 'central/corp/usuarios',
      },
      {
        id: 'rolesCorp',
        title: 'Roles',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'clipboard',
        url: 'central/corp/roles',
      },
      {
        id: 'superMonedasCord',
        title: 'Cargar Big Puntos de Corp',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'dollar-sign',
        url: 'central/corp/cargarBigPuntos',
      },
      {
        id: 'creditosEmpleados',
        title: 'Cargar Créditos de Consumo',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'dollar-sign',
        url: 'central/corp/CargarCreditosdeConsumo',
      },
      {
        id: 'cargarLineasCredito',
        title: 'Cargar Líneas de Crédito',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'dollar-sign',
        url: 'central/corp/cargarLineasCredito',
      },
      {
        id: 'cargarCreditosAutomotriz',
        title: 'Cargar Créditos Automotriz',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'dollar-sign',
        url: 'central/corp/cargarCreditosAutomotriz',
      },
    ]
  },
  {
    id: 'apps',
    type: 'section',
    title: 'Administración de Center',
    // role: [Role.BigPuntos],
    // translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'empresasCorp',
        title: 'LANDING EMPLEADOS',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'briefcase',
        url: 'central/center/empresas',
      },
      {
        id: 'empresasClientesCorp',
        title: 'LANDING CLIENTES',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'briefcase',
        url: 'central/center/empresas-clientes',
      },
      {
        id: 'usuariosCenter',
        title: 'Usuarios',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'user',
        url: 'central/center/usuarios',
      },
      {
        id: 'rolesCenter',
        title: 'Roles',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'clipboard',
        url: 'central/center/roles',
      },
      {
        id: 'parametrizaciones',
        title: 'Parametrizaciones',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/parametrizaciones',
      },
      {
        id: 'productos',
        title: 'Productos',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/productos',
      },
      {
        id: 'productos',
        title: 'Productos Landing',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/productosLanding',
      },
      {
        id: 'productosPremios',
        title: 'Premios Big Puntos',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/productos-premios',
      },
      {
        id: 'productosBienvenida',
        title: 'Productos landing nuevos',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/productos-landing-nuevos',
      },
      // {
      //   id: 'productosMensajeSM',
      //   title: 'Configurar Productos SM Mensaje Productos',
      //   // translate: 'MENU.HOME',
      //   // role: [Role.BigPuntos],
      //   type: 'item',
      //   icon: 'package',
      //   url: 'central/center/productos-mensaje-sm',
      // },
      {
        id: 'productosNuestraFamiliaSM',
        title: 'Productos familia',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/productos-big.puntos',
      },
      {
        id: 'correosLanding',
        title: 'Reporte de Correos de Landing Page SM',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/reporte-correos-landing',
      },
      {
        id: 'solicitudesCreditos',
        title: 'Solicitudes de créditos',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'collapsible',
        icon: 'credit-card',
        children: [
          {
            id: 'creditoComsumo',
            title: 'Créditos de consumo',
            type: 'collapsible',
            icon: 'credit-card',
            children: [
              {
                id: 'empleados',
                title: 'Créditos empleados',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/empleados'
              },
              {
                id: 'negocios',
                title: 'Créditos negocios',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/negocios-propio'
              },
              {
                id: 'propios-pre-aprovados',
                title: 'Pre aprobados negocios propios',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/negocios-propios-pre-aprobados'
              },
              {
                id: 'empelados-pre-aprovados',
                title: 'Pre aprobados empelados',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/empelados-pre-aprobados'
              },
              {
                id: 'ifisPreaprobados',
                title: 'IFIS Preaprobados',
                type: 'collapsible',
                icon: 'credit-card',
                children: [
                  {
                    id: 'propios-pre-aprovados',
                    title: 'Pre aprobados negocios propios',
                    // translate: 'MENU.APPS.EMAIL',
                    type: 'item',
                    icon: 'circle',
                    url: 'central/center/solicitudes-creditos/ifis/negocios-propios-pre-aprobados'
                  },
                  {
                    id: 'empelados-pre-aprovados',
                    title: 'Pre aprobados empelados',
                    // translate: 'MENU.APPS.EMAIL',
                    type: 'item',
                    icon: 'circle',
                    url: 'central/center/solicitudes-creditos/ifis/empelados-pre-aprobados'
                  },
                ],
              },
            ]
          },
          {
            id: 'lineasCredito',
            title: 'Líneas de crédito',
            type: 'collapsible',
            icon: 'credit-card',
            children: [
              {
                id: 'microcreditpreaprobado',
                title: 'PYMES pre-aprobados ',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/microcreditpreaprobado'
              },
              {
                id: 'microcreditsolicitud',
                title: 'PYMES Normales ',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/microcreditsolicitud'
              },
              {
                id: 'pymesIfis',
                title: 'Pymes Ifis',
                type: 'collapsible',
                icon: 'credit-card',
                children: [
                  {
                    id: 'microcreditpreaprobado',
                    title: 'PYMES pre-aprobados ',
                    // translate: 'MENU.APPS.EMAIL',
                    type: 'item',
                    icon: 'circle',
                    url: 'central/center/solicitudes-creditos/ifis/microcreditpreaprobado'
                  },
                ]
              }
            ]
          },
          {
            id: 'creditoComsumo',
            title: 'Créditos Alfa',
            type: 'collapsible',
            icon: 'credit-card',
            children: [
              {
                id: 'alfa',
                title: 'Créditos alfa',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/alfa'
              },
            ]
          },
          {
            id: 'creditoAutomotriz',
            title: 'Créditos Automotriz',
            type: 'collapsible',
            icon: 'credit-card',
            children: [
              {
                id: 'empleados',
                title: 'Créditos empleados',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/automotriz/empleados'
              },
              {
                id: 'negocios',
                title: 'Créditos negocios',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/automotriz/negocios-propio'
              },
              {
                id: 'propios-pre-aprovados',
                title: 'Pre aprobados negocios propios',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/automotriz/negocios-propios-pre-aprobados'
              },
              {
                id: 'empelados-pre-aprovados',
                title: 'Pre aprobados empelados',
                // translate: 'MENU.APPS.EMAIL',
                type: 'item',
                icon: 'circle',
                url: 'central/center/solicitudes-creditos/automotriz/empelados-pre-aprobados'
              },
              {
                id: 'ifisPreaprobados',
                title: 'IFIS Preaprobados',
                type: 'collapsible',
                icon: 'credit-card',
                children: [
                  {
                    id: 'propios-pre-aprovados',
                    title: 'Pre aprobados negocios propios',
                    // translate: 'MENU.APPS.EMAIL',
                    type: 'item',
                    icon: 'circle',
                    url: 'central/center/solicitudes-creditos/automotriz/ifis/negocios-propios-pre-aprobados'
                  },
                  {
                    id: 'empelados-pre-aprovados',
                    title: 'Pre aprobados empelados',
                    // translate: 'MENU.APPS.EMAIL',
                    type: 'item',
                    icon: 'circle',
                    url: 'central/center/solicitudes-creditos/automotriz/ifis/empleados-pre-aprobados'
                  },
                ],
              },
              {
                id: 'AutomotrizAlfa',
                title: 'Alfa',
                type: 'collapsible',
                icon: 'credit-card',
                children: [
                  {
                    id: 'automotriz-alfa',
                    title: 'Alfa',
                    // translate: 'MENU.APPS.EMAIL',
                    type: 'item',
                    icon: 'circle',
                    url: 'central/center/solicitudes-creditos/automotriz/alfa'
                  },
                ],
              }
            ]
          },
        ]
      },
      {
        id: 'reportePublicaciones',
        title: 'Reporte Publicaciones',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/reporte-publicaciones',
      },
      {
        id: 'reporteCobrosBP',
        title: 'Reporte de Cobros con BP',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/reporte-pagos-empresas',
      },
      {
        id: 'lecturaArchivos',
        title: 'Lectura archivos',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/lectura-archivos',
      },
      {
        id: 'publicaciones',
        title: 'Publicaciones Facebook',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/publicaciones',
      },
        {
        id: 'publicaciones',
        title: 'Publicaciones Whatsapp',
        // translate: 'MENU.HOME',
        // role: [Role.BigPuntos],
        type: 'item',
        icon: 'package',
        url: 'central/center/publicaciones-whatsapp',
      },
    ]
  },
];
