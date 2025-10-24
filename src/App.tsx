import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ������ �������� ����� ��������� ����� */}

            {/* ���������� 404 � ������ ���� ��������� */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;