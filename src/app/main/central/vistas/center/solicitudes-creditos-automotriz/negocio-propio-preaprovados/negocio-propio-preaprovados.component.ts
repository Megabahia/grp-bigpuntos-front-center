import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {SolicitudesCreditosService} from '../solicitudes-creditos.service';
import {CoreSidebarService} from '../../../../../../../@core/components/core-sidebar/core-sidebar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-negocio-propio-preaprovados',
    templateUrl: './negocio-propio-preaprovados.component.html',
    styleUrls: ['./negocio-propio-preaprovados.component.scss'],
    providers: [DatePipe],
})
export class NegocioPropioPreaprovadosComponent implements OnInit, AfterViewInit {

    @ViewChild(NgbPagination) paginator: NgbPagination;

    public page = 1;
    public page_size: any = 4;
    public maxSize;
    public collectionSize;
    private _unsubscribeAll: Subject<any>;

    // Variables
    public listaCreditos;
    public userViewData;
    private ocupacionSolicitante;
    public referenciasSolicitante;
    public ingresosSolicitante;
    public gastosSolicitante;
    public pantalla = 0;
    public checks = [
        {'label': 'Identificacion', 'valor': false},
        {'label': 'Foto Carnet', 'valor': false},
        {'label': 'Papeleta votacion', 'valor': false},
        {'label': 'Identificacion conyuge', 'valor': false},
        {'label': 'Papeleta votacion conyuge', 'valor': false},
        {'label': 'Planilla luz negocio', 'valor': false},
        {'label': 'Planilla luz domicilio', 'valor': false},
        {'label': 'Facturas', 'valor': false},
        {'label': 'Matricula vehiculo', 'valor': false},
        {'label': 'Impuesto predial', 'valor': false},
        {'label': 'Buro credito', 'valor': false},
        {'label': 'Calificacion buro', 'valor': false},
        {'label': 'Observación', 'valor': false},
    ];
    // Formulario
    public soltero = false;
    public actualizarCreditoForm: FormGroup;
    public submitted = false;
    public cargando = false;
    public actualizarCreditoFormData;
    private credito;
    public casaPropia = false;

    constructor(
        private _solicitudCreditosService: SolicitudesCreditosService,
        private modalService: NgbModal,
        private _coreSidebarService: CoreSidebarService,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe,
    ) {
    }

