import { Pipe, PipeTransform } from '@angular/core';
import { ACADEMIC_YEARS } from './../const/academic.years';
@Pipe({
  name: 'AcademicYear'
})
export class AcademicYearPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
   const selectedYear = ACADEMIC_YEARS.filter((year) => {
      return year.id == value
    })
    console.log('selectedYear', selectedYear)
    return selectedYear[0].name;
  }

}
