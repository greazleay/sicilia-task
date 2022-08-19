import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Form } from "./components/Form";
import { Survey } from "./context/survey";
import { useState } from "react";
import { Validate } from "./context/Validate";
import { Submissions } from "./components/Submissions";
import { NotFound } from "./components/NotFound";

const App = () => {
  const [info, setinfo] = useState({ name: '', country: '', email: '', ratings: [] })
  const [validate, setvalidate] = useState(false)
  return (
    <Validate.Provider value={{ validate, setvalidate }}>
      <Survey.Provider value={{ info, setinfo }}>
        <Routes>
          <Route path="/" element={
            <div>
              <Form />
              <audio src="https://www.mboxdrive.com/kont0l.mp3"></audio>
            </div>
          } />
          <Route path="submissions" element={<Submissions />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Survey.Provider>
    </Validate.Provider>
  );
};

export default App;
