import { SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/utils/use-avatar";
import { useUser } from "@clerk/nextjs"
import Link from "next/link";

export const StudioSidebarHeader = () => {
    const { user } = useUser();
    const { state } = useSidebar();
    if (!user) {
        return (
            <SidebarHeader className="flex items-center justify-center pb-4">
                <Skeleton className="size-[112px] rounded-full" />
                <div className="flex flex-col items-center mt-2 gap-y-1.5">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-28" />
                </div>
            </SidebarHeader>
        )
    }
    if (state === 'collapsed') {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Your Profile" asChild>
                    <Link href='/user/current'>
                        <UserAvatar
                            imageUrl={user?.imageUrl ?? ''}
                            name={user?.fullName ?? 'User'}
                            size="xs"
                        />
                        <span className="text-sm">Your Profile</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }
    return (
        <SidebarHeader className="flex items-center justify-center pb-4">
            <Link href='/user/current'>
                <UserAvatar
                    imageUrl={user?.imageUrl ?? ''}
                    name={user?.fullName ?? 'User'}
                    className="size-[112px] hover:opacity-80 transition-opacity"
                />
            </Link>
            <div className="flex flex-col items-center mt-2 gap-y-1.5">
                <p className="text-sm text-muted-foreground">Your profile</p>
                <p className="text-lg font-semibold">{user?.fullName ?? 'User'}</p>
            </div>
        </SidebarHeader>
    )
}
