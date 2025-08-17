import { ProfileTabs, ToastNotification } from "@/components";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileTabs />
      {children}
      {/* <ToastNotification /> */}
    </>
  );
}
