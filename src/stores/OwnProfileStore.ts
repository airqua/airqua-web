import { create } from 'zustand';
import {User} from "../types/domain.ts";

type OwnProfileStore = {
    profile: User | null;
    setProfile: (p: User | null) => void
};

export const useOwnProfile = create<OwnProfileStore>((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile })
}));