import React, { Component, Fragment } from 'react';
import AddQuestionComponent from '../components/roomFeedback/AddQuestion';
import Button from '../components/commons/Button';
import Calendar from '../components/commons/Calendar';
import ExportButton from '../components/commons/ExportButton';
import RoomQuestions from '../components/roomFeedback/RoomFeedback';
// eslint-disable-next-line import/no-named-as-default
import RoomFeedbackResponseList from '../components/roomFeedback/RoomFeedbackResponseList';
import { NavBar } from '../components';
import '../assets/styles/roomFeedbackContainer.scss';
import { getTodaysDate } from '../utils/Utilities';
import { getUserDetails, getRoomFeedbackQuestions, getAllResponses } from '../components/helpers/QueriesHelpers';
import FilterResponseButton from '../components/roomFeedback/FilterResponseButton';
import FilterRoomResponses from '../components/roomFeedback/FilterRoomResponses';

class RoomFeedbackPage extends Component {
  state = {
    allRoomResponses: [],
    filterModal: false,
    isResponsePageVisible: false,
    activeTab: '',
    responseData: [],
    loading: true,
    startDate: getTodaysDate(),
    endDate: getTodaysDate(),
    roomFilter: '',
    filteredData: [],
    useFilter: false,
    sliderSpan: { minValue: 0, maxValue: 20 },
    responseCutoff: { min: -1, max: Infinity },
  }

  componentDidMount = () => {
    this.getPreviousTab();
    this.getData(true);
  };

  /**
   * It queries the Apollo store to fetch user details
   * @returns {Object}
   */
  getData = async (fetchUser) => {
    this.setState({ loading: true });
    let user;
    if (fetchUser) {
      user = await getUserDetails();
    }
    const feedbackQuestions = await getRoomFeedbackQuestions();
    const allRoomResponses = await this.getResponses();
    const sliderSpan = this.getResponseCutoff(allRoomResponses);

    this.setState({
      loading: false,
      ...(fetchUser && { user }),
      ...(feedbackQuestions && { questions: feedbackQuestions.questions }),
      allRoomResponses,
      sliderSpan,
    });
  };

  getResponses = async (setState) => {
    const { startDate, endDate } = this.state;
    if (setState) {
      this.setState({ loading: true });
    }
    const allRoomResponses = await getAllResponses({ startDate, endDate });
    if (setState) {
      const sliderSpan = this.getResponseCutoff(allRoomResponses);
      return this.setState({
        allRoomResponses,
        loading: false,
        sliderSpan,
      });
    }
    return allRoomResponses;
  }

  getResponseCutoff = (allRoomResponses) => {
    const responseArray = allRoomResponses.responses.map(({ totalResponses }) => totalResponses);
    return {
      minValue: Math.min(...responseArray),
      maxValue: Math.max(...responseArray),
    };
  }

  setResponseCutoff = (responseCutoff) => {
    this.setState({ responseCutoff });
  }

  setRoom = (roomFilter) => {
    this.setState({ roomFilter });
  }


  /**
   * Loops through the room responses
   * and calculates the total number of responses
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  getTotalResponses = (rooms) => {
    let totalResponses = 0;
    rooms.forEach((room) => {
      totalResponses += ((room.response).length);
    });
    return totalResponses;
  };

  /**
   * Loops through the room responses
   * and calculates the total number of rooms
   * with missing items
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  getRoomsWithMissingItems = (rooms) => {
    let roomsWithMissingItemsCount = 0;
    const individualRoomResponsesArray = rooms.map(room => room.response);
    individualRoomResponsesArray.forEach((responses) => {
      let roomHasMissingItem = false;
      responses.forEach((response) => {
        if (response.response.__typename === 'MissingItems' && response.response.missingItems) {
          roomHasMissingItem = true;
        }
      });
      if (roomHasMissingItem === true) { roomsWithMissingItemsCount += 1; }
    });
    return roomsWithMissingItemsCount;
  };

  /**
   * Loops through the room responses
   * and calculates the average room rating
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  getTotalAverageRating = (rooms) => {
    let ratingsCount = 0;
    let totalRating = 0;
    rooms.forEach((room) => {
      (room.response).forEach((response) => {
        if (response.response.__typename === 'Rate') {
          totalRating += (response.response.rate);
          ratingsCount += 1;
        }
      });
    });
    let averageRating = Math.round(totalRating / ratingsCount);

    if (Number.isNaN(averageRating)) {
      averageRating = 'No ratings yet';
    }

    return averageRating;
  };

  getPreviousTab = async () => {
    const tab = await sessionStorage.getItem('feedbackActiveTab');
    if (tab) {
      await this.setState(prevState => ({
        ...prevState,
        activeTab: tab,
      }));
    } else {
      await this.setState(prevState => ({
        ...prevState,
        activeTab: 'questions',
      }));
    }
  }

  handleFilter = () => {
    const filteredData = this.filterData();
    this.setState({ filteredData, useFilter: true });
  }


  clearFilters = () => {
    const { minValue: min, maxValue: max } = this.state.sliderSpan;
    this.setState({
      useFilter: false,
      roomFilter: '',
      responseCutoff: { min, max },
    });
  }

  filterData = () => {
    const {
      allRoomResponses,
      roomFilter,
      responseCutoff: { min, max },
      sliderSpan: { minValue, maxValue },
    } = this.state;
    const filteredData = { ...allRoomResponses };
    if (roomFilter) {
      filteredData.responses = filteredData.responses
        .filter(({ roomName }) => roomName === roomFilter);
    }
    if ((min !== minValue) || (max !== maxValue)) {
      filteredData.responses = filteredData.responses
        .filter(({ response: { length } }) =>
          (length >= min) && (length <= max));
    }
    return filteredData;
  }

  dateValue = () => {
    const {
      startDate,
      endDate,
    } = this.state;

    return {
      startDate,
      endDate,
    };
  };

  sendDateData = (start, end) => {
    this.setState({
      startDate: start,
      endDate: end,
    }, () => this.getResponses(true));
  };

  /**
   * It toggles the state properties vaule between true and false
   *
   * @returns {void}
   */

