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
    responseData: [],
    upperLimitCount: 100,
    lowerLimitCount: 0,
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

  toggleFilterModal = () => this.setState(({ filterModal }) => ({ filterModal: !filterModal }))

  /**
   * It toggles the state properties vaule between true and false
   *
   * @returns {void}
   */
  toggleVisibility = () => {
    this.setState({
      isResponsePageVisible: !this.state.isResponsePageVisible,
    });
  };

  /**
   * calls data from the responses
   * sets the data to state
   * the data in the state determines
   * whether or not to render downloads button
   *
   * @param {Object} data
   *
   * @returns {void}
   */
  checkData = (data) => {
    const { responses } = data;
    this.setState((prevState) => {
      const stateParam = prevState;
      stateParam.responseData = responses;
    });
  }

  sendDateData = (start, end) => {
    this.setState({
      startDate: start,
      endDate: end,
    }, () => this.getResponses(true));
  };

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


  render() {
    const {
      isResponsePageVisible, responseData, lowerLimitCount,
      filterModal, allRoomResponses, filteredData,
      upperLimitCount, startDate, endDate, user, useFilter,
      loading, questions, sliderSpan,
    } = this.state;
    const showResponseButton = (user && user.roles[0].role === 'Admin');
    return (
      <Fragment>
        <NavBar />
        <div className="roomfeedback-container">
          <div className="roomfeedback-container__control">
            <div className="tab-navigator">
              <Button
                title="QUESTIONS"
                handleClick={this.toggleVisibility}
                classProp="questions-tab-nav"
                type={isResponsePageVisible ? 2 : null}
                isDisabled={!isResponsePageVisible}
              />
              {showResponseButton && <Button
                title="RESPONSES"
                handleClick={this.toggleVisibility}
                classProp="responses-tab-nav"
                type={!isResponsePageVisible ? 2 : null}
                isDisabled={isResponsePageVisible}
              />}
            </div>
            {!isResponsePageVisible && <AddQuestionComponent refetch={this.getData} />}
            {
              isResponsePageVisible && (
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
                          data={{ responseData, dateValue: this.dateValue() }}
                        />
                      }
                    </div>
                  </div>
                  <div className="response-feedback-container__modal">
                    <div className={`response-feedback-container__modal__content${filterModal ? ' active' : ''}`}>
                      <FilterRoomResponses
                        setResponseCutoff={this.setResponseCutoff}
                        setRoom={this.setRoom}
                        useFilter={useFilter}
                        filterData={this.handleFilter}
                        sliderSpan={sliderSpan}
                        clearFilters={this.clearFilters}
                        rooms={allRoomResponses.responses.map(({ roomName }) => roomName)}
                      />
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          {
            isResponsePageVisible
              ? (
                <div id="responses">
                  <RoomFeedbackResponseList
                    checkData={this.checkData}
                    upperLimitCount={upperLimitCount}
                    lowerLimitCount={lowerLimitCount}
                    data={{
                      loading,
                      allRoomResponses: useFilter
                        ? filteredData
                        : allRoomResponses,
                    }}
                  />
                </div>)
              :
                <div id="questions">
                  <RoomQuestions
                    refetch={this.getData}
                    loading={loading}
                    questions={questions}
                    user={user}
                  />
                </div>
          }
        </div>
      </Fragment>
    );
  }
}

export default RoomFeedbackPage;