    ngOnInit(): void {
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
            tipoCredito: 'Credito Automotriz Negocio-PreAprobado',
            cargarOrigen: 'BIGPUNTOS'
        }).subscribe(info => {
            this.collectionSize = info.cont;
            this.listaCreditos = info.info;
        });
    }

    viewDataUser(modal, credito) {
        this.credito = credito;
        const user = credito.user;
        this.soltero = (user.estadoCivil === 'Solter@' || user.estadoCivil === 'Soltero' ||
            user.estadoCivil === 'Divorciad@' || user.estadoCivil === 'Divorciado');
        this.casaPropia = (user.tipoVivienda === 'Propia');
        console.log('casapropria', this.casaPropia);
        this.modalOpenSLC(modal);
        this.userViewData = user;
        this.ocupacionSolicitante = user.ocupacionSolicitante;
        this.referenciasSolicitante = user.referenciasSolicitante;
        this.ingresosSolicitante = user.ingresosSolicitante;
        this.gastosSolicitante = user.gastosSolicitante;
    }

    verDocumentos(credito) {
        this.credito = credito;
        this.submitted = false;
        this.actualizarCreditoFormData = new FormData();
        this.pantalla = 1;
        this.soltero = (credito.estadoCivil === 'Solter@' || credito.estadoCivil === 'Soltero' ||
            credito.user.estadoCivil === 'Solter@' || credito.user.estadoCivil === 'Divorciado' ||
            credito.estadoCivil === 'Divorciad@' || credito.estadoCivil === 'Divorciado');
        console.log(this.soltero, 'this.soltero');
        this.actualizarCreditoForm = this._formBuilder.group({
            id: [credito._id, [Validators.required]],
            identificacion: ['', credito.identificacion ? [] : [Validators.required]],
            ruc: ['', credito.identificacion ? [] : [Validators.required]],
            fotoCarnet: ['', credito.fotoCarnet ? [] : [Validators.required]],
            papeletaVotacion: ['', credito.papeletaVotacion ? [] : [Validators.required]],
            identificacionConyuge: ['', this.soltero ? [] : [Validators.required]],
            papeletaVotacionConyuge: ['', this.soltero ? [] : [Validators.required]],
            planillaLuzNegocio: ['', credito.planillaLuzNegocio ? [] : [Validators.required]],
            planillaLuzDomicilio: ['', credito.planillaLuzDomicilio ? [] : [Validators.required]],
            facturasVentas2meses: ['', [Validators.required]],
            facturasVentas2meses2: ['', [Validators.required]],
            facturasVentas2meses3: ['', [Validators.required]],
            facturasVentasCertificado: ['', []],
            matriculaVehiculo: [''],
            impuestoPredial: [''],
            buroCredito: ['', credito.buroCredito ? [] : [Validators.required]],
            calificacionBuro: [credito.calificacionBuro, [Validators.required,
                Validators.maxLength(4),
                Validators.minLength(3),
                Validators.pattern('^[0-9]*$')]],
            observacion: [credito.observacion, [Validators.required]],
            checkIdenficicacion: ['', [Validators.requiredTrue]],
            checkRuc: ['', [Validators.requiredTrue]],
            checkFotoCarnet: ['', [Validators.requiredTrue]],
            checkPapeletaVotacion: ['', [Validators.requiredTrue]],
            checkIdentificacionConyuge: ['', this.soltero ? [] : [Validators.requiredTrue]],
            checkPapeletaVotacionConyuge: ['', this.soltero ? [] : [Validators.requiredTrue]],
            checkPlanillaLuzNegocio: ['', [Validators.requiredTrue]],
            checkPlanillaLuzDomicilio: ['', [Validators.requiredTrue]],
            checkfacturasVentas2meses: ['', [Validators.requiredTrue]],
            checkfacturasVentas2meses2: ['', [Validators.requiredTrue]],
            checkfacturasVentas2meses3: ['', [Validators.requiredTrue]],
            checkfacturasVentasCertificado: ['', []],
            checkMatriculaVehiculo: [''],
            checkImpuestoPredial: [''],
            checkBuroCredito: ['', [Validators.requiredTrue]],
            checkCalificacionBuro: ['', [Validators.requiredTrue]],
            checkObservacion: ['', [Validators.requiredTrue]],
        });
        this.checks = (typeof credito.checks === 'object') ? credito.checks : JSON.parse(credito.checks);
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

    actualizarSolicitudCredito() {
        this.submitted = true;
        if (this.actualizarCreditoForm.invalid) {
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
            planillaLuzNegocio,
            facturas,
            matriculaVehiculo,
            impuestoPredial,
            buroCredito,
            calificacionBuro,
            observacion, ...resto
        } = this.actualizarCreditoForm.value;
        const creditoValores = Object.values(this.actualizarCreditoForm.value);
        const creditoLlaves = Object.keys(this.actualizarCreditoForm.value);
        const remover = ['buroCredito', 'evaluacionCrediticia', 'identificacion', 'ruc', 'papeletaVotacion', 'identificacionConyuge', 'mecanizadoIess',
            'papeletaVotacionConyuge', 'planillaLuzNegocio', 'planillaLuzDomicilio', 'facturas', 'facturasVentas2meses', 'facturasVentas2meses2', 'facturasVentas2meses3', 'facturasVentasCertificado',
            'matriculaVehiculo', 'impuestoPredial', 'fotoCarnet'];
        creditoLlaves.map((llaves, index) => {
            if (creditoValores[index] && !remover.find((item: any) => item === creditoLlaves[index])) {
                this.actualizarCreditoFormData.delete(llaves);
                this.actualizarCreditoFormData.append(llaves, creditoValores[index]);
            }
        });
        this.checks = [
            {'label': 'Identificacion', 'valor': resto.checkIdenficicacion},
            {'label': 'Foto Carnet', 'valor': resto.checkFotoCarnet},
            {'label': 'Papeleta votacion', 'valor': resto.checkPapeletaVotacion},
            {'label': 'Identificacion conyuge', 'valor': resto.checkIdentificacionConyuge},
            {'label': 'Papeleta votacion conyuge', 'valor': resto.checkPapeletaVotacionConyuge},
            {'label': 'Planilla luz negocio', 'valor': resto.checkPlanillaLuzNegocio},
            {'label': 'Planilla luz domicilio', 'valor': resto.checkPlanillaLuzDomicilio},
            {'label': 'Facturas', 'valor': resto.facturasVentas2meses},
            {
                'label': 'Certificado de la Asociación (este campo aplica si usted es transportista: Bus o Taxi)',
                'valor': resto.checkfacturasVentasCertificado
            },
            {'label': 'Matricula vehiculo', 'valor': resto.checkMatriculaVehiculo},
            {'label': 'Impuesto predial', 'valor': resto.checkImpuestoPredial},
            {'label': 'Buro credito', 'valor': resto.checkBuroCredito},
            {'label': 'Calificacion buro', 'valor': resto.checkCalificacionBuro},
            {'label': 'Observación', 'valor': resto.checkObservacion},
            {'label': 'Autorización y validación de información', 'valor': true},
        ];
        if (this.soltero) {
            this.checks.splice(3, 2);
        }
        this.cargando = true;
        this.actualizarCreditoFormData.delete('estado');
        this.actualizarCreditoFormData.append('estado', 'Enviado');
        this.actualizarCreditoFormData.delete('checks');
        this.actualizarCreditoFormData.append('checks', JSON.stringify(this.checks));
        this._solicitudCreditosService.actualizarSolictudesCreditos(this.actualizarCreditoFormData).subscribe((info) => {
                this.cargando = false;
                // this.mensaje = 'Crédito actualizado con éxito';
                // this.cerrarModal('actualizar-credito');
                this.pantalla = 0;
                this.obtenerSolicitudesCreditos();
                // this.borrarDocumentoFirebase(this.actualizarCreditoFormData.get('id'));
            },
            (error) => {
                this.cargando = false;
                // this.mensaje = 'Error al actualizar el crédito';
                // this.abrirModal(this.mensajeModal);
            });
    }

    consumirAWS() {
        this._solicitudCreditosService.actualizarAWS().subscribe((info) => {
            console.log(info);
            this.obtenerSolicitudesCreditos();
        });
    }
}
