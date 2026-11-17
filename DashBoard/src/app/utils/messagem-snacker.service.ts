import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagemSnackerService {

  constructor(private matSnackBar: MatSnackBar) { }

  exibirMessage(msg: string, isError: boolean = false): void {
    this.matSnackBar.open(msg, 'X', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
}
