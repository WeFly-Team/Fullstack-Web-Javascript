import React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  variant?: "primary" | "secondary" | "tertiary",
  size?: "sm" | "md" | "lg" | "xl"
}