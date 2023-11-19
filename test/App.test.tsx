import React from "react";
/* User Event e2e testing */
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("<App/>", () => {
  // test("should work", () => {
  //   render(<App />);
  //   /* const { getByText } = render(<App />); */
  //   /* screen.debug() */

  //   /* Usando Regex */
  //   expect(screen.getByText(/React/i)).toBeDefined();
  //   /* expect(screen.getByText(/Angular/i)).toBeDefined(); */
  //   expect(screen.getByText("List Elelemt")).toBeDefined();
  //   /* expect(screen.getByText("No Esta")).toBeDefined(); */
  // });

  /* End to End Test */
  test("shuld add a item and remove them", async () => {
    const user = userEvent.setup();

    render(<App />);
    // get by input
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();

    // search the form
    const form = screen.getByRole("form");
    expect(form).toBeDefined();

    const button = form.querySelector("button");
    expect(button).toBeDefined();

    /* Agregar a la lista */
    /* solo 1 texto agregado */
    /* await user.type(input, "Danilo");
    await user.click(button!); */

    /* Encontrar por Cripto Random UUID */
    const randomText = crypto.randomUUID();
    await user.type(input, randomText);
    await user.click(button!);

    // asegurar q el usario sea agregado
    /* Render screen */
    /* screen.debug(); */
    const list = screen.getByRole("list");
    expect(list).toBeDefined();
    expect(list.childNodes.length).toBe(1);

    // asegurar que lo podemos borrar
    const item = screen.getByText(randomText);
    const removeButton = item.querySelector("button");
    expect(removeButton).toBeDefined();

    await user.click(removeButton!);

    /* Wrong text searched */
    /* const noResults = screen.getByText("No elements in the List"); */
    /* find the text */
    const findResult = screen.getByText("NO ELEMENTS");
    expect(findResult).toBeDefined();
  });
});

/* Testing library React */
/* https://testing-library.com/docs/react-testing-library/intro/
 * npm install -D @testing-library/react
 */

/* Testing Library User Event End2End */
/* https://testing-library.com/docs/ecosystem-user-event/
 *  npm install @testing-library/user-event -D
 */
