import { render, screen } from "@testing-library/react";

import App from "./App.tsx";

test("renders app correctly", () => {
  render(<App />);
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});
