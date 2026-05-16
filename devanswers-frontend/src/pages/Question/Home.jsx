import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QuestionList from '../../components/Question/QuestionList.jsx';
import { questions as questionData } from '../../../data/questions.js';
import './Home.css';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Requirement: keep a short spinner delay so loading state is visible.
    const timerId = setTimeout(() => {
      setQuestions(questionData);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timerId);
  }, []);

  const handleAskQuestion = () => {
    alert('Ask Question clicked');
  };

  return (
    <Container fluid className="home-container p-3 p-md-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} className="home-col">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
            <div>
              <h2 className="home-title mb-1">All Questions</h2>
              <p className="home-subtitle mb-0">{questions.length} question{questions.length !== 1 ? 's' : ''}</p>
            </div>

            <Button className="home-ask-btn" onClick={handleAskQuestion}>
              Ask Question
            </Button>
          </div>

          <QuestionList questions={questions} loading={loading} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;