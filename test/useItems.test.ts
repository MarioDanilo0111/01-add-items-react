import { describe, expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { UseItems } from "../src/hooks/useItems";

describe("useItems hooks", () => {
  test("should add and remove items", () => {
    const { result } = renderHook(() => UseItems());

    expect(result.current.items.length).toBe(0);

    act(() => {
      result.current.addItem("Jugar a videojuegos");
    });

    act(() => {
      result.current.addItem("Jugar con el perro");
    });

    console.log(result.current.items);
    expect(result.current.items.length).toBe(2);

    /* Remove item */
    act(() => {
      result.current.removeItem(result.current.items[0].id);
    });

    expect(result.current.items.length).toBe(1);

    console.log(result.current.items);
  });
});
