import cloudinary from "cloudinary";
import ClientLayout from "./ClientLayout";

export type Folder = {
  name: string;
  path: string;
};

export default async function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  return (
    <ClientLayout folders={folders}>
      {children}
    </ClientLayout>
  );
}

//AppShell -> manages "what data the app has"