import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderService {

  titulo: string;
  tituloSubject: Subject<string>;

  back: boolean;
  backArgs: any[];
  backSubject: Subject<boolean>;

  constructor() {
    this.titulo = "";
    this.tituloSubject = new Subject();

    this.back = false;
    this.backArgs = [];
    this.backSubject = new Subject();
  }

  public getTituloObserver(): Observable<string> {
    this.tituloSubject.next(this.titulo);
    return this.tituloSubject;
  }

  public setTitulo(titulo: string): void {
    this.titulo = titulo;
    this.tituloSubject.next(this.titulo);
  }

  public getBackObserver(): Observable<boolean> {
    this.backSubject.next(this.back);
    return this.backSubject;
  }

  public setBack(back: boolean, backArgs: any[]): void {
    this.back = back;
    if (this.back) this.backArgs = backArgs;
    else this.backArgs = [];
    this.backSubject.next(this.back);
  }

  public getBackArgs(): any[] {
    return this.backArgs
  }

}