  toggleVisibility = () => {
    const setTab = async (tab) => {
      await this.setState(prevState => ({
        ...prevState,
        isResponsePageVisible: !prevState.isResponsePageVisible,
        activeTab: tab,
      }));
      await sessionStorage.setItem('feedbackActiveTab', tab);
    };

    if (!this.state.isResponsePageVisible) {
      setTab('responses');
    } else {
      setTab('questions');
    }
  };

  toggleFilterModal = (isOpen) => {
    if (typeof isOpen !== 'boolean') {
      return this.setState(({ filterModal }) => ({ filterModal: !filterModal }));
    }
    return this.setState({ filterModal: isOpen });
  }

  /**
   * Loops through the room responses
   * and transforms the data to an acceptable format
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  formatAllRoomFeedbackData = () => {
    const { allRoomResponses, filteredData, useFilter } = this.state;
    const rooms = useFilter ? filteredData.responses : allRoomResponses.responses;
    const roomsResponses = (rooms) ? rooms.filter(room => (room.response).length > 0) : [];
    const totalResponses = this.getTotalResponses(roomsResponses);
    const roomsWithMissingItems = this.getRoomsWithMissingItems(roomsResponses);
    const totalAverageRating = this.getTotalAverageRating(roomsResponses);
    const feedback = {
      totalResponses,
      roomsWithMissingItems,
      totalAverageRating,
      roomsResponses,
    };
    return feedback;
  };


  render() {
    const {
      responseData,
      filterModal, allRoomResponses, activeTab,
      startDate, endDate, user, useFilter,
      loading, questions, sliderSpan,
    } = this.state;

    const renderTabButton = tab => (<Button
      title={tab.toUpperCase()}
      handleClick={this.toggleVisibility}
      classProp={`${tab.toLowerCase()}-tab-nav`}
      type={(activeTab !== `${tab.toLowerCase()}`) ? 2 : null}
      isDisabled={activeTab === `${tab.toLowerCase()}`}
    />);

    return (
      <Fragment>
        <NavBar />
        <div className="roomfeedback-container">
          <div className="roomfeedback-container__control">
            <div className="tab-navigator">
              {renderTabButton('questions')}
              {renderTabButton('responses')}
            </div>
            {
              activeTab === 'questions' && <AddQuestionComponent refetch={this.getData} />}
            {
              activeTab === 'responses' && (
                <div className="response-feedback-container">
                  <div className="response-feedback-container__items">
                    <FilterResponseButton
                      toggleFilterModal={this.toggleFilterModal}
                    />
                    <Calendar
                      sendData={this.sendDateData}
                      startDate={startDate}
                      endDate={endDate}
                      disabledDateRange="future"
                    />
                    <div>
                      {
                        responseData &&
                        <ExportButton
                          data={{ downloadData: this.formatAllRoomFeedbackData(), dateValue: this.dateValue(), downloadDataName: 'feedbackResponses' }}
                        />
                      }
                    </div>
                  </div>
                  <div className="response-feedback-container__modal">
                    <div className={`response-feedback-container__modal__content${filterModal ? ' active' : ''}`}>
                      <FilterRoomResponses
                        isActive={filterModal}
                        setResponseCutoff={this.setResponseCutoff}
                        setRoom={this.setRoom}
                        useFilter={useFilter}
                        filterData={this.handleFilter}
                        sliderSpan={sliderSpan}
                        clearFilters={this.clearFilters}
                        toggleFilterModal={this.toggleFilterModal}
                        rooms={allRoomResponses.responses
                          && allRoomResponses.responses.map(({ roomName }) => roomName)}
                      />
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          {
            activeTab === 'responses' ?
              (
                <div id="responses">
                  <RoomFeedbackResponseList
                    feedback={this.formatAllRoomFeedbackData()}
                    loading={loading}
                  />
                </div>
              ) :
              (
                <div id="questions">
                  <RoomQuestions
                    refetch={this.getData}
                    loading={loading}
                    questions={questions}
                    user={user}
                  />
                </div>
              )
          }
        </div>
      </Fragment>
    );
  }
}

export default RoomFeedbackPage;
