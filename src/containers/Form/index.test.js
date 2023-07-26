import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is rendered", () => {
  it("the form elements are displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      const submitButton = await screen.findByText("Envoyer");
    
      fireEvent.click(submitButton);
    
      await waitFor(() => expect(onSuccess).toHaveBeenCalled(), { timeout: 2000 });
    });
  });
});
