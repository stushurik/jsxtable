import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Table from './Table';

describe('table', () => {
  it('should render table using default tags', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      { Age: '23', Name: 'End of this Page', Position: 'CEO' }
    ];

    const props = { data };

    const wrapper = renderer.create(<Table {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render table using custom tags', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      { Age: '23', Name: 'End of this Page', Position: 'CEO' }
    ];

    const tableTag = 'myAwesomeTable';
    const trTag = 'myAwesomeTr';
    const tdTag = 'myAwesomeTd';
    const thTag = 'myAwesomeTh';
    const theadTag = 'myAwesomeThead';
    const tbodyTag = 'myAwesomeTbody';

    const props = { data, tableTag, trTag, tdTag, thTag, theadTag, tbodyTag };

    const wrapper = renderer.create(<Table {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should alow to render row with customization', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      {
        Age: '23',
        Name: 'End of this Page',
        Position: 'CEO',
        renderCell: (row, columnName) => <span>{row[columnName]}</span>
      }
    ];

    const props = { data };

    const wrapper = renderer.create(<Table {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should to set headers order', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      {
        Age: '23',
        Name: 'End of this Page',
        Position: 'CEO',
        render: (row, columnName) => <span>{row[columnName]}</span>
      }
    ];

    const props = {
      data,
      headers: [{ name: 'Position' }, { name: 'Name' }, { name: 'Age' }]
    };

    const wrapper = renderer.create(<Table {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should alow to render header with customization', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      {
        Age: '23',
        Name: 'End of this Page',
        Position: 'CEO',
        render: (row, columnName) => <span>{row[columnName]}</span>
      }
    ];

    const props = {
      data,
      headers: [
        {
          name: 'Position',
          render: header => <span>{header}</span>
        },
        { name: 'Name' },
        { name: 'Age' }
      ]
    };

    const wrapper = renderer.create(<Table {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow to render row selector', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      { Age: '23', Name: 'End of this Page', Position: 'CEO', selected: true }
    ];

    const props = {
      data,
      renderSelector: selected => <div selected={selected} />
    };

    const wrapper = renderer.create(<Table {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render only children and ignore data and headers if childrens are present', () => {
    const data = [
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '23', Name: 'Lee Salminen' },
      { Age: '28', Position: 'Developer' },
      { Name: 'Griffin Smith', Age: '18' },
      { Age: '30', Name: 'Test Person' },
      { Name: 'Another Test', Age: '26', Position: 'Developer' },
      { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
      { Age: '23', Name: 'End of this Page', Position: 'CEO', selected: true }
    ];

    const props = {
      data,
      renderSelector: selected => <div selected={selected} />
    };

    const wrapper = renderer
      .create(
        <Table {...props}>
          <div>
            WE ARE THE <span>CHILDREN!</span>
          </div>
        </Table>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  describe('interaction', () => {
    let sut;
    let data;
    let props;
    let onHeaderClick;
    let onDataClick;
    let onRowSelect;

    beforeEach(() => {
      data = [
        { Name: 'Griffin Smith', Age: '18' },
        { Age: '23', Name: 'Lee Salminen' },
        { Age: '28', Position: 'Developer' },
        { Name: 'Griffin Smith', Age: '18' },
        { Age: '30', Name: 'Test Person' },
        { Name: 'Another Test', Age: '26', Position: 'Developer' },
        { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
        { Age: '23', Name: 'End of this Page', Position: 'CEO' }
      ];

      onHeaderClick = jest.fn();
      onDataClick = jest.fn();
      onRowSelect = jest.fn();

      props = { data, onHeaderClick, onDataClick, onRowSelect };
      sut = shallow(<Table {...props} />);
    });

    it('should allow to handle click on headers', () => {
      sut
        .find('[tid="header"]')
        .first()
        .simulate('click');
      expect(onHeaderClick).toHaveBeenCalledWith('Name', 0);
    });

    it('should allow to handle click on data', () => {
      sut
        .find('[tid="data"]')
        .last()
        .simulate('click');
      expect(onDataClick).toHaveBeenCalledWith(7, 2, 'Position', 'CEO');
    });

    it('should allow to select row', () => {
      sut
        .find('[tid="rowSelector"]')
        .last()
        .simulate('click');
      expect(onRowSelect).toHaveBeenCalledWith(data[7], 7);
    });
  });
});
