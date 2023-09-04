import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudesCreditosService} from '../../solicitudes-creditos.service';
import {CoreSidebarService} from '../../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {ValidacionesPropias} from '../../../../../../../../utils/customer.validators';

@Component({
    selector: 'app-microcreditos-pre-aprovados',
    templateUrl: './ifis-microcreditos-pre-aprovados.component.html',
    styleUrls: ['./ifis-microcreditos-pre-aprovados.component.scss'],
    providers: [DatePipe],

})
export class IfisMicrocreditosPreAprovadosComponent implements OnInit, AfterViewInit {

    @ViewChild(NgbPagination) paginator: NgbPagination;

    public page = 1;
    public page_size: any = 4;
    public maxSize;
    public collectionSize;
    private _unsubscribeAll: Subject<any>;
    public formSolicitud: FormGroup;
    public formConyuge: FormGroup;
    public casado = false;
    public empresa;

    // Variables
    public listaCreditos;
    public userViewData;
    private ocupacionSolicitante;
    public referenciasSolicitante;
    public ingresosSolicitante;
    public gastosSolicitante;
    public pantalla = 0;
    public credito;
    public checks = [];
    public checksSolteroInferior: any = [];
    public checksSolteroSuperior: any = [];
    public checksCasadoInferior: any = [];
    public checksCasadoSuperior: any = [];
    public montoLimite: any = 8000;
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
            tipoCredito: 'Pymes-PreAprobado',
            cargarOrigen: 'IFIS'
        }).subscribe(info => {
            this.collectionSize = info.cont;
            this.listaCreditos = info.info;
        });
    }

    declareFormularios() {
        this.formSolicitud = this._formBuilder.group(
            {
                reprsentante: ['', [Validators.required]], //
                rucEmpresa: ['', [Validators.required]], //
                comercial: ['', [Validators.required]], //
                actividadEconomica: ['', [Validators.required]], //
                direccionDomiciolRepresentante: ['', [Validators.required]], //
                callePrincipal: ['', [Validators.required]],
                calleSecundaria: ['', [Validators.required]],
                refenciaNegocio: ['', [Validators.required]],
                esatdo_civil: ['', [Validators.required]], //
                correo: ['', [Validators.required]], //
                telefono: ['', [Validators.required]], //
                celular: ['', [Validators.required]], //
                conyuge: this._formBuilder.group({
                    nombreConyuge: [''], //
                    telefonoConyuge: [''], //
                    cedulaConyuge: [''],
                }),
                familiares: this._formBuilder.array([]),
                comerciales: this._formBuilder.array([
                    this._formBuilder.group({
                        nombresDuenoComercial: [''],
                        negocioDuenoComercial: [''],
                        telefonoDuenoComercial: [''],
                        direccionDuenoComercial: [''],
                    }),
                    this._formBuilder.group({
                        nombresDuenoComercial: [''],
                        negocioDuenoComercial: [''],
                        telefonoDuenoComercial: [''],
                        direccionDuenoComercial: [''],
                    }),
                    this._formBuilder.group({
                        nombresDuenoComercial: [''],
                        negocioDuenoComercial: [''],
                        telefonoDuenoComercial: [''],
                        direccionDuenoComercial: [''],
                    }),
                ]),
                inresosMensualesVentas: ['', [Validators.required]], //
                sueldoConyuge: [''], //
                otrosIngresos: [''], //
                gastosMensuales: ['', [Validators.required]], //
                gastosFamilaires: ['', [Validators.required]], //
                especificaIngresos: [''], //
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

    isObjectEmpty(obj) {
        return !!Object.keys(obj).length;
    }

    viewDataUser(modal, empresa) {
        console.log('this.empresa', empresa);
        const infoEmpresa = empresa;
        this.empresa = infoEmpresa;
        console.log('infoEmpresa', infoEmpresa);
        this.declareFormularios();
        this.declareFormConyuge();
        this.modalOpenSLC(modal);
        this.casado = infoEmpresa.esatdo_civil ? true : false;
        infoEmpresa?.familiares.forEach(item => this.agregarFamiliar());
        this.formSolicitud.patchValue({...infoEmpresa});
    }

    verDocumentos(credito) {
        this.credito = credito;
        this.submitted = false;
        this.actualizarCreditoFormData = new FormData();
        this.pantalla = 1;
        this.soltero = (credito.estadoCivil === 'Solter@' || credito.estadoCivil === 'Soltero' ||
            credito.user.estadoCivil === 'Solter@' || credito.user.estadoCivil === 'Divorciado' ||
            credito.estadoCivil === 'Divorciad@' || credito.estadoCivil === 'Divorciado');
        this.ingresoNegocioSuperior = (credito.monto >= this.montoLimite);
        this.actualizarCreditoForm = this._formBuilder.group({
            id: [credito._id, [Validators.required]],
            identificacion: ['', this.credito?.identificacion ? [] : [Validators.required, ValidacionesPropias.pdfValido]],
            ruc: ['', this.credito?.ruc ? [] : [Validators.required, ValidacionesPropias.pdfValido]],
            fotoCarnet: ['', this.credito?.fotoCarnet ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            papeletaVotacion: ['', this.credito?.papeletaVotacion ? [] : [Validators.required, ValidacionesPropias.pdfValido]], //
            identificacionConyuge: ['', this.credito?.papeletaVotacion ? [] : (!this.soltero ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            papeletaVotacionConyuge: ['', this.credito?.papeletaVotacionConyuge ? [] : (!this.soltero ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            planillaLuzDomicilio: ['', this.credito?.planillaLuzDomicilio ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            planillaLuzNegocio: ['', this.credito?.planillaLuzNegocio ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            facturasVentas2meses: ['', this.credito?.facturasVentas2meses ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            facturasVentas2meses2: ['', this.credito?.facturasVentas2meses2 ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            facturasCompras2meses: ['', this.credito?.facturasCompras2meses ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            facturasCompras2meses2: ['', this.credito?.facturasCompras2meses2 ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            facturasPendiente: ['', this.credito?.facturasPendiente ? [] : (!this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],

            nombramientoRepresentante: ['', this.credito?.nombramientoRepresentante ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            certificadoSuperintendencia:  ['', this.credito?.certificadoSuperintendencia ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            certificadoPatronales:  ['', this.credito?.certificadoPatronales ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            nominaSocios:  ['', this.credito?.nominaSocios ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            actaJuntaGeneral:  ['', this.credito?.actaJuntaGeneral ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            certificadoBancario:  ['', this.credito?.certificadoBancario ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            referenciasComerciales:  ['', this.credito?.referenciasComerciales ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            balancePerdidasGanancias:  ['', this.credito?.balancePerdidasGanancias ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            balanceResultados:  ['', this.credito?.balanceResultados ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            declaracionIva:  ['', this.credito?.declaracionIva ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],
            estadoCuentaTarjeta:  ['', this.credito?.estadoCuentaTarjeta ? [] : (this.ingresoNegocioSuperior ? [Validators.required, ValidacionesPropias.pdfValido] : [])],

            matriculaVehiculo: ['', this.credito?.matriculaVehiculo ? [] : (!this.ingresoNegocioSuperior ? [ValidacionesPropias.pdfValido] : [])],
            impuestoPredial: ['', this.credito?.impuestoPredial ? [] : (!this.ingresoNegocioSuperior ? [ValidacionesPropias.pdfValido] : [])],
            buroCredito: ['', this.credito?.buroCredito ? [] : [Validators.required, ValidacionesPropias.pdfValido]],
            calificacionBuro: ['', []],
            observacion: ['', [Validators.required]], //
            // checks
            checkIdentificacion: ['', [Validators.requiredTrue]], //
            checkRuc: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkFotoCarnet: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkPapeletaVotacion: ['', [Validators.requiredTrue]], //
            checkIdentificacionConyuge: ['', !this.soltero ? [Validators.requiredTrue] : []],
            checkPapeletaVotacionConyuge: ['', !this.soltero ? [Validators.requiredTrue] : []],
            checkPlanillaLuzDomicilio: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkPlanillaLuzNegocio: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkFacturasVentas2meses: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkFacturasVentas2meses2: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkFacturasCompras2meses: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkFacturasCompras2meses2: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkFacturasPendiente: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],

            checkNombramientoRepresentante: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkCertificadoSuperintendencia: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkCertificadoPatronales: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkNominaSocios: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkActaJuntaGeneral: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkCertificadoBancario: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkReferenciasComerciales: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkBalancePerdidasGanancias: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkBalanceResultados: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkDeclaracionIva: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkEstadoCuentaTarjeta: ['', this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],

            checkMatriculaVehiculo: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkImpuestoPredial: ['', !this.ingresoNegocioSuperior ? [Validators.requiredTrue] : []],
            checkBuroCredito: ['', [Validators.requiredTrue]],
            checkCalificacionBuro: ['', [Validators.requiredTrue]],
            checkObservacion: ['', [Validators.requiredTrue]],
        });
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
        if (this.actualizarCreditoForm.invalid) {
            console.log('form', this.actualizarCreditoForm);
            return;
        }
        const {
            id,
            identificacion,
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
        const remover = ['buroCredito', 'evaluacionCrediticia', 'identificacion', 'papeletaVotacion', 'identificacionConyuge', 'mecanizadoIess',
            'papeletaVotacionConyuge', 'planillaLuzNegocio', 'planillaLuzDomicilio', 'facturas', 'matriculaVehiculo', 'impuestoPredial', 'fotoCarnet',
            'ruc', 'solicitudCredito', 'buroCreditoIfis', 'facturasVentas2meses', 'facturasVentas2meses2', 'facturasVentasCertificado', 'facturasPendiente',
            'facturasCompras2meses', 'facturasCompras2meses2', 'nombramientoRepresentante', 'certificadoSuperintendencia',
            'certificadoPatronales', 'nominaSocios', 'actaJuntaGeneral', 'certificadoBancario', 'referenciasComerciales',
            'balancePerdidasGanancias', 'balanceResultados', 'declaracionIva', 'estadoCuentaTarjeta'
        ];
        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index] && !remover.find((item: any) => item === creditoLlaves[index])) {
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
        const remover = ['buroCredito', 'evaluacionCrediticia', 'identificacion', 'papeletaVotacion', 'identificacionConyuge', 'mecanizadoIess',
            'papeletaVotacionConyuge', 'planillaLuzNegocio', 'planillaLuzDomicilio', 'facturas', 'matriculaVehiculo', 'impuestoPredial', 'fotoCarnet',
            'solicitudCredito', 'buroCreditoIfis', 'facturasVentas2meses', 'facturasVentasCertificado', 'facturasPendiente'];
        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index] && !remover.find((item: any) => item === creditoLlaves[index])) {
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

    agregarFamiliar() {
        const cuentaForm = this._formBuilder.group({
            tipoPariente: [''],
            nombreFamiliar: [''],
            apellidoFamiliar: [''],
            telefonoFamiliar: [''],
            pais: [''],
            provincia: [''],
            ciudad: [''],
            direccionFamiliar: [''],
        });
        this.familiares.push(cuentaForm);
    }

    get familiares() {
        return this.formSolicitud.controls['familiares'] as FormArray;
    }

    consumirAWS() {
        this._solicitudCreditosService.actualizarAWS().subscribe((info) => {
            console.log(info);
            this.obtenerSolicitudesCreditos();
        });
    }
}
