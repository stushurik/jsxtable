// @flow

import React, { type ElementType, type Node } from 'react';

export type Row = {
  [prop: string]: string,
  selected?: boolean,
  renderCell?: (row: Row, header: string) => ?Node
};

export type Data = Row[];

export type Header = {
  name: string,
  render?: (header: string) => ?Node
};

export type Props = {
  data: Data,
  className?: string,
  tableTag?: ?ElementType,
  trTag?: ?ElementType,
  tdTag?: ?ElementType,
  thTag?: ?ElementType,
  theadTag?: ?ElementType,
  tbodyTag?: ?ElementType,
  headers?: Header[],
  renderSelector?: (selected: boolean) => ?Node,
  onHeaderClick?: (header: string, position: number) => void,
  onDataClick?: (
    column: number,
    row: number,
    header: string,
    value: string
  ) => void,
  onRowSelect?: (row: Row, position: number) => void
};

export default function(props: Props): Node {
  const Table = props.tableTag || 'table';
  const Thead = props.theadTag || 'thead';
  const Tbody = props.tbodyTag || 'tbody';
  const Tr = props.trTag || 'tr';
  const Td = props.tdTag || 'td';
  const Th = props.thTag || 'th';

  const headers = props.headers || sniffHeaders(props.data);

  const onHeaderClick = props.onHeaderClick || noop;
  const onDataClick = props.onDataClick || noop;
  const onRowSelect = props.onRowSelect || noop;

  return (
    <Table className={props.className}>
      <Thead>
        <Tr className="headerRow">
          {headers.map((header, i) => (
            <Th
              className="header"
              key={`${i}${header.name}`}
              tid="header"
              onClick={() => onHeaderClick(header.name, i)}
            >
              {header.render ? header.render(header.name) : header.name}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map((row: Row, i) => (
          <Tr
            className="dataRow"
            key={i}
            {...(props.renderSelector && props.onRowSelect
              ? {}
              : {
                  tid: 'rowSelector',
                  onClick: () => onRowSelect(row, i)
                })}
          >
            {props.renderSelector && (
              <Td tid="rowSelector" onClick={() => onRowSelect(row, i)}>
                {props.renderSelector(!!row.selected)}
              </Td>
            )}
            {headers.map((header, j) => (
              <Td
                className="data"
                key={`${i}${header.name}`}
                tid="data"
                onClick={() => onDataClick(j, i, header.name, row[header.name])}
              >
                {row.renderCell
                  ? row.renderCell(row, header.name)
                  : row[header.name]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function sniffHeaders(data: Data): Header[] {
  return [
    ...data
      .reduce((set: Set<string>, row: Row) => {
        Object.keys(row)
          .filter(
            (column: string) => column !== 'renderCell' && column !== 'selected'
          )
          .forEach((column: string) => set.add(column));
        return set;
      }, new Set())
      .values()
  ].map(name => ({
    name
  }));
}

function noop(..._args: any[]) {}
