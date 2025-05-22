import { Routes, Route } from "react-router";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AllImages />} />
            <Route path="/images/:id" element={<ImageDetails />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
