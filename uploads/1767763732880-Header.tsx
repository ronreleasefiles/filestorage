"use client";

import { useAuth } from "@/context/AuthContext";
import { Search, Settings, Bell, User as UserIcon, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const { user, signInWithGoogle } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

            <header className="flex items-center justify-between px-4 md:px-8 py-5 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                {/* Left: Greeting & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 text-gray-600 md:hidden hover:bg-gray-100 rounded-xl"
                    >
                        <Menu size={24} />
                    </button>

                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            Hi {user?.displayName?.split(" ")[0] || "Guest"},
                        </h1>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                            <span>My Cloud</span>
                            <span>&gt;</span>
                            <span className="font-semibold text-gray-800">My work</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 md:gap-6">
                    <div className="relative hidden md:block">
                        <Search className="text-gray-400 absolute left-0" size={20} />
                        {/* Hidden Input for generic look currently */}
                    </div>

                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full hidden md:block"
                        title="Settings"
                    >
                        <Settings size={20} />
                    </button>

                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></span>
                    </button>

                    {user ? (
                        <button
                            onClick={() => setIsProfileOpen(true)}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-brand-100 hover:border-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200"
                        >
                            <Image
                                src={user.photoURL || "/default-avatar.png"}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                            />
                        </button>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 hover:bg-brand-200"
                        >
                            <UserIcon size={20} />
                        </button>
                    )}
                </div>
            </header>
        </>
    );
}
