import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { CargarCreditosEmpleadosService } from '../../cargar-creditos-empleados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx-js-style';
type AOA = any[][];

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('mensajeModal') mensajeModal;
  @ViewChild('confirmarModal') confirmarModal;
  @ViewChild(NgbPagination) paginator: NgbPagination;


  // public
  public page = 1;
  public page_size: any = 10;
  public collectionSize;
  public contentHeader: object;
  public submitted = false;
  public archivo = true;
  public nombreArchivo = "Seleccionar archivo";
  public mensaje = "";
  public nuevoArchivo = new FormData();
  public usuarioForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  public listaEmpresasCorps;
  public listaEmpresasIfis;
  public numeroRegistros=0;
  public empresaIfi;
  public empresaCorp;

  public cantidadMonedas;
  public usuario;
  public cargandoUsuario = false;

  constructor(
    private _cargarCreditosEmpleados: CargarCreditosEmpleadosService,
    private _coreMenuService: CoreMenuService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,

  ) {
    this._unsubscribeAll = new Subject();
    this.usuario = this._coreMenuService.grpCenterUser;
  }

  get usuForm() {
    return this.usuarioForm.controls;
  }
  ngOnInit(): void {
    this.obtenerListaEmpresasCorp();
    this.obtenerListaEmpresasIfis();
    this.usuarioForm = this._formBuilder.group({
      empresaIfis_id: ['', [Validators.required]],
      empresaComercial_id: ['', [Validators.required]],
    }
    );
  }
  obtenerListaEmpresasCorp() {
    this._cargarCreditosEmpleados.obtenerListaEmpresasCorps({}).subscribe((info) => {
      this.listaEmpresasCorps = info.info;
    },
    (error) => {

    });
  }
  obtenerListaEmpresasIfis() {
    this._cargarCreditosEmpleados.obtenerListaEmpresasIfis({}).subscribe((info) => {
      this.listaEmpresasIfis = info.info;
    },
    (error) => {

    });
  }
  obtenerEmpresaIfi(){
    this.empresaIfi = this.listaEmpresasIfis.find((empresa)=>empresa._id === this.usuarioForm.get('empresaIfis_id').value);
  }
  obtenerEmpresaCorp(){
    this.empresaCorp = this.listaEmpresasCorps.find((empresa)=>empresa._id === this.usuarioForm.get('empresaComercial_id').value);
  }
  cargarCreditos(event) {
    this.numeroRegistros=0;
    let archivo = event.target.files[0];
    this.nuevoArchivo = new FormData();
    this.nuevoArchivo.append('documento', archivo, archivo.name);
    this.nombreArchivo = archivo.name;
    this.nuevoArchivo.append('empresa_financiera', this.empresaIfi._id);
    this.archivo = true;

    const target: DataTransfer = <DataTransfer>event.target;
    let data = [];
    if (target.files.length === 1) {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            /* save data */
            data.push(<AOA>XLSX.utils.sheet_to_json(ws, {header: 1}));
            
            // Recuep
            // data[0].map((item, index) => {
            //   if (index > 0) {
            //     if(item[8] != this.empresaIfi.ruc){
            //       this.mensaje = "No coicide el ruc de la empresa Ifi con la seleccionada."
            //       this.abrirModal(this.mensajeModal);
            //     }
            //     console.log(item[8]);
            //   }
            // });
            this.numeroRegistros=data[0].length-1;
        };
        reader.readAsBinaryString(target.files[0]);
    }
  }
  cargar() {
    this.submitted = true;
    if (!this.nuevoArchivo.get('documento')) {
      this.archivo = false;
      return;
    }
    this.mensaje = `Empresa Corp: ${this.empresaCorp.nombreComercial}<br>Ruc: ${this.empresaCorp.ruc}<br>Registros: ${this.numeroRegistros}`;
    this.abrirModal(this.confirmarModal);
  }
  guardar(){
    this._cargarCreditosEmpleados.cargarCreditos(
      this.nuevoArchivo
    ).subscribe(info => {
      this.mensaje = ` ${info.mensaje}, incorrectos: ${info.incorrectos}, correctos: ${info.correctos}`;
      this.abrirModal(this.mensajeModal);
    });
  }

  abrirModal(modal) {
    this.modalService.open(modal)
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
