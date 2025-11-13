import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home";

test("modal opens with character details", async () => {
  render(<Home />);

  // Wait for characters to load
  await waitFor(() => expect(screen.getAllByText(/Height:/i).length).toBeGreaterThan(0));

  // Click first character card
  fireEvent.click(screen.getAllByText(/Height:/i)[0]);

  // Expect modal to show
  await waitFor(() => expect(screen.getByText(/Birth Year:/i)).toBeInTheDocument());
});
