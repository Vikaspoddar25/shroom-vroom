import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Section({ as: Comp = "section", className, children, ...props }: SectionProps) {
  return (
    <Comp className={cn("py-16 md:py-24", className)} {...props}>
      {children}
    </Comp>
  );
}
