import { Pipe, PipeTransform } from '@angular/core';
import { StaffInterface } from '../utils/interface';

@Pipe({
  name: 'pipeSearchFilter'
})
export class PipeSearchFilterPipe implements PipeTransform {

  listnull: StaffInterface[] = []
  transform(listdata: StaffInterface[], searchValue: string, searchType: string): StaffInterface[] {

    if (!listdata || !searchValue) {
      return listdata
    }
    console.log(searchType + "-" + searchValue);

    if (searchType == "searchID") {
      return listdata.filter(data => data.user.id.toString().includes(searchValue.toLocaleLowerCase()))
    } else if (searchType == "SearchEmail") {
      return listdata.filter(data => data.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    } else if (searchType == "SearchName") {
      return listdata.filter(data => data.user.fullname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    }
    return this.listnull
  }

}
