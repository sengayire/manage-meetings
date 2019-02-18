import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import SingleRoom, { SingleRoomFeedBack } from '../../../src/components/roomFeedback/SingleRoom';
import rooms from '../../../src/fixtures/roomFeedbackList';

const props = {
  data: {
    loading: false,
    roomResponse: {
      roomName: 'Udi',
      totalResponses: 3,
      response: [
        {
          createdDate: '2019-02-05T15:27:37.236820',
          missingItems: [],
          rating: null,
          responseId: 5,
          suggestion: 'I have a complaint',
        },
        {
          createdDate: '2019-02-06T09:42:29.570264',
          missingItems: [],
          rating: 2,
          responseId: 6,
          suggestion: null,
        },
        {
          createdDate: '2019-02-06T09:50:53.748782',
          missingItems: ['Marker 1', 'Marker 1', 'Permanent Marker'],
          rating: null,
          responseId: 8,
          suggestion: null,
        },
      ],
    },
  },
  roomResources: {
    getResourcesByRoomId: [
      { name: 'Marker 1' },
      { name: 'Permanent Marker' },
    ],
  },
  roomId: 1,
  visible: true,
  showModal: jest.fn(() => true),
};

const emptyProps = {
  data: {
    loading: false,
    roomResponse: {
      roomName: 'Udi',
      totalResponses: 0,
      response: [],
    },
  },
  roomId: 1,
  visible: true,
  showModal: jest.fn(() => true),
};

describe('SingleRoom test', () => {
  it('renders correctly when "visible" prop is "true"', () => {
    const propsWithTrueVisibleProp = {
      rooms,
      roomId: 1,
      visible: true,
      showModal: jest.fn(() => true),
    };
    const wrapper = mount(
      <MockedProvider>
        <SingleRoom {...propsWithTrueVisibleProp} />
      </MockedProvider>,
    );
    expect(wrapper.find('.modal-wrapper')).toHaveLength(1);
  });

  it('renders correctly when "visible" prop is "false" ', () => {
    const propsWithFalseVisibleProp = {
      rooms,
      roomId: 1,
      visible: false,
      showModal: jest.fn(() => true),
    };
    const wrapper = mount(
      <MockedProvider>
        <SingleRoom {...propsWithFalseVisibleProp} />
      </MockedProvider>,
    );
    expect(wrapper.find('.modal-wrapper')).toHaveLength(0);
  });

  describe('SingleRoomFeedBack test', () => {
    const component = shallow(<SingleRoomFeedBack {...props} />);
    const emptyComponent = shallow(<SingleRoomFeedBack {...emptyProps} />);

    it('renders three room responses', () => {
      expect(component.find('.response-item')).toHaveLength(3);
    });

    it('does not render room responses', () => {
      expect(emptyComponent.find('.response-item')).toHaveLength(0);
    });

    it('renders correctly when there are no responses', () => {
      expect(emptyComponent.find('.item-list-empty')).toHaveLength(1);
    });
  });
});
