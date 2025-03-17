import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export const Checkbox = ({ className, checked, onCheckedChange, ...props }) => (
  <CheckboxPrimitive.Root
    className={`h-4 w-4 rounded border ${className}`}
    checked={checked}
    onCheckedChange={onCheckedChange}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);