

export interface pBlock{
    blockId: number;
    pages: number[];
    blockLabel: string;
}

export interface IPageData {
    rowCount:number;
    pageSize:number;
    pageCount: number;
    blockSize: number;
    blockCount: number;
    currentPage:number;
    currentBlock:number;
    blocks: pBlock[];
  }
