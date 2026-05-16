# DevAnswers Week 6 Project Plan

## Reuse Notes
- Canonical reusable plan for this repository is in this file: [PROJECT_PLAN.md](PROJECT_PLAN.md).
- Existing saved session plan snapshot also exists at /memories/session/plan.md.
- Important: /memories/session/ is session-scoped, so use this repository file as the durable source of truth.

## Scope
- Project: DevAnswers frontend graded assessment.
- Folder constraint: all implementation remains under [devanswers-frontend](devanswers-frontend).
- Submission folder name: SamParsons_Week6_GradedProject_Solution.
- Assessment scope: frontend behavior and tests only.

## Pairing Workflow
1. Implement one rubric item at a time.
2. Explain changes and rationale immediately after coding.
3. Validate with build/tests.
4. Commit only after sign-off.

## Rubric Map
1. Coding Practices (5): naming consistency, indentation, cleanup, no unused code.
2. Answer Form (10): controlled textarea, validation alerts, reset behavior, styling.
3. Answer List (10): answer cards, empty state, author/date, voting interaction and styles.
4. Question Details (10): question display with answers and answer form.
5. Question List (10): loading branch, empty branch, populated list branch.
6. Home Page (5): load questions, heading/count, Ask Question interaction.
7. Test (5): unit tests for QuestionList, Home, and QuestionDetail.
8. Footer (5): visible styled footer.

## Current Status
1. Phase 1 complete and committed.
   - Commit: 6e93f20
   - Includes Footer, AnswerForm, AnswerList, VoteButtons enhancements, styling, and cleanup.
2. Phase 2 in progress.
   - QuestionList implementation completed in working tree and build-validated.
   - Pending sign-off and commit.
3. Phase 3 not started.
   - Home and QuestionDetail implementations still pending.
4. Phase 4 not started.
   - Unit tests still pending (5 each for QuestionList, Home, QuestionDetail).
5. Phase 5 not started.
   - Final rubric audit and packaging checklist pending.

## Implementation Sequence
1. Phase 2 finalize
   - Confirm QuestionList behavior in [src/components/Question/QuestionList.jsx](devanswers-frontend/src/components/Question/QuestionList.jsx).
   - Commit after sign-off.
2. Phase 3 page orchestration
   - Implement [Home.jsx](devanswers-frontend/src/pages/Question/Home.jsx).
   - Implement [QuestionDetail.jsx](devanswers-frontend/src/pages/Question/QuestionDetail.jsx).
3. Phase 4 tests
   - Implement [QuestionList.test.jsx](devanswers-frontend/tests/unit/components/QuestionList.test.jsx).
   - Implement [Home.test.jsx](devanswers-frontend/tests/unit/pages/Home.test.jsx).
   - Implement [QuestionDetail.test.jsx](devanswers-frontend/tests/unit/pages/QuestionDetail.test.jsx).
4. Phase 5 final audit
   - Run npm run build and npm test.
   - Rubric pass/fail walkthrough.
   - Verify packaging and naming constraints.

## Validation Checklist
1. Build passes: npm run build.
2. Tests pass: npm test.
3. UI checklist:
   - Footer visible with current year.
   - AnswerForm validation and reset work.
   - AnswerList handles undefined/empty/populated states.
   - QuestionList handles loading/empty/populated states.
   - Home and QuestionDetail render required elements.
4. Security checklist:
   - [devanswers-frontend/.env](devanswers-frontend/.env) remains ignored.
