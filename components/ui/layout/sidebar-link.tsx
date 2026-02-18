
import { cn } from "@/lib/utils";
import PrefetchLink from "../prefetch-link";
import { ChevronDown } from "lucide-react";

type BaseProps = {
    icon: React.ReactNode;
    label: string;
    sidebarExpanded: boolean;
    open?: boolean;
    showChevron?: boolean;
    className?: string;
};

type LinkProps = BaseProps & {
    href: string;
    onClick?: never;
};

type ButtonProps = BaseProps & {
    onClick: () => void;
    href?: never;
};

type SidebarButtonProps = LinkProps | ButtonProps;

export function SidebarButton(props: SidebarButtonProps) {
    const {
        icon,
        label,
        sidebarExpanded,
        open,
        showChevron,
        className,
    } = props;

    const content = (
        <>
            {icon}
            {sidebarExpanded && (
                <>
                    <span className="flex-1 text-left font-bold">
                        {label}
                    </span>
                    {showChevron && (
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform",
                                open && "rotate-180"
                            )}
                        />
                    )}
                </>
            )}
        </>
    );

    const classes = cn(
        "flex w-full items-center gap-3 rounded px-2 py-2 text-sm",
        "transition-all duration-300 hover:scale-105 hover:bg-white/10",
        !sidebarExpanded && "justify-start",
        className
    );

    // 🔒 Type-safe branching
    if ("href" in props) {
        return (
            <PrefetchLink href={props.href as string} className={classes}>
                {content}
            </PrefetchLink>
        );
    }

    return (
        <button
            type="button"
            onClick={props.onClick}
            className={classes}
        >
            {content}
        </button>
    );
}
