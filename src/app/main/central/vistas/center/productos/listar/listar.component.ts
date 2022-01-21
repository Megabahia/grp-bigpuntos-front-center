import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from '../productos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parametrizacion } from '../models/productos';
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
  @ViewChild('eliminarParametroMdl') eliminarParametroMdl;
  @ViewChild('mensajeModal') mensajeModal;
  public parametrizacionForm: FormGroup;
  public productosSubmitted: boolean = false;
  public page = 1;
  public pageSize: any = 10;
  public maxSize;
  public collectionSize;
  public idParametro;
  public listaProductos;
  public tiposOpciones: string = "";
  public tipos;
  public parametrizacion: Parametrizacion;
  public nombreBuscar;
  public parametros;
  public tipoPadre = "";
  public padres;
  public mensaje = "";
  public idPadre = "";
  private _unsubscribeAll: Subject<any>;

  constructor(
    private productosService: ProductosService,
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
  inicializarParametrizacion() {
    return {
      id: "",
      descripcion: "",
      idPadre: "",
      // maximo: "",
      // minimo: "",
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

    this.obtenerListaProductos();
  }
  guardarParametro() {
    this.productosSubmitted = true;
    if (this.parametrizacionForm.invalid) {
      return;
    }

  }
  obtenerListaProductos() {
    // this.paramService.obtenerListaParametrizaciones(
    //   {
    //     page: this.page - 1,
    //     page_size: this.pageSize,
    //     // tipo: this.tiposOpciones,
    //     // nombre: this.nombreBuscar
    //   }
    // ).subscribe((info) => {
    //   this.parametros = info.info;
    //   this.collectionSize = info.cont;
    // });
  }
  toggleSidebar(name, id): void {
    this.idParametro = id;

    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  iniciarPaginador() {

    this.paginator.pageChange.subscribe(() => {
      this.obtenerListaProductos();
    });
  }

  eliminarParametroModal(id) {
    this.idParametro = id;
    this.abrirModal(this.eliminarParametroMdl);
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
