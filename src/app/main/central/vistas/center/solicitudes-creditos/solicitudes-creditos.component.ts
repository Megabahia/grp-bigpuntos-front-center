import {Component, OnInit, ViewChild} from '@angular/core';
import {SolicitudesCreditosService} from './solicitudes-creditos.service';
import {NgbPagination, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActualizarCredito} from '../../../models/creditos';
import {DatePipe} from '@angular/common';
import Stepper from 'bs-stepper';

@Component({
    selector: 'app-solicitudes-creditos',
    templateUrl: './solicitudes-creditos.component.html',
    styleUrls: ['./solicitudes-creditos.component.scss'],
    providers: [DatePipe]
})
export class SolicitudesCreditosComponent implements OnInit {

    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('mensajeModal') mensajeModal;

    // public
    public selectMulti = [{name: 'English'}, {name: 'French'}, {name: 'Spanish'}];
    public selectMultiSelected;

    public tab;
    public page = 1;
    public page_size: any = 4;
    public maxSize;
    public mensaje = '';
    public collectionSize;
    private _unsubscribeAll: Subject<any>;
    public submitted = false;
    public observacionSubmitted = false;
    public userViewData;
    public listaCreditos;
    public actualizarCreditoForm;
    public reporteBuro;

    // data modal user
    public identificacion;
    public papeletaVotacion;
    public identificacionConyuge;
    public papeletaVotacionConyuge;
    public planillaLuzNegocio;
    public planillaLuzDomicilio;
    public facturas;
    public matriculaVehiculo;
    public impuestoPredial;
    public buroCredito;
    public evaluacionCrediticia;
    public calificacionBuro;
    public buroValido;
    // end Data
    public ruc;
    public actualizarCreditoFormData = new FormData();
    public actualizarCredito: ActualizarCredito;
    public cargando = false;
    private modernVerticalWizardStepper: Stepper;
    private ocupacionSolicitante;
    public referenciasSolicitante;
    public ingresosSolicitante;
    public gastosSolicitante;
    public observacionCreditoForm: FormGroup;
    public dataCreditShow;

    constructor(
        private _solicitudCreditosService: SolicitudesCreditosService,
        private modalService: NgbModal,
        private _coreSidebarService: CoreSidebarService,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe,
    ) {
        this._unsubscribeAll = new Subject();
    }

    get controlsFrom() {
        return this.actualizarCreditoForm.controls;
    }

    get fobservacionCredito() {
        return this.observacionCreditoForm.controls;
    }

    ngOnInit(): void {
        this.actualizarCreditoForm = this._formBuilder.group({
            identificacion: ['', [Validators.required]],
            papeletaVotacion: ['', [Validators.required]],
            identificacionConyuge: ['', [Validators.required]],
            papeletaVotacionConyuge: ['', [Validators.required]],
            planillaLuzNegocio: ['', [Validators.required]],
            planillaLuzDomicilio: ['', [Validators.required]],
            facturas: ['', [Validators.required]],
            matriculaVehiculo: [''],
            impuestoPredial: [''],
            buroCredito: ['', [Validators.required]],
            evaluacionCrediticia: ['', [Validators.required]],
            calificacionBuro: ['', [Validators.required]],
            buroValido: ['', [Validators.required]],
        });
        this.actualizarCredito = this.inicializarActualizarCredito();
    }

    inicializarActualizarCredito(): ActualizarCredito {
        return {
            id: '',
            reporteBuroCredito: '',
            calificacionBuro: '',
            tomarSolicitud: '',
            buroCredito: '',
            identificacion: '',
        };
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerSolicitudesCreditos();
    }

    obtenerSolicitudesCreditos() {
        this._solicitudCreditosService.obtenerSolicitudesCreditos({page_size: this.page_size, page: this.page - 1}).subscribe(info => {
            this.collectionSize = info.cont;
            this.listaCreditos = info.info;
        });
    }

