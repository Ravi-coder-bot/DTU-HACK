import * as SelectPrimitive from "@radix-ui/react-select";

export const Select = SelectPrimitive.Root;

export const SelectTrigger = ({ className, children, ...props }) => (
  <SelectPrimitive.Trigger
    className={`h-10 w-full rounded-md border ${className}`}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
);

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = ({ className, children, ...props }) => (
  <SelectPrimitive.Content
    className={`relative z-50 rounded-md border ${className}`}
    {...props}
  >
    {children}
  </SelectPrimitive.Content>
);

export const SelectItem = ({ className, children, ...props }) => (
  <SelectPrimitive.Item
    className={`relative flex w-full cursor-pointer ${className}`}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);