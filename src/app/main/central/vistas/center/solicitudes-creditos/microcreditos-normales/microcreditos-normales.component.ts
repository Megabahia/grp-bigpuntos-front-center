import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Subject} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudesCreditosService} from '../solicitudes-creditos.service';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';

@Component({
    selector: 'app-microcreditos-normales',
    templateUrl: './microcreditos-normales.component.html',
    styleUrls: ['./microcreditos-normales.component.scss'],
    providers: [DatePipe],
})
export class MicrocreditosNormalesComponent implements OnInit, AfterViewInit {

    @ViewChild(NgbPagination) paginator: NgbPagination;
    public page = 1;
    public page_size: any = 4;
    public maxSize;
    public empresa;
    public collectionSize;
    public formSolicitud: FormGroup;
    public formConyuge: FormGroup;
    public casado = false;
    private _unsubscribeAll: Subject<any>;
    // Variables
    public listaCreditos;
    public userViewData;
    private ocupacionSolicitante;
    public referenciasSolicitante;
    public ingresosSolicitante;
    public gastosSolicitante;
    public pantalla = 0;
    public credito;
    public checks = [
        {'label': 'identificacion', 'valor': false},
        {'label': 'Foto Carnet', 'valor': false},
        {'label': 'Ruc', 'valor': false},
        {'label': 'Papeleta votación Representante Legal ', 'valor': false},
        {'label': 'Identificacion conyuge', 'valor': false},
        {'label': 'Papeleta votacion conyuge', 'valor': false},
        {'label': 'Planilla luz Negocio', 'valor': false},
        {'label': 'Planilla luz Domicilio', 'valor': false},
        {'label': '3 Copias de Facturas de Ventas del negocio de los últimos 2 meses', 'valor': false},
        {'label': '3 facturas de Compra del negocio de los últimos 2 meses', 'valor': false},
        {'label': 'Facturas pendiente de pago', 'valor': false},
        // {'label': 'Justificación otros inresos mensuales ', 'valor': false},
        {'label': 'Matricula vehiculo', 'valor': false},
        {'label': 'Copia de pago impuesto predial o copia de escrituras', 'valor': false},
        // {'label': 'Registro de Referencias Familiares y Comerciales.\n', 'valor': false},
        {'label': 'Buro credito', 'valor': false},
        {'label': 'Calificacion buro', 'valor': false},
    ];
    public checksSolteroInferior: any = [];
    public checksSolteroSuperior: any = [];
    public checksCasadoInferior: any = [];
    public checksCasadoSuperior: any = [];
    public montoLimite: any = 8000;
    public remover = ['buroCredito', 'evaluacionCrediticia', 'identificacion', 'ruc', 'papeletaVotacion',
        'identificacionConyuge', 'mecanizadoIess', 'papeletaVotacionConyuge', 'planillaLuzNegocio',
        'planillaLuzDomicilio', 'facturas', 'matriculaVehiculo', 'impuestoPredial', 'fotoCarnet',
        'solicitudCredito', 'buroCreditoIfis', 'facturasVentas2meses', 'facturasVentas2meses2', 'facturasVentas2meses3', 'facturasVentasCertificado', 'facturasPendiente'];
    // Formulario
    public soltero = false;
    public actualizarCreditoForm: FormGroup;
    public submitted = false;
    public cargando = false;
    public actualizarCreditoFormData;
    public ingresoNegocioSuperior = false;

