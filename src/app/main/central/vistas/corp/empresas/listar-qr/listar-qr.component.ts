import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {Empresa} from '../models/empresas';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParametrizacionesService} from '../../../center/parametrizaciones/parametrizaciones.service';
import {DatePipe} from '@angular/common';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {EmpresasService} from '../empresas.service';
// Libreria para exportar
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-listar-qr',
    templateUrl: './listar-qr.component.html',
    styleUrls: ['./listar-qr.component.scss'],
    providers: [DatePipe]
})
export class ListarQrComponent implements OnInit {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('mensajeModal') mensajeModal;
    @ViewChild('eliminarEmpresaMdl') eliminarEmpresaMdl;
    public page = 1;
    public page_size: any = 10;
    public maxSize;
    public collectionSize;
    public empresas;
    public empresa: Empresa;
    public imagen;
    private _unsubscribeAll: Subject<any>;
    private idEmpresa;
    public empresaForm: FormGroup;
    public empresaSubmitted: boolean;
    public empresaFormData = new FormData();

    public mensaje = '';
    public cargandoEmpresa = false;
    public tipoEmpresaOpciones;
    public categoriaEmpresaOpciones;
    public paisOpciones;
    public provinciaOpciones;
    public ciudadOpciones;
    public urlCodigoQR = 'http://209.145.61.41:4201/pages/premios/';

    constructor
    (
        private paramService: ParametrizacionesService,
        private datePipe: DatePipe,
        private _coreSidebarService: CoreSidebarService,
        private _empresasService: EmpresasService,
        private _formBuilder: FormBuilder,
        private _modalService: NgbModal,
    ) {
        this._unsubscribeAll = new Subject();
        this.idEmpresa = '';
        this.empresa = this.inicializarEmpresa();
    }

    inicializarEmpresa() {
        return {
            id: '',
            direccion: '',
            ciudad: '',
            correo: '',
            estado: '',
            nombreComercial: '',
            nombreEmpresa: '',
            pais: '',
            provincia: '',
            ruc: '',
            telefono1: '',
            telefono2: '',
            tipoCategoria: '',
            tipoEmpresa: ''
        };
    }

    async subirImagen(event) {

        if (event.target.files && event.target.files[0]) {
            const imagen = event.target.files[0];
            this.imagen = imagen.name;
            this.empresaFormData.delete('imagen');
            this.empresaFormData.append('imagen', imagen, Date.now() + '_' + imagen.name);
        }
    }

    ngOnInit(): void {
        this.empresaForm = this._formBuilder.group({
            direccion: ['', [Validators.required]],
            ciudad: ['', [Validators.required]],
            correo: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            nombreComercial: ['', [Validators.required]],
            nombreEmpresa: ['', [Validators.required]],
            pais: ['', [Validators.required]],
            provincia: ['', [Validators.required]],
            ruc: ['', [Validators.required]],
            telefono1: ['', [Validators.required]],
            telefono2: ['', [Validators.required]],
            tipoCategoria: ['', [Validators.required]],
            tipoEmpresa: ['', [Validators.required]],
        });
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerListaEmpresas();
        this.obtenerTipoEmpresaOpciones();
        this.obtenerCategoriaEmpresaOpciones();
        this.obtenerPaisOpciones();
        this.obtenerProvinciaOpciones();
        this.obtenerCiudadOpciones();
    }

