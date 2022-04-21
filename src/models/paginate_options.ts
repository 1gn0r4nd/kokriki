export class PaginateOptions {
  public groupBy: string[];
  public groupDesc: string[];
  public itemsPerPage: number;
  public multiSort: boolean;
  public mustSort: boolean;
  public page: number;
  public sortBy: string[];
  public sortDesc: boolean[];

  constructor(
    groupBy: string[],
    groupDesc: string[],
    itemsPerPage: number,
    multiSort: boolean,
    mustSort: boolean,
    sortBy: string[],
    page: number,
    sortDesc: boolean[]
  ) {
    this.groupBy = groupBy;
    this.groupDesc = groupDesc;
    this.itemsPerPage = itemsPerPage;
    this.multiSort = multiSort;
    this.mustSort = mustSort;
    this.sortBy = sortBy;
    this.page = page;
    this.sortDesc = sortDesc;
  }

  public jsonapiSort(): string {
    console.log("called");
    let sortString = "";
    if (this.sortBy.length > 0 && this.sortDesc.length > 0) {
      for (let i = 0; i < this.sortBy.length && i < this.sortDesc.length; i++) {
        console.log(this.sortBy[i]);
        if (this.sortDesc[i]) {
          sortString += `-#{this.sortBy[i]}`;
          console.log('desc');
        } else {
          sortString+=this.sortBy[i];
          console.log('asc');
        }
      }
    }
    return sortString;
  }
}
