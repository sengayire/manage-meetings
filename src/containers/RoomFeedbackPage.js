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

class RoomFeedbackPage extends Component {
  state = {
    isResponsePageVisible: false,
  }

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

  render() {
    const { isResponsePageVisible } = this.state;
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
              <Button
                title="RESPONSES"
                handleClick={this.toggleVisibility}
                classProp="responses-tab-nav"
                type={!isResponsePageVisible ? 2 : null}
                isDisabled={isResponsePageVisible}
              />
            </div>
            {!isResponsePageVisible && <AddQuestionComponent />}
            {
              isResponsePageVisible &&
              <Fragment>
                <Calendar />
                <ExportButton />
              </Fragment>
            }
          </div>
          {
            isResponsePageVisible
            ? <div id="responses"><RoomFeedbackResponseList /></div>
            : <div id="questions"><RoomQuestions /></div>
          }
        </div>
      </Fragment>
    );
  }
}

export default RoomFeedbackPage;