    toggleSidebar(name, id): void {
        this.idEmpresa = id;
        if (this.idEmpresa) {
            this._empresasService.obtenerEmpresa(this.idEmpresa).subscribe((info) => {
                    this.empresa = info;
                    this.imagen = this.visualizarNombreArchivo(info.imagen);
                    this.obtenerPaisOpciones();
                    this.obtenerProvinciaOpciones();
                    this.obtenerCiudadOpciones();
                },
                (error) => {
                    this.mensaje = 'No se ha podido obtener la empresa';

                    this.abrirModal(this.mensajeModal);
                });
        } else {
            this.empresa = this.inicializarEmpresa();
        }
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    visualizarNombreArchivo(nombre) {
        const stringArchivos = 'https://globalredpymes.s3.amazonaws.com/CORP/imgEmpresas/';
        return nombre.replace(stringArchivos, '');
    }

    get empForm() {
        return this.empresaForm.controls;
    }

    guardarEmpresa() {
        this.empresaSubmitted = true;
        if (this.empresaForm.invalid) {
            return;
        }
        this.cargandoEmpresa = true;
        const productoValores = Object.values(this.empresa);
        const productoLlaves = Object.keys(this.empresa);
        productoLlaves.map((llaves, index) => {
            if (llaves !== 'imagen') {
                if (productoValores[index]) {
                    this.empresaFormData.delete(llaves);
                    this.empresaFormData.append(llaves, productoValores[index]);
                }
            }
        });
        if (this.idEmpresa === '') {
            this._empresasService.crearEmpresa(this.empresaFormData).subscribe((info) => {
                    this.obtenerListaEmpresas();
                    this.mensaje = 'Empresa guardada con éxito';
                    this.abrirModal(this.mensajeModal);
                    this.toggleSidebar('guardarEmpresa', '');
                    this.cargandoEmpresa = false;

                },
                (error) => {
                    const errores = Object.values(error);
                    const llaves = Object.keys(error);
                    this.mensaje = 'Error al crear empresa';

                    this.abrirModal(this.mensajeModal);
                    this.cargandoEmpresa = false;

                });
        } else {
            this._empresasService.actualizarEmpresa(this.empresaFormData, this.idEmpresa).subscribe((info) => {
                    this.obtenerListaEmpresas();
                    this.mensaje = 'Empresa actualizada con éxito';
                    this.abrirModal(this.mensajeModal);
                    this.toggleSidebar('guardarEmpresa', '');
                    this.cargandoEmpresa = false;

                },
                (error) => {
                    const errores = Object.values(error);
                    const llaves = Object.keys(error);
                    this.mensaje = 'Error al actualizar empresa';
                    this.abrirModal(this.mensajeModal);
                    this.cargandoEmpresa = false;

                });
        }

    }

    obtenerTipoEmpresaOpciones() {
        this.paramService.obtenerListaPadres('TIPO_EMPRESA').subscribe((info) => {
            this.tipoEmpresaOpciones = info;
        });
    }

    obtenerCategoriaEmpresaOpciones() {
        this.paramService.obtenerListaPadres('CATEGORIA_EMPRESA').subscribe((info) => {
            this.categoriaEmpresaOpciones = info;
        });
    }

    obtenerPaisOpciones() {
        this.paramService.obtenerListaPadres('PAIS').subscribe((info) => {
            this.paisOpciones = info;
        });
    }

    obtenerProvinciaOpciones() {
        this.paramService.obtenerListaHijos(this.empresa.pais, 'PAIS').subscribe((info) => {
            this.provinciaOpciones = info;
        });
    }

    obtenerCiudadOpciones() {
        this.paramService.obtenerListaHijos(this.empresa.provincia, 'PROVINCIA').subscribe((info) => {
            this.ciudadOpciones = info;
        });
    }

    obtenerListaEmpresas() {
        this._empresasService.obtenerListaEmpresas({
            page: this.page - 1, page_size: this.page_size, tipoEmpresa: 'corp'
        }).subscribe(info => {
            this.empresas = info.info;
            this.collectionSize = info.cont;
        });
    }

    exportHtmlToPDF() {
        const data = document.getElementById('print-section');
        html2canvas(data).then((canvas) => {
            const docWidth = 208;
            const docHeight = (canvas.height * docWidth) / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const position = 0;
            doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight);

            doc.save('codigo-qr-Empresa.pdf');
        });
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerListaEmpresas();
        });
    }

    eliminarEmpresaModal(id) {
        this.idEmpresa = id;
        this.abrirModal(this.eliminarEmpresaMdl);
    }

    abrirModal(modal) {
        this._modalService.open(modal);
    }

    cerrarModal() {
        this._modalService.dismissAll();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
