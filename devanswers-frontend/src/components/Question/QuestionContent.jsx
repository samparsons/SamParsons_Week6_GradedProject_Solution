import { useEffect, useState } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaArrowUp, FaUser, FaClock } from 'react-icons/fa';
import VoteButtons from '../Shared/VoteButtons.jsx';
import './QuestionContent.css';

const normalizeQuestionVotes = (question) => {
  if (!question) {
    return null;
  }

  let upvotes = Array.isArray(question.upvotes) ? [...question.upvotes] : [];
  let downvotes = Array.isArray(question.downvotes) ? [...question.downvotes] : [];
  const seedVoteCount = Number.isFinite(question.voteCount) ? question.voteCount : 0;

  if (upvotes.length === 0 && downvotes.length === 0 && seedVoteCount !== 0) {
    if (seedVoteCount > 0) {
      upvotes = Array.from({ length: seedVoteCount }, (_, voteIndex) => `seed-question-up-${question._id}-${voteIndex}`);
    } else {
      downvotes = Array.from({ length: Math.abs(seedVoteCount) }, (_, voteIndex) => `seed-question-down-${question._id}-${voteIndex}`);
    }
  }

  return {
    ...question,
    upvotes,
    downvotes,
    totalVotes: upvotes.length + downvotes.length,
    voteCount: upvotes.length - downvotes.length,
  };
};

const QuestionContent = ({ question }) => {
  const [questionState, setQuestionState] = useState(() => normalizeQuestionVotes(question));

  useEffect(() => {
    setQuestionState(normalizeQuestionVotes(question));
  }, [question]);

  if (!questionState) {
    return null;
  }

  const upvoteCount = questionState.upvotes.length;
  const downvoteCount = questionState.downvotes.length;
  const totalVotes = upvoteCount + downvoteCount;
  const voteCount = upvoteCount - downvoteCount;
  const createdDateText = questionState.createdAt
    ? new Date(questionState.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';
  const authorName = questionState.author?.name || 'Anonymous';

  const handleUpvote = () => {
    const voteToken = `local-question-upvote-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setQuestionState((previousQuestion) => ({
      ...previousQuestion,
      upvotes: [...previousQuestion.upvotes, voteToken],
      totalVotes: previousQuestion.upvotes.length + 1 + previousQuestion.downvotes.length,
      voteCount: previousQuestion.upvotes.length + 1 - previousQuestion.downvotes.length,
    }));

    alert('Upvoted!');
  };

  const handleDownvote = () => {
    const voteToken = `local-question-downvote-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setQuestionState((previousQuestion) => ({
      ...previousQuestion,
      downvotes: [...previousQuestion.downvotes, voteToken],
      totalVotes: previousQuestion.upvotes.length + previousQuestion.downvotes.length + 1,
      voteCount: previousQuestion.upvotes.length - (previousQuestion.downvotes.length + 1),
    }));

    alert('Downvoted!');
  };

  return (
    <>
      {/* Question Header */}
      <Card className="qcontent-header-card mb-4">
        <Card.Body className="p-3 p-sm-4">
          <Card.Title as="h2" className="qcontent-title mb-3">
            {questionState.title}
          </Card.Title>
          <div className="qcontent-meta d-flex flex-wrap gap-3 gap-sm-4">
            <span className="d-flex align-items-center gap-2">
              <FaArrowUp className="qcontent-vote-icon-up" />
              <strong>{totalVotes}</strong> total votes
            </span>
            <span className="d-flex align-items-center gap-2">
              <FaArrowUp className="qcontent-vote-icon-up" />
              <strong>{voteCount}</strong> score
            </span>
            <span className="d-flex align-items-center gap-2">
              <FaClock />
              Asked {createdDateText}
            </span>
          </div>
        </Card.Body>
      </Card>

      {/* Question Body */}
      <Card className="qcontent-body-card mb-4">
        <Card.Body className="p-3 p-sm-4">
          <Row>
            {/* Voting Controls */}
            <Col xs="auto" className="d-flex flex-column align-items-center pe-3 pe-sm-4">
              <VoteButtons
                voteCount={voteCount}
                upvoteCount={upvoteCount}
                downvoteCount={downvoteCount}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
                variant="outline"
                size="lg"
              />
            </Col>

            {/* Main Content */}
            <Col>
              <div className="qcontent-description mb-4">{questionState.description}</div>
              <div className="mb-4">
                {questionState.tags?.map((tag) => (
                  <Badge key={tag.name || tag} className="qcontent-tag-badge me-2 mb-2">
                    {tag.name || tag}
                  </Badge>
                ))}
              </div>
              <div className="qcontent-author-row d-flex align-items-center gap-2">
                <FaUser className="qcontent-user-icon" />
                <span>Posted by </span>
                <strong className="qcontent-author-name">{authorName}</strong>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default QuestionContent;
