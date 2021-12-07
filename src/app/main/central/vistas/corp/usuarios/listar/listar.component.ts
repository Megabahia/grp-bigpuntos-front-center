import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

import { compararPassword, Usuario } from '../models/usuarios';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [DatePipe]
})
export class ListarComponent implements OnInit {
  @ViewChild(NgbPagination) paginator: NgbPagination;
  @ViewChild('mensajeModal') mensajeModal;
  @ViewChild('eliminarUsuarioMdl') eliminarUsuarioMdl;
  public page = 1;
  public page_size: any = 10;
  public maxSize;
  public collectionSize;
  public listaUsuarios;
  public usuario: Usuario;
  private _unsubscribeAll: Subject<any>;
  private idUsuario;
  public ruc;
  public usuarioForm: FormGroup;
  public usuarioSubmitted: boolean;
  public mensaje = "";
  constructor(
    private datePipe: DatePipe,
    private _coreSidebarService: CoreSidebarService,
    private _usuariosService: UsuariosService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
  ) {
    this._unsubscribeAll = new Subject();
    this.idUsuario = "";
    this.usuario = {
      id: "",
      email: "",
      password: "",
      empresa: "",
    }
  }

  ngOnInit(): void {
    this.usuarioForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
    }, { validators: compararPassword });
  }
  ngAfterViewInit() {
    this.iniciarPaginador();

    this.obtenerListaUsuarios();
  }
  obtenerListaUsuarios(){

  }
  toggleSidebar(name, id): void {
    this.idUsuario = id;
    if (this.idUsuario) {
      // this._usuariosService.obtenerUsuario(this.idUsuario).subscribe((info) => {
      //   this.usuario = info;
      // },
      //   (error) => {
      //     this.mensaje = "No se ha podido obtener la empresa";

      //     this.abrirModal(this.mensajeModal);
      //   });
    } else {
      this.usuario = {
        id: "",
        password:"",
        email:"",
        empresa:"",
      }
    }
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  guardarUsuario() {
    this.usuarioSubmitted = true;
    if (this.usuarioForm.invalid) {
      return;
    }
    // if (this.idEmpresa == "") {
    //   this._empresasService.crearEmpresa(this.empresa).subscribe((info) => {
    //     this.obtenerListaEmpresas();
    //     this.mensaje = "Empresa guardada con éxito";
    //     this.abrirModal(this.mensajeModal);
    //     this.toggleSidebar('guardarEmpresa', '');
    //   },
    //     (error) => {
    //       let errores = Object.values(error);
    //       let llaves = Object.keys(error);
    //       this.mensaje = "";
    //       errores.map((infoErrores, index) => {
    //         this.mensaje += llaves[index] + ": " + infoErrores + "<br>";
    //       });
    //       this.abrirModal(this.mensajeModal);
    //     });
    // } else {
    //   this._empresasService.actualizarEmpresa(this.empresa).subscribe((info) => {
    //     this.obtenerListaEmpresas();
    //     this.mensaje = "Empresa actualizada con éxito";
    //     this.abrirModal(this.mensajeModal);
    //     this.toggleSidebar('guardarEmpresa', '');

    //   },
    //     (error) => {
    //       let errores = Object.values(error);
    //       let llaves = Object.keys(error);
    //       this.mensaje = "";
    //       errores.map((infoErrores, index) => {
    //         this.mensaje += llaves[index] + ": " + infoErrores + "<br>";
    //       });
    //       this.abrirModal(this.mensajeModal);
    //     });
    // }

  }
  eliminarUsuario(){
    // this._empresasService.eliminarEmpresa(this.idEmpresa).subscribe(()=>{
    //   this.obtenerListaEmpresas();
    //   this.mensaje = "Empresa eliminada correctamente";
    //   this.abrirModal(this.mensajeModal);
    // },
    // (error) => {
    //   this.mensaje = "Ha ocurrido un error al eliminar la empresa";
    //   this.abrirModal(this.mensajeModal);
    // });
  }
  get usuForm() {
    return this.usuarioForm.controls;
  }
  iniciarPaginador() {
    this.paginator.pageChange.subscribe(() => {
      this.obtenerListaUsuarios();
    });
  }
  eliminarUsuarioModal(id){
    this.idUsuario = id;
    this.abrirModal(this.eliminarUsuarioMdl);
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
