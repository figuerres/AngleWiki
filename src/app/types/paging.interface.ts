

export interface pBlock{
    blockId: number;
    pages: number[];
    blockLabel: string;
}

export interface IPageData {
    pageSize:number;
    pageCount: number;
    currentPage:number;
    currentBlock:number;
    blocks: pBlock[];
  }