    constructor(
        private _solicitudCreditosService: SolicitudesCreditosService,
        private modalService: NgbModal,
        private _coreSidebarService: CoreSidebarService,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe,
    ) {
        this._solicitudCreditosService.obtenerRequisitosCreditoPreAprobado({tipo: 'MICROCREDITO_CASADO_UNION_LIBRE'}).subscribe((item) => {
            item.map((fila) => {
                if (fila.valor === 'INFERIOR') {
                    this.checksCasadoInferior = fila.config.map((index) => {
                        return {'label': index, 'valor': false};
                    });
                }
                if (fila.valor === 'SUPERIOR') {
                    this.checksCasadoSuperior = fila.config.map((index) => {
                        return {'label': index, 'valor': false};
                    });
                }
            });
        });
        this._solicitudCreditosService.obtenerRequisitosCreditoPreAprobado({tipo: 'MICROCREDITO_SOLTERO_DIVORCIADO'}).subscribe((item) => {
            item.map((fila) => {
                if (fila.valor === 'INFERIOR') {
                    this.checksSolteroInferior = fila.config.map((index) => {
                        return {'label': index, 'valor': false};
                    });
                }
                if (fila.valor === 'SUPERIOR') {
                    this.checksSolteroSuperior = fila.config.map((index) => {
                        return {'label': index, 'valor': false};
                    });
                }
            });
        });
        this._solicitudCreditosService.obtenerParametroNombreTipo('MONTO', 'REQUISITOS_MICROCREDIOS').subscribe((item) => {
            this.montoLimite = item.valor;
        });
    }

    ngOnInit(): void {
        this.declareFormularios();
    }

