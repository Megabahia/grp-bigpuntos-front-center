import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

import { compararPassword, Usuario } from '../models/usuarios';
import { RolesService } from '../../roles/roles.service';

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
  public listaRoles;
  public listaEmpresas;
  public usuario: Usuario;
  private _unsubscribeAll: Subject<any>;
  public idUsuario;
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
    private _rolService: RolesService,

  ) {
    this._unsubscribeAll = new Subject();
    this.idUsuario = "";
    this.usuario = {
      id: "",
      email: "",
      password: "",
      empresa: "",
      roles: "",
    }
  }

  ngOnInit(): void {
    this.usuarioForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
    }, { validators: compararPassword });
  }
  ngAfterViewInit() {
    this.iniciarPaginador();

    this.obtenerListaUsuarios();
    this.obtenerListaRoles(); 
  }
  obtenerListaUsuarios(){
    this._usuariosService.obtenerListaUsuarios({
      page: this.page - 1, page_size: this.page_size, tipoUsuario: "corp"
    }).subscribe(info => {
      this.listaUsuarios = info.info;
      this.collectionSize = info.cont;
    });
  }
  obtenerListaRoles() { 
    this._rolService.obtenerListaRoles({
      page: this.page - 1, page_size: this.page_size, tipoUsuario: "corp"
    }).subscribe(info => {
      this.listaRoles = info.info;
      this.collectionSize = info.cont;
    });
  }
  obtenerListaEmpresas(){
    this._usuariosService.obtenerListaEmpresas({
      ruc:this.ruc
    }).subscribe((info)=>{
      this.listaEmpresas = info.info;
    },
    (error)=>
    {

    });
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
        roles:"",
        empresa:"",
      }
    }
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  guardarUsuario() {
    console.log(this.usuarioForm);
    this.usuarioSubmitted = true;
    if (this.usuarioForm.invalid) {
      return;
    }
    if(this.idUsuario ==""){
      this._usuariosService.crearUsuario({...this.usuario,tipoUsuario:"corp"}).subscribe((info)=>{
        this.mensaje = "Usuario creado correctamente";
        this.abrirModal(this.mensajeModal);
        this.obtenerListaUsuarios();
        this.toggleSidebar('guardarUsuario', '');
      },(error)=>{
        this.mensaje = "Error al crear el usuario";
        this.abrirModal(this.mensajeModal);
        this.toggleSidebar('guardarUsuario', '');
      });
    }else{
      this._usuariosService.actualizarUsuario(this.usuario).subscribe((info)=>{
        this.mensaje = "Usuario actualizado correctamente";
        this.abrirModal(this.mensajeModal);
        this.obtenerListaUsuarios();
        this.toggleSidebar('guardarUsuario', '');
      },(error)=>{
        this.mensaje = "Error al actualizar el usuario";
        this.abrirModal(this.mensajeModal);
        this.toggleSidebar('guardarUsuario', '');
      });
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
    this._usuariosService.eliminarUsuario(this.idUsuario).subscribe(()=>{
      this.obtenerListaUsuarios();
      this.mensaje = "Usuario eliminado correctamente";
      this.abrirModal(this.mensajeModal);
    },
    (error) => {
      this.mensaje = "Ha ocurrido un error al eliminar el usuario";
      this.abrirModal(this.mensajeModal);
    });
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
