import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vacancyId',
  standalone: true
})
export class VacancyIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const urlMatch = value.match(/hh\.ru\/vacancy\/(\d+)/);
    if (urlMatch) {
      return urlMatch[1];
    }
    
    return value;
  }
}