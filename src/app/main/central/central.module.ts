import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { RouterModule } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { CoreSidebarModule } from '@core/components';
import { AuthGuard } from '../../auth/helpers';
import { Role } from '../../auth/models';
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { FlatpickrModule } from 'angularx-flatpickr';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CardSnippetModule } from '../../../@core/components/card-snippet/card-snippet.module';
import { PerfilUsuarioComponent } from '../center/perfil-usuario/perfil-usuario.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { QRCodeModule } from 'angularx-qrcode';
import { ListarComponent as EmpresasComponent } from './vistas/corp/empresas/listar/listar.component';
import { ListarComponent as UsuariosCorpComponent } from './vistas/corp/usuarios/listar/listar.component';
import { ListarComponent as RolesCorpComponent } from './vistas/corp/roles/listar/listar.component';
import { ListarComponent as UsuariosCenterComponent } from './vistas/center/usuarios/listar/listar.component';
import { ListarComponent as RolesCenterComponent } from './vistas/center/roles/listar/listar.component';
import { ListarComponent as ParametrizacionesCenterComponent } from './vistas/center/parametrizaciones/listar/listar.component';
import { ListarComponent as ProductosCenterComponent } from './vistas/center/productos/listar/listar.component';
import { ListarComponent as CargarSuperMonedasCorpComponent } from './vistas/corp/cargarSuperMonedas/listar/listar.component';
import { SolicitudesCreditosComponent } from './vistas/center/solicitudes-creditos/solicitudes-creditos.component';
import { ListarComponent as PublicacionesListar} from './vistas/center/publicaciones/listar/listar.component';
import { UploadComponent } from './vistas/corp/cargarCreditosEmpleados/vistas/upload/upload.component';
import { UploadLineasCreditos } from './vistas/corp/cargarLineasCreditos/vistas/upload/upload-lineas-creditos.component';
import { ListarComponent as ProductosBienvenidaListar } from './vistas/center/productos-bienvenida-sm/listar/listar.component';
import { ListarComponent as ProductosMensajeListar } from './vistas/center/productos-mensaje-sm/listar/listar.component';
import { ListarComponent as ProductosNuestraFamiliaListar } from './vistas/center/productos-nuestra-familia-sm/listar/listar.component';
import { ListarComponent as CorreosLandingListar } from './vistas/center/Correos-landing/listar/listar.component';
import { ListarComponent as ProductosPremios } from './vistas/center/productos-premios/listar/listar.component';
import { ListarQrComponent } from './vistas/corp/empresas/listar-qr/listar-qr.component';
import { ReporteComponent as ReportePublicacionesComponent } from './vistas/center/publicaciones/reporte/reporte.component';
import { ListarComponent as ReportePagosComponent } from './vistas/center/pagos/listar/listar.component';
import {LecturaArchivosComponent} from './vistas/center/lectura-archivos/lectura-archivos.component';
import { VisualizarComponent } from './vistas/center/lectura-archivos/visualizar/visualizar.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {EmpleadosComponent as SolicitudesEmpleadosComponent} from './vistas/center/solicitudes-creditos/empleados/empleados.component';
import { RevisionDocumentosComponent } from './vistas/center/solicitudes-creditos/revision-documentos/revision-documentos.component';
import { NegocioPropioComponent } from './vistas/center/solicitudes-creditos/negocio-propio/negocio-propio.component';
import { EmpleadosPreaprovadosComponent } from './vistas/center/solicitudes-creditos/empleados-preaprovados/empleados-preaprovados.component';
import { NegocioPropioPreaprovadosComponent } from './vistas/center/solicitudes-creditos/negocio-propio-preaprovados/negocio-propio-preaprovados.component';
import { MicrocreditosNormalesComponent } from './vistas/center/solicitudes-creditos/microcreditos-normales/microcreditos-normales.component';
import { MicrocreditosPreAprovadosComponent } from './vistas/center/solicitudes-creditos/microcreditos-pre-aprovados/microcreditos-pre-aprovados.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { ListarComponent as EmpresasCenter } from './vistas/center/empresas/listar/listar.component';
import { ListarClientesComponent as EmpresasClientesCenter } from './vistas/center/empresas/listar-clientes/listar-clientes.component';
import { ListarComponent as EmpleadosCorp } from './vistas/corp/empleados/listar/listar.component';
import { EmpleadosComponent } from './vistas/corp/empleados/empleados/empleados.component';
import {RoleDirective} from '../../auth/directivas/role.directive';
import {ListarLandingComponent} from './vistas/center/productosLanding/listar/listarLanding.component';
import { ViewFileComponent } from './vistas/corp/cargarLineasCreditos/vistas/view-file/view-file.component';
import {
  IfisNegocioPropioPreaprovadosComponent
} from './vistas/center/solicitudes-creditos/ifis/negocio-propio-preaprovados/ifis-negocio-propio-preaprovados.component';
import {
  IfisEmpleadosPreaprovadosComponent
} from './vistas/center/solicitudes-creditos/ifis/empleados-preaprovados/ifis-empleados-preaprovados.component';
import {
  IfisMicrocreditosPreAprovadosComponent
} from './vistas/center/solicitudes-creditos/ifis/microcreditos-pre-aprovados/ifis-microcreditos-pre-aprovados.component';
import {MatTreeModule} from '@angular/material/tree';
import { AlfaComponent } from './vistas/center/solicitudes-creditos/alfa/alfa.component';

