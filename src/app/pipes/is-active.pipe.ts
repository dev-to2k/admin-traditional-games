import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string | null {
    if (value === null) return null;

    if (value) {
      return 'Online'
    }

    return 'Offline';
  }

}
