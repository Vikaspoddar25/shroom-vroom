import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({ as: Comp = "div", className, children, ...props }: ContainerProps) {
  return (
    <Comp className={cn("container-wide", className)} {...props}>
      {children}
    </Comp>
  );
}