import {EmpleadosComponent as AutomotrizEmpleadosComponent} from './vistas/center/solicitudes-creditos-automotriz/empleados/empleados.component';
import {NegocioPropioComponent as AutomotrizNegocioPropioComponent} from './vistas/center/solicitudes-creditos-automotriz/negocio-propio/negocio-propio.component';
import {NegocioPropioPreaprovadosComponent as AutomotrizNegocioPropioPreaprovadosComponent} from './vistas/center/solicitudes-creditos-automotriz/negocio-propio-preaprovados/negocio-propio-preaprovados.component';
import {EmpleadosPreaprovadosComponent as AutomotrizEmpleadosPreaprovadosComponent} from './vistas/center/solicitudes-creditos-automotriz/empleados-preaprovados/empleados-preaprovados.component';
import {IfisEmpleadosPreaprovadosComponent as AutomotrizIfisEmpleadosPreaprovadosComponent} from './vistas/center/solicitudes-creditos-automotriz/ifis/empleados-preaprovados/ifis-empleados-preaprovados.component';
import {IfisNegocioPropioPreaprovadosComponent as AutomotrizIfisNegocioPropioPreaprovadosComponent} from './vistas/center/solicitudes-creditos-automotriz/ifis/negocio-propio-preaprovados/ifis-negocio-propio-preaprovados.component';
import {AlfaComponent as AutomotrizAlfaComponent} from './vistas/center/solicitudes-creditos-automotriz/alfa/alfa.component';
import {
  AutomotrizRevisionDocumentosComponent
} from './vistas/center/solicitudes-creditos-automotriz/automotriz-revision-documentos/automotriz-revision-documentos.component';
import {UploadCreditosAutomotrizComponent} from './vistas/corp/cargarCreditosAutomotriz/vistas/upload/upload-creditos-automotriz.component';
import {UploadComisiones} from './vistas/corp/cargarComisiones/vistas/upload/upload-comisiones.component';
import {ViewFileComisionesComponent} from './vistas/corp/cargarComisiones/vistas/view-file/view-file-comisiones.component';

const routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: PrincipalComponent,
    canActivate: [AuthGuard]
    // data: { animation: 'auth' }
  },
  {
    path: 'corp', children: [
      {
        path: '', redirectTo: 'empresas', pathMatch: 'full'
      },
      {
        path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard]
      },
      {
        path: 'empleados', component: EmpleadosCorp, canActivate: [AuthGuard]
      },
      {
        path: 'empleados/:empresa', component: EmpleadosComponent, canActivate: [AuthGuard]
      },
      {
        path: 'empresas-qr', component: ListarQrComponent, canActivate: [AuthGuard]
      },
      {
        path: 'usuarios', component: UsuariosCorpComponent, canActivate: [AuthGuard]
      },
      {
        path: 'roles', component: RolesCorpComponent, canActivate: [AuthGuard]
      },
      {
        path: 'cargarBigPuntos', component: CargarSuperMonedasCorpComponent, canActivate: [AuthGuard]
      },
      {
        path: 'CargarCreditosdeConsumo', component: UploadComponent, canActivate: [AuthGuard]
      },
      {
        path: 'cargarLineasCredito', component: UploadLineasCreditos, canActivate: [AuthGuard]
      },
      {
        path: 'cargarCreditosAutomotriz', component: UploadCreditosAutomotrizComponent, canActivate: [AuthGuard]
      },
      {
        path: 'archivo/:archivoId', component: ViewFileComponent, canActivate: [AuthGuard]
      },
      {
        path: 'cargarComisiones', component: UploadComisiones, canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'center', children: [
      {
        path: '', redirectTo: 'usuarios', pathMatch: 'full'
      },
      {
        path: 'empresas', component: EmpresasCenter, canActivate: [AuthGuard]
      },
      {
        path: 'empresas-clientes', component: EmpresasClientesCenter, canActivate: [AuthGuard]
      },
      {
        path: 'usuarios', component: UsuariosCenterComponent, canActivate: [AuthGuard]
      },
      {
        path: 'roles', component: RolesCenterComponent, canActivate: [AuthGuard]
      },
      {
        path: 'parametrizaciones', component: ParametrizacionesCenterComponent, canActivate: [AuthGuard]
      },
      {
        path: 'productos', component: ProductosCenterComponent, canActivate: [AuthGuard]
      },
      {
        path: 'productosLanding', component: ListarLandingComponent, canActivate: [AuthGuard]
      },
      {
        path: 'productos-premios', component: ProductosPremios, canActivate: [AuthGuard]
      },
      {
        path: 'productos-landing-nuevos', component: ProductosBienvenidaListar, canActivate: [AuthGuard]
      },
      {
        path: 'productos-mensaje-sm', component: ProductosMensajeListar, canActivate: [AuthGuard]
      },
      {
        path: 'productos-big.puntos', component: ProductosNuestraFamiliaListar, canActivate: [AuthGuard]
      },
      {
        path: 'reporte-correos-landing', component: CorreosLandingListar, canActivate: [AuthGuard]
      },
      {
        path: 'solicitudes-creditos',
        children: [
          {path: '', redirectTo: 'empleados', pathMatch: 'full'},
          {
            path: 'empleados',
            component: SolicitudesEmpleadosComponent,
            data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'negocios-propio',
            component: NegocioPropioComponent,
            data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'negocios',
            component: SolicitudesCreditosComponent,
            data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'negocios-propios-pre-aprobados',
            component: NegocioPropioPreaprovadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'empelados-pre-aprobados',
            component: EmpleadosPreaprovadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'microcreditpreaprobado',
            component: MicrocreditosPreAprovadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'microcreditsolicitud',
            component: MicrocreditosNormalesComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'ifis/negocios-propios-pre-aprobados',
            component: IfisNegocioPropioPreaprovadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'ifis/empelados-pre-aprobados',
            component: IfisEmpleadosPreaprovadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'ifis/microcreditpreaprobado',
            component: IfisMicrocreditosPreAprovadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
            path: 'alfa',
            component: AlfaComponent,
            // data: {roles: [Role.BigPuntos]},
            // canActivate: [AuthGuard]
          },
          {
            path: 'automotriz/empleados',
            component: AutomotrizEmpleadosComponent,
            // data: {roles: [Role.BigPuntos]},
            canActivate: [AuthGuard]
          },
          {
              path: 'automotriz/negocios-propio',
              component: AutomotrizNegocioPropioComponent,
              // data: {roles: [Role.BigPuntos]},
              canActivate: [AuthGuard]
          },
          {
              path: 'automotriz/negocios-propios-pre-aprobados',
              component: AutomotrizNegocioPropioPreaprovadosComponent,
              // data: {roles: [Role.BigPuntos]},
              canActivate: [AuthGuard]
          },
          {
              path: 'automotriz/empelados-pre-aprobados',
              component: AutomotrizEmpleadosPreaprovadosComponent,
              // data: {roles: [Role.BigPuntos]},
              canActivate: [AuthGuard]
          },
          {
              path: 'automotriz/ifis/empleados-pre-aprobados',
              component: AutomotrizIfisEmpleadosPreaprovadosComponent,
              // data: {roles: [Role.BigPuntos]},
              canActivate: [AuthGuard]
          },
          {
              path: 'automotriz/ifis/negocios-propios-pre-aprobados',
              component: AutomotrizIfisNegocioPropioPreaprovadosComponent,
              // data: {roles: [Role.BigPuntos]},
              canActivate: [AuthGuard]
          },
          {
              path: 'automotriz/alfa',
              component: AutomotrizAlfaComponent,
              // data: {roles: [Role.BigPuntos]},
              canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'reporte-publicaciones', component: ReportePublicacionesComponent, canActivate: [AuthGuard]
      },
      {
        path: 'reporte-pagos-empresas', component: ReportePagosComponent, canActivate: [AuthGuard]
      },
      {
        path: 'lectura-archivos', component: LecturaArchivosComponent, canActivate: [AuthGuard]
      },
      {
        path: 'creditoPersona/visualizar/:creditoId', component: VisualizarComponent, canActivate: [AuthGuard]
      },
      {
        path: 'publicaciones', component: PublicacionesListar, canActivate: [AuthGuard], data: { tipo: 'facebook' },
      },
      {
        path: 'publicaciones-whatsapp', component: PublicacionesListar, canActivate: [AuthGuard], data: { tipo: 'whatsapp' }
      },
    ]
  }


];

@NgModule({
  declarations: [
    PrincipalComponent,
    PerfilUsuarioComponent,
    EmpresasComponent,
    UsuariosCorpComponent,
    RolesCorpComponent,
    UsuariosCenterComponent,
    RolesCenterComponent,
    ParametrizacionesCenterComponent,
    ProductosCenterComponent,
    ListarLandingComponent,
    CargarSuperMonedasCorpComponent,
    SolicitudesCreditosComponent,
    PublicacionesListar,
    UploadComponent,
    ProductosBienvenidaListar,
    ProductosMensajeListar,
    ProductosNuestraFamiliaListar,
    CorreosLandingListar,
    ProductosPremios,
    ListarQrComponent,
    ReportePublicacionesComponent,
    ReportePagosComponent,
    LecturaArchivosComponent,
    VisualizarComponent,
    SolicitudesEmpleadosComponent,
    RevisionDocumentosComponent,
    NegocioPropioComponent,
    EmpleadosPreaprovadosComponent,
    NegocioPropioPreaprovadosComponent,
    MicrocreditosNormalesComponent,
    MicrocreditosPreAprovadosComponent,
    EmpresasCenter,
    EmpleadosCorp,
    EmpleadosComponent,
    RoleDirective,
    EmpresasClientesCenter,
    UploadLineasCreditos,
    ViewFileComponent,
    IfisEmpleadosPreaprovadosComponent,
    IfisNegocioPropioPreaprovadosComponent,
    IfisMicrocreditosPreAprovadosComponent,
    AlfaComponent,
    // Automotriz
    AutomotrizEmpleadosComponent,
    AutomotrizNegocioPropioComponent,
    AutomotrizNegocioPropioPreaprovadosComponent,
    AutomotrizEmpleadosPreaprovadosComponent,
    AutomotrizIfisEmpleadosPreaprovadosComponent,
    AutomotrizIfisNegocioPropioPreaprovadosComponent,
    AutomotrizAlfaComponent,
    AutomotrizRevisionDocumentosComponent,
    UploadCreditosAutomotrizComponent,
    UploadComisiones,
    ViewFileComisionesComponent,
  ],
    imports: [
        CoreCommonModule,
        RouterModule.forChild(routes),
        ContentHeaderModule,
        TranslateModule,
        SwiperModule,
        FormsModule,
        CoreTouchspinModule,
        CoreSidebarModule,
        NgbModule,
        Ng2FlatpickrModule,
        CardSnippetModule,
        ShareIconsModule,
        ShareButtonsModule,
        QRCodeModule,
        FlatpickrModule.forRoot(),
        NgSelectModule,
        NgxDatatableModule,
        MatTreeModule,
        CommonModule
    ],
  exports: [

    PrincipalComponent,
    PerfilUsuarioComponent,
    EmpresasComponent,
    UsuariosCorpComponent,
    RolesCorpComponent,
    UsuariosCenterComponent,
    RolesCenterComponent,
    ParametrizacionesCenterComponent,
    ProductosCenterComponent,
    CargarSuperMonedasCorpComponent,
    PublicacionesListar,
    UploadComponent,
    ProductosBienvenidaListar,
    ProductosMensajeListar,
    ProductosNuestraFamiliaListar,
    CorreosLandingListar,
    ProductosPremios,
    ListarQrComponent,
  ]
})
export class CentralModule { }
