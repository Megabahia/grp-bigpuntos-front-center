import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {CoreMenuService} from '../../../@core/components/core-menu/core-menu.service';

@Directive({
    selector: '[appRole]'
})
export class RoleDirective implements OnInit {

    private currentUser;
    private permissions = [];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewCointainer: ViewContainerRef,
        private _coreMenuService: CoreMenuService,
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this._coreMenuService.grpCenterUser;
        this.updateView();
    }

    @Input()
    set appRole(val: Array<String>) {
        this.permissions = val;
        this.updateView();
    }

    private updateView(): void {
        this.viewCointainer.clear();
        if (this.checkPermission()) {
            this.viewCointainer.createEmbeddedView(this.templateRef);
        }
    }

    private checkPermission(): boolean {
      let hasPermission = false;
      if (this.currentUser && this.currentUser.roles) {
          console.log('enotro al if');

          for (const checkPermission of this.permissions) {
          const permissionFound = this.currentUser.roles.find((p: string) => {
              console.log(checkPermission);
            return (p?.['nombre'].toUpperCase() === checkPermission.toUpperCase());
          });
          if (permissionFound) {
            hasPermission = true;
            break;
          }
        }
      }
      return hasPermission;
    }

}
