import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export function FormatarData(data: string): string {
  const dataOriginal = data.replace(' 00:00:00', '').trim().split('-');
  return dataOriginal[2] + '/' + dataOriginal[1] + '/' + dataOriginal[0];
}

export function FormatarDataPtBr(value: string): string {
  if (!value) {
    return '';
  }

  const dataForm = moment(value);
  return dataForm.format('DD/MM/YYYY HH:mm:ss');
}

export function FormatarDataAmericano(data: string): string {
  if (!data) {
    return '';
  }
  if (data.includes('/')) {
    const dataForm = moment(data, 'DD/MM/YYYY');
    return dataForm.format('YYYY-MM-DD');
  } else {
    return data.substr(4) + '-' + data.substr(2, 2) + '-' + data.substr(0, 2);
  }
}

export function FormatarTelefone(data: string): string {
  if (!data) {
    return '';
  }

  return (
    '(' + data.substr(0, 2) + ')' + data.substr(2, 4) + '-' + data.substr(6)
  );
}

export function FormatarCelular(data: string): string {
  if (!data) {
    return '';
  }

  return (
    '(' + data.substr(0, 2) + ')' + data.substr(2, 5) + '-' + data.substr(7)
  );
}

export function FormatarDataSemBarra(data: string): string {
  if (!data) {
    return '';
  }
  return data.substr(0, 2) + '/' + data.substr(2, 2) + '/' + data.substr(4);
}

export function FormatarCPF(data: string): string {
  if (!data) {
    return '';
  }

  return (
    data.substr(0, 3) +
    '.' +
    data.substr(3, 3) +
    '.' +
    data.substr(6, 3) +
    '-' +
    data.substr(9)
  );
}

export function FormatarCNPJ(data: string): string {
  if (!data) {
    return '';
  }

  return (
    data.substr(0, 2) +
    '.' +
    data.substr(2, 3) +
    '.' +
    data.substr(5, 3) +
    '/' +
    data.substr(8, 4) +
    '-' +
    data.substr(12)
  );
}

export function formatarImagem(file: any, width: any, height: any, type: any) {
  return new Promise(function (resolve, reject) {
    //let allow = ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'svg'];
    let allow = ['jpg', 'png', 'jpeg', 'gif'];
    try {
      if (
        file.name &&
        file.name.split('.').reverse()[0] &&
        allow.includes(file.name.split('.').reverse()[0].toLowerCase()) &&
        file.size &&
        file.type
      ) {
        let imageType = type ? type : 'jpeg';
        const imgWidth = width ? width : 500;
        const imgHeight = height ? height : 300;
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();

          let verificarImg: any = '';
          if (event.target!.result) verificarImg = event.target!.result;

          img.src = verificarImg;
          (img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = imgWidth;
            elem.height = imgHeight;
            const ctx = elem.getContext('2d')!;
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            ctx.canvas.toBlob(
              (blob) => {
                const file = new File([blob!], fileName, {
                  //type: `image/${imageType.toLowerCase()}`,
                  type: `image/png`,
                  lastModified: Date.now(),
                });
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  resolve(reader.result);
                };
                reader.onerror = function (error) {
                  reader.onerror = (error) => reject(error);
                };
                //resolve(file);
              },
              'image/jpeg',
              1
            );
          }),
            (reader.onerror = (error) => reject(error));
        };
      } else reject('Arquivo inválido.');
    } catch (error) {
      console.log('Ocorreu um erro com a imagem: ', error);
      reject(error);
    }
  });
}
export function verificarDiaSemana(data: string): string {
  if (!data) {
    return '';
  }

  var semana = [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo',
  ];

  if (data.includes('/')) {
    const dataAux = data.split('/');
    var teste = new Date(dataAux[2] + '-' + dataAux[1] + '-' + dataAux[0]);
  } else {
    var teste = new Date(data);
  }

  var dia = teste.getDay();
  return semana[dia];
}

@Pipe({ name: 'dataPtBrPipe' })
export class DataPtBrPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const dataForm = moment(value);
    return dataForm.format('DD/MM/YYYY HH:mm:ss');
  }
}

@Pipe({ name: 'cpfPipe' })
export class CpfPipe implements PipeTransform {
  transform(
    value: string | number,
    ocultarAlgunsValores: boolean = false
  ): string {
    if (!value) {
      return '';
    }

    let valorFormatado: string = (value + '').replace(/[^\d]+/g, '').trim();

    valorFormatado = valorFormatado
      .padStart(11, '0')
      .substr(0, 11)
      .replace(/[^0-9]/, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    if (ocultarAlgunsValores) {
      valorFormatado = 'XXX.' + valorFormatado.substr(4, 7) + '-XX';
    }

    return valorFormatado;
  }
}

@Pipe({ name: 'horaPipe' })
export class HoraPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    let valorFormatado = value;

    if (value.includes(':')) {
      const valor = value.split(':');
      valorFormatado = valor[0] + ':' + valor[1];
    }
    return valorFormatado;
  }
}

@Pipe({
  name: 'moedaPipe',
})
export class MoedaPipe implements PipeTransform {
  transform(valueaux: string): string {
    if (!valueaux) {
      return '';
    }

    let value = parseFloat(valueaux);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
}

export function obterId(): string {
  let data = new Date();
  const id =
    data.getDate() +
    '' +
    data.getMonth() +
    '' +
    data.getFullYear() +
    '' +
    data.getHours() +
    '' +
    data.getMinutes() +
    '' +
    data.getSeconds() +
    '' +
    data.getMilliseconds();
  return id.trim() + '-' + environment.idEmpresa;
}

export function retornaGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
