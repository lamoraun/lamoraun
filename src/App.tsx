import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ƒругие маршруты можно добавл€ть здесь */}

            {/* ќбработчик 404 Ч должен быть последним */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;