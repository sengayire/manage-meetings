import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { shallow, mount } from 'enzyme';
import AddWings, { AddWing } from '../../../src/components/wing/addWing';
import GET_FLOORS_QUERY from '../../../src/graphql/queries/Floors';


describe('AddWing Component', () => {
  const floorListMocks = {
    request: {
      query: GET_FLOORS_QUERY,
      variables: {
        page: 1,
        perPage: 5,
      },
    },
    result: {
      data: {
        allFloors: {
          pages: null,
          floors: [
            {
              id: '11',
              name: '2nd floor',
              blockId: 5,
              block: {
                name: 'Container',
                id: '5',
                offices: {
                  id: '2',
                },
              },
            },
          ],
        },
        errors: [
          {
            path: [
              'allFloors',
            ],
            locations: [
              {
                column: 5,
                line: 3,
              },
              {
                column: 7,
                line: 18,
              },
            ],
            message: "unsupported operand type(s) for /: 'Int' and 'int'",
          },
        ],
      },
    },
  };
  const floors = [
    {
      block: {
        name: 'container',
        id: 5,
        offices: {
          location: {
            name: 'Lagos',
          },
        },
      },
      name: '2nd Floor',
      id: '11',
      blockId: 5,
    },
  ];
  const initProps = {
    addWing: jest.fn(),
    data: {
      allFloors: {
        floors,
      },
    },
  };
  let wrapper = shallow(<AddWing {...initProps} />);
  const preventDefault = jest.fn();
  const component = mount(
    <MockedProvider mocks={[floorListMocks]} addTypename={false}>
      <AddWings {...initProps} />
    </MockedProvider>,
  );

  it('renders lists correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().name).toEqual('');
    expect(wrapper.state().floorId).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD WING');
  });

  it('includes buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Add Wing');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#wingName').simulate('change', { target: { name: 'wingName', value: 'state' } });
    wrapper.setState({ name: 'state', floorId: 1 });
    expect(wrapper.state.name).toBe('state');
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('hanlde handleAddWing when  wingName is required', () => {
    wrapper.setState({ name: '', floorId: '1' });
    wrapper.instance().handleAddWing({ preventDefault });
  });

  it('Throw error in handleAddWing when  floor is required', () => {
    wrapper.setState({ name: 'testWing', floorId: '' });
    wrapper.instance().handleAddWing({ preventDefault });
  });

  it('handles handleAddWing() when addWing is rejected', () => {
    const props = {
      addWing: jest.fn(() => Promise.reject()),
      allFloors: { allFloors: [] },
    };
    wrapper = shallow(<AddWing {...props} />);

    wrapper.setState({
      floorId: 1,
      name: 'North wing',
    });

    const variables = {
      floorId: 1,
      name: 'North wing',
    };

    wrapper.instance().handleAddWing({ preventDefault });
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addWing).toHaveBeenCalledWith({ variables });
  });

  it('handles handleWing() when addWing is resolved', () => {
    const mockWing = {
      data: {
        createWing: {
          wing: {
            name: 'Southern wing',
          },
        },
      },
    };
    const props = {
      addWing: jest.fn(() => Promise.resolve(mockWing)),
      allFloors: { allFloors: [] },
    };
    wrapper = shallow(<AddWing {...props} />);

    wrapper.setState({
      floorId: 1,
      name: 'Southern wing',
    });

    const variables = {
      floorId: 1,
      name: 'Southern wing',
    };

    wrapper.instance().handleAddWing({ preventDefault });
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addWing).toHaveBeenCalledWith({ variables });
  });
});