    actualizarSolicitudCredito() {
        this.submitted = true;
        if (this.actualizarCreditoForm.invalid) {
            return;
        }
        const creditoValores = Object.values(this.actualizarCredito);
        const creditoLlaves = Object.keys(this.actualizarCredito);
        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index]) {
                this.actualizarCreditoFormData.delete(llaves);
                this.actualizarCreditoFormData.append(llaves, creditoValores[index]);
            }
        });
        this.cargando = true;
        this._solicitudCreditosService.actualizarSolictudesCreditos(this.actualizarCreditoFormData).subscribe((info) => {
                this.cargando = false;
                this.mensaje = 'Crédito actualizado con éxito';
                this.cerrarModal('actualizar-credito');
                this.obtenerSolicitudesCreditos();
            },
            (error) => {
                this.cargando = false;
                this.mensaje = 'Error al actualizar el crédito';
                this.abrirModal(this.mensajeModal);
            });
    }


    async subirDoc(event, key) {
        if (event.target.files && event.target.files[0]) {
            const doc = event.target.files[0];
            this[key] = doc.name;
            this.actualizarCreditoFormData.delete(`${key}`);
            this.actualizarCreditoFormData.append(`${key}`, doc, Date.now() + '_' + doc.name);
        }
    }

    toggleSidebar(name, id): void {
        this.submitted = false;
        this.actualizarCreditoForm.reset();
        for (const elementForm in this.actualizarCreditoForm.controls) {
            this[elementForm] = '';
        }
        if (id) {
            this._solicitudCreditosService.obtenersolicitudCredito(id).subscribe((info) => {
                    console.log('info', info);
                    const {reporteBuro, identificacion, ruc, rolesPago, panillaIESS, ...resto} = info;
                    this.actualizarCredito = resto;
                    this.dataCreditShow = info;
                    for (const elementForm in this.actualizarCreditoForm.controls) {
                        if (info[elementForm]) {
                            this.actualizarCreditoForm.get(elementForm).setValidators(null);
                            this.actualizarCreditoForm.get(elementForm).setErrors(null);
                        }
                    }


                    this.actualizarCredito.id = id;
                },
                (error) => {
                    this.mensaje = 'Error al obtener el crédito';
                    this.abrirModal(this.mensajeModal);
                });
        }
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerSolicitudesCreditos();
        });
    }

    abrirModal(modal) {
        this.modalService.open(modal);
    }

    cerrarModal(name) {
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    transformarFecha(fecha) {
        const nuevaFecha = this.datePipe.transform(fecha, 'yyyy-MM-dd');
        return nuevaFecha;
    }

    viewDataUser(modal, user) {
        this.modalOpenSLC(modal);
        this.userViewData = user;
        this.ocupacionSolicitante = JSON.parse(user.ocupacionSolicitante);
        this.referenciasSolicitante = JSON.parse(user.referenciasSolicitante);
        this.ingresosSolicitante = JSON.parse(user.ingresosSolicitante);
        this.gastosSolicitante = JSON.parse(user.gastosSolicitante);
    }

    viewObservacionUser(modal, credito) {
        this.modalOpenSLC(modal);
        this.observacionCreditoForm = this._formBuilder.group({
            observacion: [credito.observacion, [Validators.required]],
            _id: [credito._id, Validators.required]
        });
        this.observacionSubmitted = false;
    }

    guardarObservacionCredito() {
        this.observacionSubmitted = true;
        if (this.observacionCreditoForm.invalid) {
            return;
        }
        this._solicitudCreditosService.actualizarSolictudesCreditosObservacion(this.observacionCreditoForm.value).subscribe(res => {
            console.log(res);
        });
    }

    modalOpenSLC(modalSLC) {
        this.modalService.open(modalSLC, {
                centered: true,
                size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
            }
        );
    }

    modernVerticalNext() {
        this.modernVerticalWizardStepper.next();
    }

    modernVerticalPrevious() {
        this.modernVerticalWizardStepper.previous();
    }

}
