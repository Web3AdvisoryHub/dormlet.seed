import React from "react";
import UserLinks from "@/components/UserLinks";

export async function generateStaticParams() {
  // Return an empty array for now since we don't have any static paths
  return [];
}

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{params.username}'s Profile</h1>
      <UserLinks username={params.username} isEditable={false} />
    </div>
  );
}
