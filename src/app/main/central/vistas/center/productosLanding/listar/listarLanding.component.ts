import {Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, AfterViewInit} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ProductosService} from '../productos.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Producto} from '../models/productos';
import {DatePipe} from '@angular/common';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {ParametrizacionesService} from '../../parametrizaciones/parametrizaciones.service';
import {FlatpickrOptions} from 'ng2-flatpickr';
import moment from 'moment';

/**
 * Bigpuntos
 * Center
 * ESta pantalla sirve para listar los productos de la pantalla de landing
 * Rutas:
 * `${environment.apiUrl}/corp/empresas/listOne/filtros/`,
 * `${environment.apiUrl}/central/productos/update/${id}`,
 * `${environment.apiUrl}/central/productos/create/`,
 * `${environment.apiUrl}/central/param/list/tipo/todos/`,
 * `${environment.apiUrl}/central/productos/list/`,
 * `${environment.apiUrl}/central/productos/listOne/${id}`
 * `${environment.apiUrl}/central/productos/delete/${id}`
 */

@Component({
    selector: 'app-listar',
    templateUrl: './listarLanding.component.html',
    styleUrls: ['./listarLanding.component.scss'],
    providers: [DatePipe]

})
export class ListarLandingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('eliminarProductoMdl') eliminarProductoMdl;
    @ViewChild('mensajeModal') mensajeModal;
    public productoForm: FormGroup;
    public productosSubmitted = false;
    public page = 1;
    public pageSize: any = 10;
    public maxSize;
    public collectionSize;
    public idProducto;
    public loading = false;
    public listaProductos;
    public empresa_id;
    public imagen;
    public productosFormData = new FormData();
    public tiposOpciones = '';
    public tipos;
    public tipoProductoOpciones;
    public producto: Producto;
    public nombreBuscar;
    public productos;
    selectedRow = 'clientes';
    filter = [
        {id: 'clientes', name: 'Cliente'},
        {id: 'empleados', name: 'Empleado'},
    ];
    public fecha = '';
    public padres;
    public mensaje = '';
    public idPadre = '';
    public startDateOptions: FlatpickrOptions = {
        altInput: true,
        mode: 'single',
        altFormat: 'Y-n-j',
        altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    };
    private _unsubscribeAll: Subject<any>;
    public tipoEmpresaOpciones;

    constructor(
        private productosService: ProductosService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _coreSidebarService: CoreSidebarService,
        private paramService: ParametrizacionesService,
        private datePipe: DatePipe,
        private changeDetector: ChangeDetectorRef,
    ) {
        this._unsubscribeAll = new Subject();
        this.idProducto = '';
        this.producto = this.inicializarProducto();
    }

    get prodForm() {
        return this.productoForm.controls;
    }

    inicializarProducto(): Producto {
        return {
            _id: '',
            cantidad: 0,
            codigoQR: '',
            efectivo: 0,
            empresa_id: '',
            marca: '',
            nombre: '',
            precioNormal: 0,
            precioSupermonedas: 0,
            vigencia: '',
            tipo: 'presentacion',
            imagen: ''
        };
    }

    obtenerEmpresaId() {
        this.paramService.obtenerEmpresa({
            nombreComercial: 'Global RedPyme'
        }).subscribe((info) => {
            this.empresa_id = info._id;
        }, (error) => {
            this.mensaje = 'Ha ocurrido un error al actualizar su imagen';
            this.abrirModal(this.mensajeModal);
        });
    }

    obtenerListaEmpresasComerciales() {
        this.productosService.obtenerListaEmpresas({
            'page_size': 10,
            'page': 0
        }).subscribe((info) => {
            console.log('....---..', info);
            this.tipoEmpresaOpciones = info.info;
            this.collectionSize = info.cont;
        });
    }

    obtenerFecha() {
        this.producto.vigencia = moment(this.prodForm.vigencia.value[0]).format('YYYY-MM-DD');
    }

    ngOnInit(): void {
        this.productoForm = this._formBuilder.group({
            // cantidad: [0, [Validators.required, Validators.min(1)]],
            efectivo: [0, [Validators.required, Validators.min(1)]],
            // marca: ['', [Validators.required]],
            empresa_id: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            precioNormal: [0, [Validators.required, Validators.min(1)]],
            precioSupermonedas: [0, [Validators.required, Validators.min(1)]],
            // vigencia: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
        });
        this.fecha = this.transformarFecha(new Date());
        this.opcionesTipoProductos();
        this.obtenerEmpresaId();
        this.changeDetector.detectChanges();
        this.obtenerListaEmpresasComerciales();
    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    ngAfterViewInit() {
        this.iniciarPaginador();

        this.obtenerListaProductos(this.selectedRow);
    }

    guardarProducto() {
        this.productosSubmitted = true;
        if (this.productoForm.invalid) {
            return;
        }
        const productoValores = Object.values(this.producto);
        const productoLlaves = Object.keys(this.producto);
        productoLlaves.map((llaves, index) => {
            if (llaves !== 'imagen') {
                if (productoValores[index]) {
                    this.productosFormData.delete(llaves);
                    this.productosFormData.append(llaves, productoValores[index]);
                }
            }
        });

        this.loading = true;
        if (this.producto._id) {
            // let productoAct: any;
            // if (!this.productosFormData.get('imagen')) {
            //   productoAct = this.producto;
            //   delete productoAct.imagen;
            // } else {
            //   productoAct = this.productosFormData;
            // }
            this.productosService.actualizarProductoLanding(this.productosFormData, this.producto._id).subscribe(() => {
                    this.obtenerListaProductos(this.selectedRow);
                    this.mensaje = 'Producto actualizado con éxito';
                    this.abrirModal(this.mensajeModal);
                    this.loading = false;
                },
                (error) => {
                    this.mensaje = 'Ha ocurrido un error';
                    this.abrirModal(this.mensajeModal);
                    this.loading = false;
                });
        } else {

            this.productosService.crearProductoLanding(this.productosFormData).subscribe((info) => {
                    this.obtenerListaProductos(this.selectedRow);
                    this.mensaje = 'Producto guardado con éxito';
                    this.abrirModal(this.mensajeModal);
                    this.loading = false;
                },
                (error) => {
                    this.mensaje = 'Ha ocurrido un error';
                    this.abrirModal(this.mensajeModal);
                    this.loading = false;
                });
        }


    }

    async subirImagen(event) {

        if (event.target.files && event.target.files[0]) {
            const imagen = event.target.files[0];
            this.imagen = imagen.name;
            this.productosFormData.delete('imagen');
            this.productosFormData.append('imagen', imagen, Date.now() + '_' + imagen.name);
        }
    }

    opcionesTipoProductos() {
        this.paramService.obtenerListaPadres('TIPO_PRODUCTO').subscribe((info) => {
            this.tipoProductoOpciones = info;
        });
    }

    filterRows() {
        console.log('llega', this.selectedRow);
        this.obtenerListaProductos(this.selectedRow);
    }

    obtenerListaProductos(tipo) {
        this.productosService.obtenerListaProductosLanding(
            {
                page: this.page - 1,
                page_size: this.pageSize,
                tipo: '' + tipo,
                // nombre: this.nombreBuscar
            }
        ).subscribe((info) => {
            this.productos = info.info;
            // this.filterRows();
            this.collectionSize = info.cont;
        });
    }

    toggleSidebar(name, id): void {
        this.imagen = '';
        if (id) {
            this.productosService.obtenerProductoLanding(id).subscribe((info) => {
                this.producto = info;
                this.fecha = info.vigencia;
                this.imagen = this.visualizarNombreArchivo(info.imagen);
            }, (error) => {

            });
        } else {
            this.productosFormData = new FormData();
            this.producto = this.inicializarProducto();
        }
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    iniciarPaginador() {

        this.paginator.pageChange.subscribe(() => {
            this.obtenerListaProductos(this.selectedRow);
        });
    }

    visualizarNombreArchivo(nombre) {
        const stringArchivos = 'https://globalredpymes.s3.amazonaws.com/CENTRAL/imgProductos/';
        return nombre.replace(stringArchivos, '');
    }

    eliminarProductoModal(id) {
        this.idProducto = id;
        this.abrirModal(this.eliminarProductoMdl);
    }

    eliminarProducto() {
        this.productosService.eliminarProductoLanding(this.idProducto).subscribe((info) => {
                this.obtenerListaProductos(this.selectedRow);
                this.mensaje = 'Producto eliminado con éxito';
                this.abrirModal(this.mensajeModal);
            },
            (error) => {
                this.mensaje = 'Error al eliminar producto';
                this.abrirModal(this.mensajeModal);
            });
    }

    abrirModal(modal) {
        this._modalService.open(modal);
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
