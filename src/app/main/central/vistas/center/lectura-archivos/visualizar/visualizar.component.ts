import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SolicitudesCreditosService} from '../../solicitudes-creditos/solicitudes-creditos.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {

  public creditoId;
  public datos;

  constructor(
    private _solicitudCreditosService: SolicitudesCreditosService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
        this.creditoId = params.creditoId;
        console.log(this.creditoId);
        this._solicitudCreditosService.obtenerLecturaArchivos(this.creditoId).subscribe(info => {
          this.datos = info;
        });
      }
    );
  }

  ngOnInit(): void {
  }

}
