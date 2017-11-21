

export interface IODataArray {
  //@odata.etag
  value: any[];
}


export interface IPagedOData {
  //@odata.context
  //@odata.count
  value: any[];
  //@odata.nextLink
}

export interface IOData {
  context: string;
  count: number;
  value: any[];
  nextLink: string;
}
