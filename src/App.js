import React, { useState } from 'react';
import Login from './Login';
import Quiz from './Quiz';
import './style.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [quiz, setQuiz] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData); // Ensure userData includes { name: 'User Name', ...otherProperties }
    };

    const handleQuizSelection = (selectedQuiz) => {
        setQuiz(selectedQuiz);
    };

    const handleResetQuiz = () => {
        setQuiz(null);
    };

    return (
        <div className="app-container">
            {!user ? (
                <Login onLogin={handleLogin} />
            ) : !quiz ? (
                <div className="quiz-selection">
                    <h2>Select a Quiz</h2>
                    <button onClick={() => handleQuizSelection('java')}>Java Quiz</button>
                    <button onClick={() => handleQuizSelection('html')}>HTML Quiz</button>
                    <button onClick={() => handleQuizSelection('javascript')}>JavaScript Quiz</button>
                </div>
            ) : (
                <Quiz user={user} quizType={quiz} onReset={handleResetQuiz} />
            )}
        </div>
    );
};

export default App;
