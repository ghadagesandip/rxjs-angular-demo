import { Pipe, PipeTransform } from '@angular/core';
import { ACADEMIC_YEARS } from './../const/academic.years';
@Pipe({
  name: 'AcademicYear'
})
export class AcademicYearPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('pipe valie', value)
   const selectedYear = ACADEMIC_YEARS.filter((year) => {
      return year.academic_year == value
    })
    // console.log('selectedYear', selectedYear)
    return selectedYear[0].name;
  }

}
