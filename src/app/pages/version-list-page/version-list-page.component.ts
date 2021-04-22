import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { VersionsTableData } from '../../interfaces/table.interface';

// @ts-ignore fake data
import json from '../../fake-data/version.json';

@Component({
  selector: 'app-version-list-page',
  templateUrl: './version-list-page.component.html',
  styleUrls: ['./version-list-page.component.scss']
})
export class VersionListPageComponent {
  tableData!: Array<VersionsTableData>;
  columns = [
    {
      id: 'version',
      label: 'Version'
    },
    {
      id: 'registrationsCount',
      label: 'Number of registrations'
    },
    {
      id: 'phoneNumbersCount',
      label: 'Number of phone numbers'
    },
  ];


  isDataLoaded = false;
  isLoadingError = false;


  constructor(public apiService: ApiService) {
    this.apiService.getVersions().subscribe(
      (res: Array<VersionsTableData>) => {
      this.tableData = res;

      // fake data
      this.tableData = json;

      this.isDataLoaded = true;
    },
    () => {
        this.isLoadingError = true;
    });
  }
}
