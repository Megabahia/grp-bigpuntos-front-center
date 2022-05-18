import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {ExportService} from '../../../../../../services/export/export.service';
import {PagosService} from '../pagos.service';
import {ProductosPremiosService} from '../../productos-premios/productos-premios.service';

@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss'],
    providers: [DatePipe]
})
export class ListarComponent implements OnInit {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('mensajeModal') mensajeModal;
    // Paginacion
    public page = 1;
    public pageSize: any = 10;
    public maxSize;
    public collectionSize;
    // Exportacion
    public infoExportar;
    // Variables
    private _unsubscribeAll: Subject<any>;
    public loading = false;
    public pagos;
    public mensaje = '';
    public tipoEmpresaOpciones;
    public tipos;

    constructor(
        private monedasService: PagosService,
        private productosService: ProductosPremiosService,
        private _modalService: NgbModal,
        private datePipe: DatePipe,
        private changeDetector: ChangeDetectorRef,
        private exportFile: ExportService,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.changeDetector.detectChanges();
        this.obtenerListaEmpresasComerciales();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerListaPagos();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerListaPagos();
        });
    }

    abrirModal(modal) {
        this._modalService.open(modal);
    }

    cerrarModal() {
        this._modalService.dismissAll();
    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    obtenerListaPagos() {
        this.monedasService.obtenerListaPagos(
            {
                page: this.page - 1,
                page_size: this.pageSize,
                empresa_id: this.tipoEmpresaOpciones
            }
        ).subscribe((info) => {
            this.pagos = info.info;
            this.collectionSize = info.cont;
        });
    }

    comprobarEstado(estado: boolean) {
        return estado ? 'Si' : 'No';
    }

    obtenerListaEmpresasComerciales() {
        this.productosService.obtenerListaEmpresasComerciales({}).subscribe((info) => {
            console.log(info);
            this.tipos = info.info;
            this.collectionSize = info.cont;
        });
    }

    exportarExcel() {
        this.infoExportar = [];
        const headers = ['FECHA DE COBRO', 'NUMERO DE FACTURA', 'MONTO DE FACTURA', 'MONTO EN BP', 'NOMBRE DEL CLIENTE',
            'IDENTIFICACIÓN DEL CLIENTE', 'CORREO DEL CLIENTE'];
        this.pagos.forEach((row: any) => {

            const values = [];
            values.push(this.transformarFecha(row['created_at']));
            values.push(row['_id']);
            values.push(row['montoTotalFactura']);
            values.push(row['montoSupermonedas']);
            values.push(row['nombres'] + ' ' + row['apellidos']);
            values.push(row['identificacion']);
            values.push(row['email']);
            this.infoExportar.push(values);
        });
        const reportData = {
            title: 'Reporte de Pagos',
            data: this.infoExportar,
            headers
        };
        this.exportFile.exportExcel(reportData);
    }

}
