import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPagination, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CoreSidebarService } from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import { EmpresasService } from '../empresas.service';
import { Empresa } from '../models/empresas';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [DatePipe]

})
export class ListarComponent implements OnInit {
  @ViewChild(NgbPagination) paginator: NgbPagination;
  @ViewChild('mensajeModal') mensajeModal;
  @ViewChild('eliminarEmpresaMdl') eliminarEmpresaMdl;
  public page = 1;
  public page_size: any = 10;
  public maxSize;
  public collectionSize;
  public empresas;
  public empresa: Empresa;
  private _unsubscribeAll: Subject<any>;
  private idEmpresa;
  public empresaForm: FormGroup;
  public empresaSubmitted: boolean;
  public mensaje = "";
  constructor
    (
      private datePipe: DatePipe,
      private _coreSidebarService: CoreSidebarService,
      private _empresasService: EmpresasService,
      private _formBuilder: FormBuilder,
      private _modalService: NgbModal,

  ) {
    this._unsubscribeAll = new Subject();
    this.idEmpresa = "";
    this.empresa = {
      id: "",
      ciudad: "",
      fechaNacimiento: "",
      local: "",
      nombre: "",
      provincia: "",
      ruc: "",
      telefono: "",
      estado: "",
    }
  }

  ngOnInit(): void {
    this.empresaForm = this._formBuilder.group({
      ciudad: ['', [Validators.required]],
      local: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      ruc: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      estado: ['', [Validators.required]],
    });
  }
  ngAfterViewInit() {
    this.iniciarPaginador();

    this.obtenerListaEmpresas();
  }
  toggleSidebar(name, id): void {
    this.idEmpresa = id;
    if (this.idEmpresa) {
      this._empresasService.obtenerEmpresa(this.idEmpresa).subscribe((info) => {
        this.empresa = info;
      },
        (error) => {
          this.mensaje = "No se ha podido obtener la empresa";

          this.abrirModal(this.mensajeModal);
        });
    } else {
      this.empresa = {
        id: "",
        ciudad: "",
        fechaNacimiento: "",
        local: "",
        nombre: "",
        provincia: "",
        ruc: "",
        telefono: "",
        estado: "",
      }
    }
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  get empForm() {
    return this.empresaForm.controls;
  }
  guardarEmpresa() {
    this.empresaSubmitted = true;
    if (this.empresaForm.invalid) {
      return;
    }
    if (this.idEmpresa == "") {
      this._empresasService.crearEmpresa(this.empresa).subscribe((info) => {
        this.obtenerListaEmpresas();
        this.mensaje = "Empresa guardada con éxito";
        this.abrirModal(this.mensajeModal);
        this.toggleSidebar('guardarEmpresa', '');
      },
        (error) => {
          let errores = Object.values(error);
          let llaves = Object.keys(error);
          this.mensaje = "";
          errores.map((infoErrores, index) => {
            this.mensaje += llaves[index] + ": " + infoErrores + "<br>";
          });
          this.abrirModal(this.mensajeModal);
        });
    } else {
      this._empresasService.actualizarEmpresa(this.empresa).subscribe((info) => {
        this.obtenerListaEmpresas();
        this.mensaje = "Empresa actualizada con éxito";
        this.abrirModal(this.mensajeModal);
        this.toggleSidebar('guardarEmpresa', '');

      },
        (error) => {
          let errores = Object.values(error);
          let llaves = Object.keys(error);
          this.mensaje = "";
          errores.map((infoErrores, index) => {
            this.mensaje += llaves[index] + ": " + infoErrores + "<br>";
          });
          this.abrirModal(this.mensajeModal);
        });
    }

  }
  eliminarEmpresa(){
    this._empresasService.eliminarEmpresa(this.idEmpresa).subscribe(()=>{
      this.obtenerListaEmpresas();
      this.mensaje = "Empresa eliminada correctamente";
      this.abrirModal(this.mensajeModal);
    },
    (error) => {
      this.mensaje = "Ha ocurrido un error al eliminar la empresa";
      this.abrirModal(this.mensajeModal);
    });
  }
  obtenerListaEmpresas() {
    this._empresasService.obtenerListaEmpresas({
      page: this.page - 1, page_size: this.page_size
    }).subscribe(info => {
      this.empresas = info.info;
      this.collectionSize = info.cont;
    });
  }
  iniciarPaginador() {
    this.paginator.pageChange.subscribe(() => {
      this.obtenerListaEmpresas();
    });
  }
  eliminarEmpresaModal(id){
    this.idEmpresa = id;
    this.abrirModal(this.eliminarEmpresaMdl);
  }
  abrirModal(modal) {
    this._modalService.open(modal)
  }
  cerrarModal() {
    this._modalService.dismissAll();
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
