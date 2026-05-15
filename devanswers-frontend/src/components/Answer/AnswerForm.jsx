import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './AnswerForm.css';

const AnswerForm = () => {
  const [answerText, setAnswerText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!answerText.trim()) {
      alert('Answer cannot be empty!');
      return;
    }

    // Starter instructions omit createdAt input; production flow relies on the database to set createdAt.
    alert('Answer submitted!');
    setAnswerText('');
  };

  return (
    <Card className="answer-form-card mt-4">
      <Card.Body>
        <h3 className="answer-form-title">Your Answer</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="answerText">
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Write your answer here..."
              value={answerText}
              onChange={(event) => setAnswerText(event.target.value)}
              className="answer-form-textarea"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" className="answer-form-submit-btn">
              Post Answer
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AnswerForm;