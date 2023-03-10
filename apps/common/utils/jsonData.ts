export interface ResponseData {
  code: number;
  data: any;
  msg: string | number
}
export class JsonData {
  /**
   * 状态码 0 表示成功
   */
  private code: number;
  /**
   * 数据
   */
  private data: any;
  /**
   * 描述
   */
  private msg: string;

  public static getData(data: any = null, code = 200, msg = ''): ResponseData {
    return { code, msg, data };
  }

  /**
   * 成功，不传入数据
   * @return
   */
  public static buildSuccess(msg = ''): ResponseData {
    return JsonData.getData(null, 200, msg);
  }

  /**
   * 失败，传入描述信息
   * @param msg
   * @return
   */
  public static buildError(msg: string): ResponseData {
    return JsonData.getData(null, 400, msg);
  }
}