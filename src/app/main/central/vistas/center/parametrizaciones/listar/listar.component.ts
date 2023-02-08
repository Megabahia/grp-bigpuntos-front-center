import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ParametrizacionesService} from '../parametrizaciones.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Parametrizacion} from '../models/parametrizaciones';
import {DatePipe} from '@angular/common';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {ExportService} from '../../../../../../services/export/export.service';
import {log} from 'util';

@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss'],
    providers: [DatePipe]

})
export class ListarComponent implements OnInit {
    title = 'table-tutorial';

    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('eliminarParametroMdl') eliminarParametroMdl;
    @ViewChild('mensajeModal') mensajeModal;
    public parametrizacionForm: FormGroup;
    public paramSubmitted: boolean = false;
    public page = 1;
    public pageSize: any = 10;
    public maxSize;
    public collectionSize;
    public idParametro;
    public listaParametros;
    public tiposOpciones: string = '';
    public tipos;
    public parametrizacion: Parametrizacion;
    public nombreBuscar;
    public parametros;
    public fijosParametros;
    public tipoPadre = '';
    public padres;
    public mensaje = '';
    public idPadre = '';
    private _unsubscribeAll: Subject<any>;
    public searchValueDescripcion = '';
    public searchValueNombre = '';
    public infoExportar;

    constructor(
        private paramService: ParametrizacionesService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _coreSidebarService: CoreSidebarService,
        private exportFile: ExportService,
    ) {
        this._unsubscribeAll = new Subject();
        this.idParametro = '';
        this.parametrizacion = this.inicializarParametrizacion();
    }

    get paramForm() {
        return this.parametrizacionForm.controls;
    }

    inicializarParametrizacion() {
        return {
            id: '',
            descripcion: '',
            idPadre: '',
            // maximo: "",
            // minimo: "",
            nombre: '',
            tipo: '',
            tipoVariable: '',
            valor: '',
            config: '',
        };
    }

    ngOnInit(): void {
        this.parametrizacionForm = this._formBuilder.group({
            nombre: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            tipoVariable: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            config: ['']
        });
    }

    ngAfterViewInit() {


        this.obtenerListaParametros();
    }

    guardarParametro() {
        this.paramSubmitted = true;
        if (this.parametrizacionForm.invalid) {
            return;
        }
        // console.log('va guardar configuracion ', this.parametrizacion.config.toString().split(','));
        this.parametrizacion.config = this.parametrizacion.config.toString().split(',');
        console.log('this', this.parametrizacion);
        if (this.idParametro == '') {
            this.paramService.crearParametro(this.parametrizacion).subscribe((info) => {
                    this.mensaje = 'Parámetro creado correctamente';
                    this.abrirModal(this.mensajeModal);
                    this.obtenerListaParametros();
                    this.toggleSidebar('guardarParametrizacion', '');
                },
                (error) => {
                    this.mensaje = 'No se ha podido guardar el parámetro';
                    this.abrirModal(this.mensajeModal);
                    this.toggleSidebar('guardarParametrizacion', '');

                });
        } else {
            this.paramService.actualizarParametro(this.parametrizacion).subscribe((info) => {
                    this.mensaje = 'Parámetro actualizado con éxito';
                    this.abrirModal(this.mensajeModal);
                    this.obtenerListaParametros();
                    this.toggleSidebar('guardarParametrizacion', '');
                },
                (error) => {
                    this.mensaje = 'No se ha podido actualizar el parámetro';
                    this.abrirModal(this.mensajeModal);
                    this.toggleSidebar('guardarParametrizacion', '');

                });
        }
    }

    obtenerListaParametros() {
        this.paramService.obtenerListaParametrizaciones(
            {
                page: this.page - 1,
                page_size: this.pageSize,
                descripcion: this.searchValueDescripcion,
                nombre: this.searchValueNombre
            }
        ).subscribe((info) => {
            this.parametros = info.info;
            this.fijosParametros = info.info;
            this.collectionSize = info.cont;
        });
    }

    toggleSidebar(name, id): void {
        this.idParametro = id;
        if (this.idParametro) {
            this.paramService.obtenerParametro(this.idParametro).subscribe((info) => {
                    this.parametrizacion = info;
                    this.parametrizacion.config = this.parametrizacion.config;
                    if (info.idPadre && info.idPadre != 'None') {
                        this.paramService.obtenerParametro(info.idPadre).subscribe((data) => {
                            this.tipoPadre = data.tipo;
                            this.paramService.obtenerListaPadres(data.tipo).subscribe((infoLista) => {
                                this.padres = infoLista;
                            });
                        });
                        this.parametrizacion.idPadre = info.idPadre;
                    } else {
                        this.tipoPadre = '';
                        this.parametrizacion.idPadre = '';
                    }
                },
                (error) => {
                    this.mensaje = 'No se ha podido obtener el parámetro';

                    this.abrirModal(this.mensajeModal);
                });
        } else {
            this.parametrizacion = this.inicializarParametrizacion();
        }
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }


    eliminarParametroModal(id) {
        this.idParametro = id;
        this.abrirModal(this.eliminarParametroMdl);
    }

    eliminarParametro() {
        this.paramService.eliminarParametro(this.idParametro).subscribe(() => {
                this.obtenerListaParametros();
                this.mensaje = 'Parámetro eliminado correctamente';
                this.abrirModal(this.mensajeModal);
            },
            (error) => {
                this.mensaje = 'Ha ocurrido un error al eliminar';
                this.abrirModal(this.mensajeModal);
            });
    }

    abrirModal(modal) {
        this._modalService.open(modal);
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

    filterUpdate(event) {
        // this.obtenerListaParametros();
        // Reset ng-select on search
        // this.selectedStatus = this.selectStatus[0];
        this.obtenerListaParametros();
        // const val = event.target.value.toLowerCase();
        //
        // // filter our data
        // const temp = this.fijosParametros.filter(function (parametro) {
        //     // console.log('----', parametro);
        //     return parametro.nombre.toLowerCase().indexOf(val) !== -1 || parametro.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
        // });
        //
        // // update the rows
        // this.parametros = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    }

    exportarExcel() {
        this.paramService.exportar().subscribe((data) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'parametrizaciones.xls';
            link.click();
        });
    }
}
