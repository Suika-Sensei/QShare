import { useState } from "react";
import SocialNetworkPicker from "../components/SocialNetworkPicker/SocialNetworkPicker";
import Icons from "../components/SocialNetworkPicker/Icons";

const socialNetworks = [
  {
    name: "Number",
    id: "number",
    icon: Icons.PhoneNumber({}),
  },
  { name: "Telegram", id: "telegram", icon: Icons.Telegram({}) },
  { name: "WhatsApp", id: "whatsapp", icon: Icons.WhatsApp({}) },
  { name: "Instagram", id: "instagram", icon: Icons.Instagram({}) },
  { name: "TikTok", id: "tiktok", icon: Icons.TikTok({}) },
];

export default function Home() {
  return (
    <div className="mt-[5em]">
      <SocialNetworkPicker socialNetworks={socialNetworks} />
    </div>
  );
}
