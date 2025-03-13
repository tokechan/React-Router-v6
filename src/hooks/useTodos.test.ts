import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";
import {describe, it, expect} from "vitest";

describe('useTodos', () => {
    it('colect default state', () => {
        const { result } = renderHook(() => useTodos());

        expect(result.current.todos).toHaveLength(3);
        expect(result.current.todos[0].text).toBe('Todo 1');
    });

    it('addTodo: Add New Todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('New Todo');
        });

        expect(result.current.todos).toHaveLength(4);
        expect(result.current.todos[3].text).toBe('New Todo');
        expect(result.current.todos[3].completed).toBe(false);
    });

    it('updateTodo: Update Existing Todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.updateTodo(1, 'Updated Todo');
        });

        expect(result.current.todos[0].text).toBe('Updated Todo');
    });

    it('deleteTodo: Delete Existing Todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.deleteTodo(2);;
        });

        expect(result.current.todos).toHaveLength(2);
        expect(result.current.todos.find(todo => todo.id === 2)).toBeUndefined();
    });
})