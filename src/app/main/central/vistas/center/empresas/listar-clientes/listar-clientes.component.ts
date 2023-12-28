import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {EmpresasService} from '../empresas.service';
import {Empresa} from '../../../corp/empresas/models/empresas';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ParametrizacionesService} from '../../parametrizaciones/parametrizaciones.service';
import {DatePipe} from '@angular/common';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {environment} from 'environments/environment';

/**
 * Bigpuntos
 * Center
 * ESta pantalla sirve para mostrar las empresas a las cuales pueden obtener premios
 * Rutas:
 * `${environment.apiUrl}/central/empresas/list/`,
 * `${environment.apiUrl}/central/empresas/delete/${id}`
 * `${environment.apiUrl}/central/empresas/listOne/${id}`
 * `${environment.apiUrl}/central/empresas/create/`,
 * `${environment.apiUrl}/central/empresas/update/${id}`,
 */

@Component({
    selector: 'app-listar-clientes',
    templateUrl: './listar-clientes.component.html',
    styleUrls: ['./listar-clientes.component.scss'],
    providers: [DatePipe]
})
export class ListarClientesComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('mensajeModal') mensajeModal;
    @ViewChild('eliminarEmpresaMdl') eliminarEmpresaMdl;
    public page = 1;
    public page_size: any = 10;
    public maxSize;
    public collectionSize;
    private _unsubscribeAll: Subject<any>;

    public empresaForm: FormGroup;
    public empresas;
    public empresasAll;
    private idEmpresa;
    public empresaSubmitted = false;
    public empresaFormData = new FormData();
    private mensaje: string;
    public url;
    selectedRow = 1;
    cars = [
        {id: 1, name: 'Cliente'},
        {id: 2, name: 'Empleado'},
        // {id: 3, name: 'Todas'},
        // { id: 4, name: 'Audi' },
    ];

    constructor(
        private paramService: ParametrizacionesService,
        private datePipe: DatePipe,
        private _coreSidebarService: CoreSidebarService,
        private _empresasService: EmpresasService,
        private _formBuilder: FormBuilder,
        private _modalService: NgbModal,
    ) {
        this._unsubscribeAll = new Subject();
        this.url = environment.urlBigPuntos + 'pages/clientes/';
    }

    get empForm() {
        return this.empresaForm.controls;
    }

    async subirImagen(event) {
        if (event.target.files && event.target.files[0]) {
            const imagen = event.target.files[0];
            this.empresaFormData.delete('logo');
            this.empresaFormData.append('logo', imagen, Date.now() + '_' + imagen.name);
        }
    }

    inicializarEmpresa() {
        this.empresaForm = this._formBuilder.group({
            _id: [''],
            logo: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            bigPuntos: ['', [Validators.required]],
            urlClientes: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            type: ['cliente'],
        });
    }

    ngOnInit(): void {
        this.inicializarEmpresa();
    }

    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerListaEmpresas();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerListaEmpresas();
        });
    }

    obtenerListaEmpresas() {
        this._empresasService.obtenerListaEmpresas({
            page: this.page - 1, page_size: this.page_size
        }).subscribe(info => {
            this.empresasAll = info.info;
            this.filterRows();
            this.collectionSize = info.cont;
        });
    }

    abrirModal(modal) {
        this._modalService.open(modal);
    }

    eliminarEmpresaModal(id) {
        this.idEmpresa = id;
        this.abrirModal(this.eliminarEmpresaMdl);
    }

    eliminarEmpresa() {
        this._empresasService.eliminarEmpresa(this.idEmpresa).subscribe(() => {
                this.obtenerListaEmpresas();
                this.mensaje = 'Empresa eliminada correctamente';
                this.abrirModal(this.mensajeModal);
            },
            (error) => {
                this.mensaje = 'Ha ocurrido un error al eliminar la empresa';
                this.abrirModal(this.mensajeModal);
            });
    }

    toggleSidebar(name, id): void {
        this.empresaSubmitted = false;
        this.idEmpresa = id;
        if (this.idEmpresa) {
            this._empresasService.obtenerEmpresa(this.idEmpresa).subscribe((info) => {
                    delete info.logo;
                    info.urlClientes = info.urlClientes.replace(this.url, '');
                    this.empresaForm.patchValue({...info});
                    // this.imagen = this.visualizarNombreArchivo(info.imagen);
                },
                (error) => {
                    // this.mensaje = 'No se ha podido obtener la empresa';
                    //
                    // this.abrirModal(this.mensajeModal);
                });
        } else {
            this.inicializarEmpresa();
        }
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    filterRows() {
        console.log('llega', this.selectedRow);
        switch (this.selectedRow) {
            case 1: {
                this.empresas = this.empresasAll.filter(item => item.urlClientes);
                break;
            }
            case 2: {
                this.empresas = this.empresasAll.filter(item => item.url);
                break;
            }
            case 3: {
                this.empresas = this.empresasAll;
                break;
            }
        }


    }

    guardarEmpresa() {
        this.empresaSubmitted = true;
        if (this.empresaForm.invalid) {
            console.log('error', this.empresaForm);
            return;
        }
        const productoValores = Object.values(this.empresaForm.value);
        const productoLlaves = Object.keys(this.empresaForm.value);
        productoLlaves.map((llaves, index) => {
            if (llaves !== 'logo') {
                if (productoValores[index]) {
                    this.empresaFormData.delete(llaves);
                    this.empresaFormData.append(llaves, productoValores[`${index}`]);
                }
            }
        });
        if (this.empresaForm.get('_id').value === '') {
            this._empresasService.crearEmpresa(this.empresaFormData).subscribe((info) => {
                    this.obtenerListaEmpresas();
                    // this.mensaje = 'Empresa guardada con éxito';
                    // this.abrirModal(this.mensajeModal);
                    this.toggleSidebar('guardarEmpresa', '');
                    // this.cargandoEmpresa = false;

                },
                (error) => {
                    const errores = Object.values(error);
                    const llaves = Object.keys(error);
                    // this.mensaje = 'Error al crear empresa';
                    //
                    // this.abrirModal(this.mensajeModal);
                    // this.cargandoEmpresa = false;

                });
        } else {
            this._empresasService.actualizarEmpresa(this.empresaFormData, this.idEmpresa).subscribe((info) => {
                    this.obtenerListaEmpresas();
                    // this.mensaje = 'Empresa actualizada con éxito';
                    // this.abrirModal(this.mensajeModal);
                    this.toggleSidebar('guardarEmpresa', '');
                    // this.cargandoEmpresa = false;

                },
                (error) => {
                    const errores = Object.values(error);
                    const llaves = Object.keys(error);
                    // this.mensaje = 'Error al actualizar empresa';
                    // this.abrirModal(this.mensajeModal);
                    // this.cargandoEmpresa = false;

                });
        }

    }

}
