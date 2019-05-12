# jsxtable

Simple react table component with ability to handles clicks on headers,data cells and select row.

## Features:

- allows to override table tags so that it is possible to use different ui toolkits (like react-bootsrap) or by default html table tags
- compatible with style components
- flow && ts types included
- can compute columns names from data or allow to provide columns order and names
- allows to render custom row cells and headers
- allows interact with table: select row, click on header and cells

## Usage

```jsx

import React from 'react';
import Table from 'jsxtable';
import BootstrapTable from 'react-boostrap/lib/Table';

const data = [
  { Name: 'Griffin Smith', Age: '18', selected: true },
  { Age: '23', Name: 'Lee Salminen' },
  { Age: '28', Position: 'Developer' },
  { Name: 'Griffin Smith', Age: '18' },
  { Age: '30', Name: 'Test Person' },
  { Name: 'Another Test', Age: '26', Position: 'Developer' },
  { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
  { Age: '23', Name: 'End of this Page', Position: 'CEO', renderCell: (row, header) => <span>{row[header]}</span> }
];

// an example of headers prop
// const headers = [
//  {
//    name: 'Position',
//    render: header => <span>{header}</span>
//  },
//  { name: 'Name' },
//  { name: 'Age' }
// ]

export default function() {
  return (
    <Table
      className="myAwesomeTable"
      data={data}
      tableTag={BootstrapTable}
      renderSelector={selected => <input type="checkbox" {...(selected ?  {} : {checked: true})}>}
      onHeaderClick={(header, position) => alert(header, position)}
      onDataClick={(column, row, header, value) => alert(column, row, header, value)},
      onRowSelect={(row, position) => alert(row, position)}
    />
  )
}
```

For more details please check out tests and types