    declareFormularios() {
        this.formSolicitud = this._formBuilder.group(
            {
                reprsentante: ['', [Validators.required]], //
                rucEmpresa: ['', [Validators.required]], //
                comercial: ['', [Validators.required]], //
                actividadEconomica: ['', [Validators.required]], //
                direccionDomiciolRepresentante: ['', [Validators.required]], //
                direccionEmpresa: ['', [Validators.required]], //
                referenciaDomicilio: ['', [Validators.required]], //
                esatdo_civil: ['', [Validators.required]], //
                refenciaNegocio: ['', [Validators.required]], //
                correo: ['', [Validators.required]], //
                telefono: ['', [Validators.required]], //
                celular: ['', [Validators.required]], //
                conyuge: this._formBuilder.group({
                    nombreConyuge: [''], //
                    telefonoConyuge: [''], //
                    correoConyuge: [''],
                }),
                familiares: this._formBuilder.array([]),
                inresosMensualesVentas: ['', [Validators.required]], //
                sueldoConyuge: [''], //
                otrosIngresos: [''], //
                gastosMensuales: ['', [Validators.required]], //
                gastosFamilaires: ['', [Validators.required]], //
                especificaIngresos: [''], //
            });
    }

    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerSolicitudesCreditos();
    }

    get controlsFrom() {
        return this.actualizarCreditoForm.controls;
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerSolicitudesCreditos();
        });
    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    modalOpenSLC(modalSLC) {
        this.modalService.open(modalSLC, {
                centered: true,
                size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
            }
        );
    }

    obtenerSolicitudesCreditos() {
        this._solicitudCreditosService.obtenerSolicitudesCreditos({
            page_size: this.page_size,
            page: this.page - 1,
            tipoCredito: 'Pymes-Normales',
            cargarOrigen: 'BIGPUNTOS'
        }).subscribe(info => {
            console.log('info', info);
            this.collectionSize = info.cont;
            this.listaCreditos = info.info;
        });
    }

    declareFormConyuge() {
        this.formConyuge = this._formBuilder.group({
            nombreConyuge: [''], //
            telefonoConyuge: [''], //
            correoConyuge: [''],
        });
    }

    get controlsContuge() {
        return this.formSolicitud.controls['conyuge'] as FormGroup;
    }

    viewDataUser(modal, empresa) {
        const infoEmpresa = empresa;
        this.empresa = infoEmpresa;
        console.log('infoEmpresa', infoEmpresa);
        this.declareFormularios();
        this.declareFormConyuge();
        this.modalOpenSLC(modal);
        this.casado = infoEmpresa.esatdo_civil === 'Casado' ? true : false;
        infoEmpresa?.familiares.forEach(item => this.agregarFamiliar());
        this.formSolicitud.patchValue({...infoEmpresa});
        // this.formConyuge.patchValue({...infoEmpresa.conyuge});
        // this.referenciasSolicitante = JSON.parse(empresa.referenciasSolicitante);
        // this.ingresosSolicitante = JSON.parse(empresa.ingresosSolicitante);
        // this.gastosSolicitante = JSON.parse(user.gastosSolicitante);
    }

    get familiares() {
        return this.formSolicitud.controls['familiares'] as FormArray;
    }

    agregarFamiliar() {
        const cuentaForm = this._formBuilder.group({
            nombreFamiliar: [''], //
            apellidoFamiliar: [''], //
            telefonoFamiliar: [''], //
            direccionFamiliar: [''],
            tipoPariente: [''],
        });
        this.familiares.push(cuentaForm);
    }

    verDocumentos(credito) {
        this.credito = credito;
        this.submitted = false;
        this.actualizarCreditoFormData = new FormData();
        this.pantalla = 1;
        this.soltero = (credito.estadoCivil === 'Solter@' || credito.estadoCivil === 'Soltero' || credito.estadoCivil === 'Divorciado');
        this.ingresoNegocioSuperior = (credito.monto >= this.montoLimite);
        this.actualizarCreditoForm = this._formBuilder.group(
            {
                id: [credito._id, [Validators.required]],
                identificacion: ['', [Validators.required]],
                ruc: ['', [Validators.required]],
                fotoCarnet: ['', [Validators.required]],
                papeletaVotacion: ['', [Validators.required]],
                identificacionConyuge: ['', this.soltero ? [] : [Validators.required]],
                papeletaVotacionConyuge: ['', this.soltero ? [] : [Validators.required]],
                planillaLuzDomicilio: ['', [Validators.required]],
                planillaLuzNegocio: ['', [Validators.required]],
                facturasVentas2meses: ['', [Validators.required]],
                facturasVentas2meses2: ['', [Validators.required]],
                facturasVentas2meses3: ['', [Validators.required]],
                facturasVentasCertificado: ['', [Validators.required]],
                facturasPendiente: ['', [Validators.required]],
                matriculaVehiculo: [''],
                impuestoPredial: [''],
                buroCredito: ['', [Validators.required]],
                calificacionBuro: [credito.calificacionBuro, [Validators.required,
                    Validators.maxLength(4),
                    Validators.minLength(3),
                    Validators.pattern('^[0-9]*$')]],
                observacion: [this.credito.observacion ? this.credito.observacion : '', [Validators.required]],
                estado: [''],
                // checks
                checkIdentificacion: ['', [Validators.requiredTrue]],
                checkRuc: ['', [Validators.requiredTrue]],
                checkFotoCarnet: ['', [Validators.requiredTrue]],
                checkPapeletaVotacion: ['', [Validators.requiredTrue]],
                checkIdentificacionConyuge: ['', this.soltero ? [] : [Validators.requiredTrue]],
                checkPapeletaVotacionConyuge: ['', this.soltero ? [] : [Validators.requiredTrue]],
                checkPlanillaLuzDomicilio: ['', [Validators.requiredTrue]],
                checkPlanillaLuzNegocio: ['', [Validators.requiredTrue]],
                checkfacturasVentas2meses: ['', [Validators.requiredTrue]],
                checkfacturasVentas2meses2: ['', [Validators.requiredTrue]],
                checkfacturasVentas2meses3: ['', [Validators.requiredTrue]],
                checkfacturasVentasCertificado: ['', [Validators.requiredTrue]],
                checkFacturasPendiente: ['', [Validators.requiredTrue]],
                checkMatriculaVehiculo: [''],
                checkImpuestoPredial: [''],
                checkBuroCredito: ['', [Validators.requiredTrue]],
                checkCalificacionBuro: ['', [Validators.requiredTrue]],
                checkObservacion: ['', [Validators.requiredTrue]],
            });
        console.log(credito);
        if (typeof credito.checks === 'object') {
            if (this.soltero) {
                this.checks = this.ingresoNegocioSuperior ? this.checksSolteroSuperior : this.checksSolteroInferior;
            } else {
                this.checks = this.ingresoNegocioSuperior ? this.checksCasadoSuperior : this.checksCasadoInferior;
            }
        } else {
            this.checks = JSON.parse(credito.checks);
        }
    }

    cambiarEstado($event) {
        this.pantalla = $event;
    }

    cancelar() {
        this.pantalla = 0;
    }

    subirDoc(event, key) {
        if (event.target.files && event.target.files[0]) {
            const doc = event.target.files[0];
            this.actualizarCreditoFormData.delete(`${key}`);
            this.actualizarCreditoFormData.append(`${key}`, doc, Date.now() + '_' + doc.name);
        }
    }

    actualizarSolicitudCredito(estado?: string) {
        this.submitted = true;
        console.log('Credito', this.actualizarCreditoForm);
        if (this.actualizarCreditoForm.invalid) {
            console.log(this.actualizarCreditoForm);
            return;
        }
        const {
            id,
            identificacion,
            ruc,
            fotoCarnet,
            papeletaVotacion,
            identificacionConyuge,
            papeletaVotacionConyuge,
            planillaLuzDomicilio,
            mecanizadoIess,
            matriculaVehiculo,
            impuestoPredial,
            buroCredito,
            calificacionBuro,
            observacion, ...resto
        } = this.actualizarCreditoForm.value;
        const creditoValores = Object.values(this.actualizarCreditoForm.value);
        const creditoLlaves = Object.keys(this.actualizarCreditoForm.value);

        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index] && !this.remover.find((item: any) => item === creditoLlaves[index])) {
                this.actualizarCreditoFormData.delete(llaves);
                this.actualizarCreditoFormData.append(llaves, creditoValores[index]);
            }
        });
        this.checks.map((item) => {
            item.valor = true;
        });
        if (this.soltero) {
            this.checks.splice(3, 2);
        }
        this.cargando = true;
        this.actualizarCreditoFormData.delete('estado');
        this.actualizarCreditoFormData.append('estado', estado);
        this.actualizarCreditoFormData.delete('checks');
        this.actualizarCreditoFormData.append('checks', JSON.stringify(this.checks));
        this._solicitudCreditosService.actualizarSolictudesCreditos(this.actualizarCreditoFormData).subscribe((info) => {
                this.cargando = false;
                this.pantalla = 0;
                this.obtenerSolicitudesCreditos();
                this._solicitudCreditosService.deleteDocumentFirebase(this.actualizarCreditoFormData.get('id'));
            },
            (error) => {
                this.cargando = false;
            });
    }

    actualizarSolicitudCreditoNegado(estado) {
        const creditoValores = Object.values(this.actualizarCreditoForm.value);
        const creditoLlaves = Object.keys(this.actualizarCreditoForm.value);

        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index] && !this.remover.find((item: any) => item === creditoLlaves[index])) {
                this.actualizarCreditoFormData.delete(llaves);
                this.actualizarCreditoFormData.append(llaves, creditoValores[index]);
            }
        });
        this.cargando = true;
        this.actualizarCreditoFormData.delete('estado');
        this.actualizarCreditoFormData.append('estado', estado);
        this._solicitudCreditosService.actualizarSolictudesCreditos(this.actualizarCreditoFormData).subscribe((info) => {
                this.cargando = false;
                this.obtenerSolicitudesCreditos();
                this._solicitudCreditosService.deleteDocumentFirebase(this.actualizarCreditoFormData.get('id'));
                if (estado === 'Negado') {
                    this.pantalla = 0;
                } else {
                    this.pantalla = 3;
                }
            },
            (error) => {
                this.cargando = false;
                if (estado === 'Negado') {
                    this.pantalla = 0;
                }
            });
    }

    consumirAWS() {
        this._solicitudCreditosService.actualizarAWS().subscribe((info) => {
            console.log(info);
            this.obtenerSolicitudesCreditos();
        });
    }
}
