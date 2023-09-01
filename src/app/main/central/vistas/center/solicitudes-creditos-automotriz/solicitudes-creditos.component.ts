import {Component, OnInit, ViewChild} from '@angular/core';
import {SolicitudesCreditosService} from './solicitudes-creditos.service';
import {NgbPagination, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActualizarCredito} from '../../../models/creditos';
import {DatePipe} from '@angular/common';
import Stepper from 'bs-stepper';
import {element} from 'protractor';

@Component({
    selector: 'app-solicitudes-creditos',
    templateUrl: './solicitudes-creditos.component.html',
    styleUrls: ['./solicitudes-creditos.component.scss'],
    providers: [DatePipe]
})
export class SolicitudesCreditosComponent implements OnInit {

    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('mensajeModal') mensajeModal;
    @ViewChild('checksCreditoMdl') checksCreditoMdl;

    // public
    public selectMulti = [{name: 'English'}, {name: 'French'}, {name: 'Spanish'}];
    public selectMultiSelected;

    public tipoCredito = true;
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
    public observacion;
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

    public creditoCheckForm: FormGroup;
    public checksSubmitted = false;
    public detalleCredito = '';

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

    get fcreditoCheckForm() {
        return this.creditoCheckForm.controls;
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
            observacion: ['', [Validators.required]],
        });

        this.creditoCheckForm = this._formBuilder.group({
            id: ['', [Validators.required]],
            checkIdentificacion: ['', [Validators.required]],
            checkPapeletaVotacion: ['', [Validators.required]],
            checkIdentificacionConyuge: ['', [Validators.required]],
            checkPapeletaVotacionConyuge: ['', [Validators.required]],
            checkPlanillaLuzNegocio: ['', [Validators.required]],
            checkPlanillaLuzDomicilio: ['', [Validators.required]],
            checkFacturas: ['', [Validators.required]],
            checkMatriculaVehiculo: [''],
            checkImpuestoPredial: [''],
            checkBuroCredito: ['', [Validators.required]],
            checkEvaluacionCrediticia: ['', [Validators.required]],
            checkCalificacionBuro: ['', [Validators.required]],
            checkBuroValido: ['', [Validators.required]],
            checkObservacion: ['', [Validators.required]],
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
        this.tipoCredito = !this.tipoCredito;
        this._solicitudCreditosService.obtenerSolicitudesCreditos({
            page_size: this.page_size,
            page: this.page - 1,
            tipoCredito: this.tipoCredito ? 'Empleado' : 'Autonomo',
        }).subscribe(info => {
            this.collectionSize = info.cont;
            this.listaCreditos = info.info;
        });
    }

    actualizarSolicitudCredito() {
        this.submitted = true;
        if (this.actualizarCreditoForm.invalid) {
            return;
        }
        this.actualizarCredito = {...this.actualizarCredito, ...this.actualizarCreditoForm.value};
        const creditoValores = Object.values(this.actualizarCredito);
        const creditoLlaves = Object.keys(this.actualizarCredito);
        const remover = ['buroCredito', 'evaluacionCrediticia', 'identificacion', 'papeletaVotacion', 'identificacionConyuge',
            'papeletaVotacionConyuge', 'planillaLuzNegocio', 'planillaLuzDomicilio', 'facturas', 'matriculaVehiculo', 'impuestoPredial'];
        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index] && !remover.find((item: any) => item === creditoLlaves[index])) {
                this.actualizarCreditoFormData.delete(llaves);
                this.actualizarCreditoFormData.append(llaves, creditoValores[index]);
            }
        });
        this.cargando = true;
        this.actualizarCreditoFormData.delete('estado');
        this.actualizarCreditoFormData.append('estado', 'Datos completos');
        this._solicitudCreditosService.actualizarSolictudesCreditos(this.actualizarCreditoFormData).subscribe((info) => {
                this.cargando = false;
                this.mensaje = 'Crédito actualizado con éxito';
                this.cerrarModal('actualizar-credito');
                this.obtenerSolicitudesCreditos();
                this.borrarDocumentoFirebase(this.actualizarCreditoFormData.get('id'));
            },
            (error) => {
                this.cargando = false;
                this.mensaje = 'Error al actualizar el crédito';
                this.abrirModal(this.mensajeModal);
            });
    }

    guardarChecksCredito() {
        this.checksSubmitted = true;
        if (this.creditoCheckForm.invalid) {
            return;
        }
        this._solicitudCreditosService.actualizarChecksCreditos(this.creditoCheckForm.value).subscribe((info) => {
            this.cerrarModal(this.checksCreditoMdl);
            },
            (error) => {
                this.cargando = false;
                this.mensaje = 'Error al actualizar el crédito';
                this.abrirModal(this.mensajeModal);
            });
    }

    checks(modal, creditoId?) {
        this.checksSubmitted = false;
        this.creditoCheckForm.patchValue({id: creditoId});
        this.modalOpenSLC(modal);
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
                    const {reporteBuro, identificacion, ruc, rolesPago, panillaIESS, ...resto} = info;
                    this.dataCreditShow = info;
                    for (const elementForm in this.actualizarCreditoForm.controls) {
                        if (info[elementForm]) {
                            delete this.actualizarCreditoForm.controls[elementForm];
                            delete this.actualizarCreditoForm.value[elementForm];
                            // this.actualizarCreditoForm.get(elementForm).setValidators(null);
                            // this.actualizarCreditoForm.get(elementForm).setErrors(null);
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

    borrarDocumentoFirebase(id) {
        let creditosFirebase = [];
        this._solicitudCreditosService.getCreditosFirebase().subscribe((res) => {
            creditosFirebase = res;
            creditosFirebase.map(item => {
                if (item.payload._delegate.doc._document.data.value.mapValue.fields._id.stringValue === id) {
                    this._solicitudCreditosService.deleteDocumentFirebase(item.payload.doc.id);
                }
            });
        });
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerSolicitudesCreditos();
        });
    }

    abrirModalDetalleCredito(modal, credito) {
        this.detalleCredito = `Monto del credito ${credito.monto}, plazo del credito ${credito.plazo}`;
        this.modalOpenSLC(modal);
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
            this.modalService.dismissAll('observacionCreditoMdl');
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
