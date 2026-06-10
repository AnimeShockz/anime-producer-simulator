"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import Simulator from "./pages/Simulator";
import Result from "./pages/Result";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/simulator/result" element={<Result />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;