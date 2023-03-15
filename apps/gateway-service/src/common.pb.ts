import { UserDataType } from "apps/common/pd/common.pd";

export type GatewayArgs<T> = Partial<T> & { user: UserDataType } & { query: any, body: any }