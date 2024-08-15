import React, { useState, useEffect, useMemo } from 'react';

// Define your quizzes object with consistent key names
const quizzes = {
    java: [
        { question: 'What is Java?', options: ['Programming Language', 'Database', 'OS', 'Editor'], answer: 'Programming Language' },
        { question: 'Which of the following is not a Java feature?', options: ['Dynamic', 'Architecture Neutral', 'Use of pointers', 'Object-oriented'], answer: 'Use of pointers' },
        { question: 'What is the return type of the hashCode() method in the Object class?', options: ['Object', 'int', 'long', 'void'], answer: 'int' },
        { question: 'Which method of the Class.class is used to determine the name of a class represented by the class object as a String?', options: ['getClass()', 'intern()', 'getName()', 'toString()'], answer: 'getName()' },
        { question: 'Which of the following is true about the anonymous inner class?', options: ['It has only methods', 'Objects can not be created', 'It has a fixed class name', 'It has no class name'], answer: 'It has no class name' }
    ],
    html: [
        { question: 'What does HTML stand for?', options: ['Hypertext Markup Language', 'HighText Markup Language', 'Hypertext Multiple Language', 'None of the above'], answer: 'Hypertext Markup Language' },
        { question: 'Which tag is used to create a hyperlink in HTML?', options: ['<link>', '<a>', '<href>', '<hyperlink>'], answer: '<a>' },
        { question: 'What is the correct tag to insert an image in HTML?', options: ['<img src="url">', '<image src="url">', '<picture src="url">', '<photo src="url">'], answer: '<img src="url">' },
        { question: 'Which tag defines an unordered list in HTML?', options: ['<ol>', '<ul>', '<list>', '<dl>'], answer: '<ul>' },
        { question: 'What does the <title> tag specify in an HTML document?', options: ['The title of the webpage displayed in the browser’s title bar or tab', 'The main heading of the page', 'A clickable link', 'A section header in the content'], answer: 'The title of the webpage displayed in the browser’s title bar or tab' }
    ],
    javascript: [
        { question: 'What is JavaScript?', options: ['Programming Language', 'Markup Language', 'Database', 'None'], answer: 'Programming Language' }
    ]
};

const Quiz = ({ user, quizType, onReset }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    // Use useMemo to ensure quizData is stable and avoid unnecessary re-renders
    const quizData = useMemo(() => quizzes[quizType] || [], [quizType]);

    useEffect(() => {
        if (completed) {
            // Calculate score
            const totalQuestions = quizData.length;
            const correctAnswers = userAnswers.filter(answer => answer.correct).length;
            setScore((correctAnswers / totalQuestions) * 100); // Percentage score
        }
    }, [completed, userAnswers, quizData]);

    const handleAnswer = (answer) => {
        const currentQuestion = quizData[currentQuestionIndex];
        const isCorrect = currentQuestion.answer === answer;

        setUserAnswers(prevAnswers => [
            ...prevAnswers,
            {
                question: currentQuestion.question,
                selected: answer,
                correct: isCorrect
            }
        ]);

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setCompleted(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setCompleted(false);
        setScore(0);
    };

    return (
        <div className="quiz-container">
            {completed ? (
                <div>
                    <h2>Quiz Completed</h2>
                    <h3>Results for {user.name}:</h3> {/* Display user name */}
                    <p>Score: {score.toFixed(2)}%</p>
                    <ul>
                        {userAnswers.map((answer, index) => (
                            <li key={index}>
                                <strong>{answer.question}</strong><br />
                                Your Answer: {answer.selected} <br />
                                {answer.correct ? 'Correct' : `Incorrect, Correct Answer: ${quizData.find(q => q.question === answer.question).answer}`}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleRestart}>Restart Quiz</button>
                    <button onClick={onReset}>Back to Quiz Selection</button>
                </div>
            ) : (
                <div>
                    <h2>{quizData[currentQuestionIndex]?.question}</h2>
                    {quizData[currentQuestionIndex]?.options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;
