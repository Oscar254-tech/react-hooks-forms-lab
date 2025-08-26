import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import ShoppingList from "../components/ShoppingList";
import Filter from "../components/Filter";

const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Pomegranate", category: "Produce" },
  { id: 3, name: "Lettuce", category: "Produce" },
  { id: 4, name: "String Cheese", category: "Dairy" },
  { id: 5, name: "Swiss Cheese", category: "Dairy" },
  { id: 6, name: "Cookies", category: "Dessert" },
];

const noop = () => {};

test("uses a prop of 'search' to display the search term in the input field", () => {
  render(<Filter search="testing" onSearchChange={noop} />);
  expect(screen.getByPlaceholderText(/Search/).value).toBe("testing");
});

test("calls the onSearchChange callback prop when the input is changed", () => {
  const handleSearchChange = jest.fn();
  render(<Filter search="" onSearchChange={handleSearchChange} />);

  fireEvent.change(screen.getByPlaceholderText(/Search/), {
    target: { value: "testing" },
  });

  expect(handleSearchChange).toHaveBeenCalledWith("testing");
});

test("the input field acts as a controlled input", () => {
  render(<App initialItems={testData} />);
  
  fireEvent.change(screen.getByPlaceholderText(/Search/), {
    target: { value: "testing 123" },
  });

  expect(screen.getByPlaceholderText(/Search/).value).toBe("testing 123");
});

test("the shopping list displays all items when initially rendered", () => {
  const { container } = render(<ShoppingList items={testData} />);
  expect(container.querySelector(".Items").children).toHaveLength(
    testData.length
  );
});

test("the shopping filters based on the search term to include full matches", () => {
  render(<App initialItems={testData} />);
  
  fireEvent.change(screen.getByPlaceholderText(/Search/), {
    target: { value: "Yogurt" },
  });

  expect(screen.getByText("Yogurt")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
});

test("the shopping filters based on the search term to include partial matches", () => {
  render(<App initialItems={testData} />);
  
  fireEvent.change(screen.getByPlaceholderText(/Search/), {
    target: { value: "Cheese" },
  });

  expect(screen.getByText("Swiss Cheese")).toBeInTheDocument();
  expect(screen.getByText("String Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});