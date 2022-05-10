import {Component, OnInit, ViewChild} from '@angular/core';
import {PublicacionesService} from '../publicaciones.service';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ExportService} from '../../../../../../services/export/export.service';

@Component({
    selector: 'app-reporte',
    templateUrl: './reporte.component.html',
    styleUrls: ['./reporte.component.scss'],
    providers: [DatePipe]
})
export class ReporteComponent implements OnInit {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    public page = 1;
    public pageSize: any = 10;
    public maxSize;
    public collectionSize;

    public publicaciones;
    public infoExportar;

    constructor(
        private publicacionesService: PublicacionesService,
        private datePipe: DatePipe,
        private exportFile: ExportService,
    ) {
    }

    ngOnInit(): void {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.iniciarPaginador();
        this.obtenerReportePublicaciones();
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerReportePublicaciones();
        });
    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    obtenerReportePublicaciones() {
        this.publicacionesService.obtenerReportePublicaciones(
            {
                page: this.page - 1,
                page_size: this.pageSize,
            }
        ).subscribe((info) => {
            this.publicaciones = info.info;
            this.collectionSize = info.cont;
        });
    }

    exportarExcel() {
        this.infoExportar = [];
        const headers = ['Nombres', 'Apellidos', 'Whatsapp', 'Email', 'Fecha compartida', 'Titulo'];
        this.publicaciones.forEach((row: any) => {

            const values = [];
            values.push(row['nombres']);
            values.push(row['apellidos']);
            values.push(row['whatsapp']);
            values.push(row['email']);
            values.push(row['created_at']);
            values.push(row['publicacion_titulo']);
            this.infoExportar.push(values);
        });
        const reportData = {
            title: 'Reporte de las publicaciones compartidas',
            data: this.infoExportar,
            headers
        };
        this.exportFile.exportExcel(reportData);
    }

}
