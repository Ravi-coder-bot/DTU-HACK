import * as SliderPrimitive from "@radix-ui/react-slider";

export const Slider = (props) => (
  <SliderPrimitive.Root
    className="relative flex items-center w-full h-5"
    {...props}
  >
    <SliderPrimitive.Track className="bg-gray-200 relative flex-grow h-1">
      <SliderPrimitive.Range className="absolute bg-blue-500 h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-4 h-4 bg-blue-500 rounded-full" />
  </SliderPrimitive.Root>
);