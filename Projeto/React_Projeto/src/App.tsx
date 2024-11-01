import './App.css';
import { Route, Routes } from 'react-router-dom';
import MoviePage from './routes/MoviePage';
import HomePage from './routes/HomePage';
import SearchPage from './routes/SearchPage';
import ListPage from './routes/ListPage';
import ErrorPage from './routes/ErrorPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/list/:listId" element={<ListPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
