import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ParametrizacionesService } from '../parametrizaciones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parametrizacion } from '../models/parametrizaciones';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { CoreSidebarService } from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [DatePipe]

})
export class ListarComponent implements OnInit {
  @ViewChild(NgbPagination) paginator: NgbPagination;
  @ViewChild('eliminarParametrizacionMdl') eliminarParametrizacionMdl;
  @ViewChild('mensajeModal') mensajeModal;
  public parametrizacionForm: FormGroup;
  public paramSubmitted: boolean;
  public page = 1;
  public pageSize: any = 10;
  public maxSize;
  public collectionSize;
  public idParametro;
  public listaParametros;
  public tiposOpciones: string = "";
  public tipos;
  public parametrizacion: Parametrizacion;
  public nombreBuscar;
  public parametros;
  public tipoPadre;
  public padres;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private paramService: ParametrizacionesService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _coreSidebarService: CoreSidebarService,

  ) {
    this._unsubscribeAll = new Subject();
    this.idParametro = "";
    this.parametrizacion = this.inicializarParametrizacion();
  }
  get paramForm() {
    return this.parametrizacionForm.controls;
  }
  inicializarParametrizacion(){
    return {
      id: "",
      descripcion: "",
      idPadre: "",
      maximo: "",
      minimo: "",
      nombre: "",
      tipo: "",
      tipoVariable: "",
      valor: ""
    }
  }

  ngOnInit(): void {
    this.parametrizacionForm = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoVariable: ['', [Validators.required]],
      valor: ['', [Validators.required]]
    });
  }
  ngAfterViewInit() {
    this.iniciarPaginador();

    this.obtenerListaParametros();
  }
  insertarParametro(){
    
  }
  gestionarParametro(){

  }
  obtenerListaParametros() {
    this.paramService.obtenerListaParametrizaciones(
      {
        page: this.page - 1,
        page_size: this.pageSize,
        // tipo: this.tiposOpciones,
        // nombre: this.nombreBuscar
      }
    ).subscribe((info) => {
      this.parametros = info.info;
      this.collectionSize = info.cont;
    });
  }
  toggleSidebar(name, id): void {
    this.idParametro = id;
    if (this.idParametro) {
      // this._usuariosService.obtenerUsuario(this.idUsuario).subscribe((info) => {
      //   this.usuario = info;
      // },
      //   (error) => {
      //     this.mensaje = "No se ha podido obtener la empresa";

      //     this.abrirModal(this.mensajeModal);
      //   });
    } else {
      this.parametrizacion = this.inicializarParametrizacion();
    }
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  iniciarPaginador() {
    this.paginator.pageChange.subscribe(() => {
      this.obtenerListaParametros();
    });
  }
  eliminarUsuarioModal(id) {
    this.idParametro = id;
    this.abrirModal(this.eliminarParametrizacionMdl);
  }
  abrirModal(modal) {
    this._modalService.open(modal)
  }
  cerrarModal() {
    this._modalService.dismissAll();
  }
  async buscarPadre() {
    await this.paramService.obtenerListaPadres(this.tipoPadre).subscribe((result) => {
      this.padres = result;
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
