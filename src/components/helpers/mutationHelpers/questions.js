import apolloClient from '../../../utils/ApolloClient';
import {
  ADD_ROOM_FEEDBACK_QUESTIONS,
  DELETE_ROOM_FEEDBACK_QUESTION,
  UPDATE_QUESTION_MUTATION,
} from '../../../graphql/mutations/Question';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../../graphql/queries/questions';

export const addQuestionMutation = ({
  variables: {
    endDate,
    question,
    questionTitle,
    questionType,
    startDate,
    checkOptions,
  },
}, client = apolloClient) => client
  .mutate({
    mutation: ADD_ROOM_FEEDBACK_QUESTIONS,
    name: 'createQuestion',
    variables: {
      endDate,
      question,
      questionTitle,
      questionType,
      startDate,
      checkOptions: !checkOptions[0] ? ['foo'] : checkOptions,
    },
    // write and read from cache
    update: async (proxy, { data: { createQuestion } }) => {
      const cachedQuestions = proxy.readQuery({
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
      });
      const { questions: { questions } } = cachedQuestions;
      questions.unshift(createQuestion.question);

      proxy.writeQuery({
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
        data: cachedQuestions,
      });
    },
  });

export const deleteQuestionMutation = (id, client = apolloClient) => client
  .mutate({
    mutation: DELETE_ROOM_FEEDBACK_QUESTION,
    name: 'deleteQuestion',
    variables: { questionId: id },
    // write and read from cache
    update: async (proxy) => {
      const cachedQuestions = proxy.readQuery({
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
      });
      const { questions: { questions } } = cachedQuestions;
      cachedQuestions.questions.questions = questions.filter(({ id: existingQuestionId }) =>
        id !== existingQuestionId);

      proxy.writeQuery({
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
        data: cachedQuestions,
      });
    },
  });

export const updateQuestionMutation = ({
  questionId,
  question,
  questionTitle,
  questionType,
  startDate,
  endDate,
}, client = apolloClient) => client
  .mutate({
    mutation: UPDATE_QUESTION_MUTATION,
    name: 'updateQuestionMutation',
    variables: {
      questionId,
      question,
      questionTitle,
      questionType,
      startDate,
      endDate,
    },
    // write and read from cache
    update: async (proxy, { data: { updateQuestion: { question: newQuestion } } }) => {
      const cachedQuestions = proxy.readQuery({
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
      });
      const { questions: { questions } } = cachedQuestions;
      const questionIndex = questions.findIndex(({ id: existingQuestionId }) =>
        newQuestion.id === existingQuestionId);

      questions[questionIndex] = newQuestion;

      proxy.writeQuery({
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
        data: cachedQuestions,
      });
    },
  });
