import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Producto} from '../../productos/models/productos';
import {FlatpickrOptions} from 'ng2-flatpickr';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {ParametrizacionesService} from '../../parametrizaciones/parametrizaciones.service';
import {DatePipe} from '@angular/common';
import moment from 'moment';
import {ProductosPremiosService} from '../productos-premios.service';

@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss'],
    providers: [DatePipe],
})
export class ListarComponent implements OnInit {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('eliminarProductoMdl') eliminarProductoMdl;
    @ViewChild('mensajeModal') mensajeModal;
    public productoForm: FormGroup;
    public productosSubmitted: boolean = false;
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
    public tiposOpciones: string = '';
    public tipos;
    public tipoProductoOpciones;
    public tipoEmpresaOpciones;
    public producto: Producto;
    public nombreBuscar;
    public productos;
    public tipoPadre = '';
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

    constructor(
        private productosService: ProductosPremiosService,
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
            tipo: 'producto-premios',
            imagen: ''
        };
    }

    obtenerListaEmpresasComerciales() {
        this.productosService.obtenerListaEmpresasComerciales({}).subscribe((info) => {
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
            marca: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            precioNormal: [0, [Validators.required, Validators.min(1)]],
            precioSupermonedas: [0, [Validators.required, Validators.min(1)]],
            vigencia: ['', [Validators.required]],
            empresa_id: ['', [Validators.required]],
        });
        this.fecha = this.transformarFecha(new Date());
        this.obtenerListaEmpresasComerciales();
        this.changeDetector.detectChanges();

    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerListaProductos();
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
            this.productosService.actualizarProducto(this.productosFormData, this.producto._id).subscribe(() => {
                    this.obtenerListaProductos();
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
            this.productosService.crearProducto(this.productosFormData).subscribe((info) => {
                    this.obtenerListaProductos();
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

    obtenerListaProductos() {
        this.productosService.obtenerListaProductos(
            {
                page: this.page - 1,
                page_size: this.pageSize,
                tipo: 'producto-premios',
                // nombre: this.nombreBuscar
            }
        ).subscribe((info) => {
            this.productos = info.info;
            this.collectionSize = info.cont;
        });
    }

    toggleSidebar(name, id): void {
        this.imagen = '';
        if (id) {
            this.productosService.obtenerProducto(id).subscribe((info) => {
                console.log(info.info);
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

    visualizarNombreArchivo(nombre) {
        const stringArchivos = 'https://globalredpymes.s3.amazonaws.com/CENTRAL/imgProductos/';
        return nombre.replace(stringArchivos, '');
    }

    eliminarProductoModal(id) {
        this.idProducto = id;
        this.abrirModal(this.eliminarProductoMdl);
    }

    eliminarProducto() {
        this.productosService.eliminarProducto(this.idProducto).subscribe((info) => {
                this.obtenerListaProductos();
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

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerListaProductos();
        });
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
