import { Spinner } from 'react-bootstrap';
import QuestionCard from './QuestionCard.jsx';
import './QuestionList.css';

const QuestionList = ({ questions, loading }) => {
  const questionList = Array.isArray(questions) ? questions : [];

  if (loading) {
    return (
      <div className="qlist-loading" aria-live="polite">
        <Spinner animation="border" role="status" className="qlist-spinner" />
        <p className="mt-3 mb-0">Loading questions...</p>
      </div>
    );
  }

  if (questionList.length === 0) {
    return (
      <div className="qlist-loading" role="status">
        <p className="qlist-empty mb-0">No questions found</p>
      </div>
    );
  }

  return (
    <section>
      {questionList.map((question, index) => (
        <QuestionCard key={question._id || `question-${index}`} question={question} />
      ))}
    </section>
  );
};

export default QuestionList;
