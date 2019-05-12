import * as React from 'react';
declare type Nullable<T> = T | undefined | null;
export interface Row {
  selected?: boolean;
  renderCell?: (row: Row, header: string) => Nullable<React.ReactNode>;
  [prop: string]: any;
}
export declare type Data = Row[];
export interface Header {
  name: string;
  render?: (header: string) => Nullable<React.ReactNode>;
}
export interface Props {
  data: Data;
  className?: string;
  tableTag?: Nullable<React.ElementType>;
  trTag?: Nullable<React.ElementType>;
  tdTag?: Nullable<React.ElementType>;
  thTag?: Nullable<React.ElementType>;
  theadTag?: Nullable<React.ElementType>;
  tbodyTag?: Nullable<React.ElementType>;
  headers?: Header[];
  renderSelector?: (selected: boolean) => Nullable<React.ReactNode>;
  onHeaderClick?: (header: string, position: number) => void;
  onDataClick?: (
    column: number,
    row: number,
    header: string,
    value: string
  ) => void;
  onRowSelect?: (row: Row, position: number) => void;
}
export default function(props: Props): React.ReactNode;
export {};
