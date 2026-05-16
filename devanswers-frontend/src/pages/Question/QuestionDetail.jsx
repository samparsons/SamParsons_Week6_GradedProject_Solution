import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { questions as questionData } from '../../../data/questions.js';
import QuestionContent from '../../components/Question/QuestionContent.jsx';
import AnswerList from '../../components/Answer/AnswerList.jsx';
import AnswerForm from '../../components/Answer/AnswerForm.jsx';
import './QuestionDetail.css';

const QuestionDetail = ({ id, onBack }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timerId = setTimeout(() => {
      const matchedQuestion = questionData.find((item) => item._id === id) || null;
      setQuestion(matchedQuestion);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timerId);
  }, [id]);

  if (loading) {
    return (
      <section className="qdetail-loading" aria-live="polite">
        <Spinner animation="border" role="status" className="qdetail-spinner" />
        <p className="mt-3 mb-0">Loading question...</p>
      </section>
    );
  }

  if (!question) {
    return (
      <section className="qdetail-loading" role="status">
        <p className="qdetail-not-found mb-0">Question not found.</p>
      </section>
    );
  }

  return (
    <Container fluid className="qdetail-container p-3 p-md-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          {typeof onBack === 'function' && (
            <Button
              variant="outline-secondary"
              onClick={onBack}
              className="qdetail-back-btn mb-3"
            >
              Back to Questions
            </Button>
          )}
          <QuestionContent question={question} />
          <AnswerList answers={question.answers} />
          <AnswerForm />
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionDetail;