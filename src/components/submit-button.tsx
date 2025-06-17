"use client";

import { type ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingText?: string;
  formAction?: (formData: FormData) => void;
}

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  className = "",
  disabled,
  formAction,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  const baseStyles = `
    relative inline-flex items-center justify-center
    px-4 py-2 text-sm font-medium
    border border-transparent rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none
  `;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      formAction={formAction}
      className={`${baseStyles} ${className}`}
      aria-disabled={isDisabled}
      {...props}
    >
      {pending && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {pending ? pendingText : children}
    </button>
  );
}