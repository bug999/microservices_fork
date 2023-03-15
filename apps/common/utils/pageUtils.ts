export interface PageType<T> {
  page: number; // 当前页
  pageSize: number; // 页面大小
  totalNum?: number; // 总数
  totalPage?: number; // 总页数
  list?: T[];
}

export interface PageQueryType {
  page: number; // 当前页
  pageSize: number; // 页面大小
}
const PAGE = 1;
const PAGESIZE = 10;

export class Pagination<T>{
  constructor(page = PAGE, pageSize = PAGESIZE, list, totalNum = 0) {
    this.init(page, pageSize, list, totalNum)
  }

  init(page = PAGE, pageSize = PAGESIZE, list = [], totalNum = 0) {
    this.page = Number(page)
    this.pageSize = Number(pageSize)
    this.totalNum = totalNum;
    this.totalPage = Math.floor(totalNum / pageSize) + 1
    this.list = list
  }
  private page: number; // 当前页

  private pageSize: number; // 页面大小

  private totalNum: number; // 总数

  private totalPage: number; // 总页数

  public list?: T[];
}