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

  /**
   * @param msg 返回消息
   * @param data 返回对象
   * @param code 状态码
   * @return
   */
  public static returnData(data: any = null, code = 200, msg = 'success'): ResponseData {
    return { code, msg, data };
  }

  /**
   * @param msg 返回消息
   * @param data 返回对象
   * @param code 状态码
   * @return
   */
  public static getData(data: any = null, code = 200, msg = 'success'): ResponseData {
    return { code, msg, data: JSON.stringify(data) };
  }

  /**
 * @description JSON数据转对象
 * @return
 */
  public static parse(data: any = null): ResponseData {
    return { ...data, data: JSON.parse(data.data || 'null') };
  }

  /**
   * @param msg 返回消息
   * @param data 返回对象
   * @param code 状态码
   * @return
   */
  public static buildSuccess(data: any = null, msg = 'success',): ResponseData {
    return JsonData.getData(data, 200, msg);
  }

  /**
   * @param msg 返回消息
   * @param data 返回对象
   * @param code 状态码
   * @return
   */
  public static buildError(msg: string, code = 400): ResponseData {
    return JsonData.getData(null, code, msg);
  }
}