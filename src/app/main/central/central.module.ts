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
import { AuthGuard } from '../../auth/helpers/auth.guards';
import { Role } from '../../auth/models/role';
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

const routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: PrincipalComponent,
    data: { roles: [Role.SuperMonedas] },
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
        path: 'usuarios', component: UsuariosCorpComponent, canActivate: [AuthGuard]
      },
      {
        path: 'roles', component: RolesCorpComponent, canActivate: [AuthGuard]
      },
      {
        path: 'cargarSuperMonedas', component: CargarSuperMonedasCorpComponent, canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'center', children: [
      {
        path: '', redirectTo: 'usuarios', pathMatch: 'full'
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
    CargarSuperMonedasCorpComponent
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
    CargarSuperMonedasCorpComponent
  ]
})
export class CentralModule { }
