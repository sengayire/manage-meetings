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
import { getUserDetails } from '../components/helpers/QueriesHelpers';

class RoomFeedbackPage extends Component {
  state = {
    isResponsePageVisible: false,
    responseData: [],
    upperLimitCount: 100,
    lowerLimitCount: 0,
    startDate: getTodaysDate(),
    endDate: getTodaysDate(),
    user: '',
  }

  componentDidMount = () => {
    this.getUsersInformation();
  };

  /**
   * It queries the Apollo store to fetch user details
   * @returns {Object}
   */
  getUsersInformation = async () => {
    const user = await getUserDetails();
    this.setState({
      user,
    });
  };

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


  render() {
    const {
      isResponsePageVisible, responseData, lowerLimitCount,
      upperLimitCount, startDate, endDate, user,
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
            {!isResponsePageVisible && <AddQuestionComponent />}
            {
              isResponsePageVisible &&
              <Fragment>
                <Calendar />
                {responseData && <ExportButton />}
              </Fragment>
            }
          </div>
          {
            isResponsePageVisible
              ? (
                <div id="responses">
                  <RoomFeedbackResponseList
                    checkData={this.checkData}
                    startDate={startDate}
                    endDate={endDate}
                    upperLimitCount={upperLimitCount}
                    lowerLimitCount={lowerLimitCount}
                  />
                </div>)
              : <div id="questions"><RoomQuestions /></div>
          }
        </div>
      </Fragment>
    );
  }
}

export default RoomFeedbackPage;
