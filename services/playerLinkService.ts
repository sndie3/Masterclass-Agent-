export interface LinkPlayerRequest {
    mobileNumber: string;
    password: string;
}

export interface LinkPlayerResponse {
    success: boolean;
    message: string;
    playerId?: string;
    mobileNumber?: string;
}

const LINKED_PLAYER_KEY = "linkedPlayerAccount";

/**
 * Sends player credentials to the agent backend for verification and linking.
 * TODO: Replace localStorage mock with real API call to /api/player-link
 */
export async function linkPlayerAccount(request: LinkPlayerRequest): Promise<LinkPlayerResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { mobileNumber, password } = request;

    if (!mobileNumber || !password) {
        return {
            success: false,
            message: "Please enter mobile number and password.",
        };
    }

    // Mock validation: accept any 10+ digit mobile with non-empty password
    const cleanMobile = mobileNumber.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
        return {
            success: false,
            message: "Please enter a valid mobile number.",
        };
    }

    const linkedAccount: LinkPlayerResponse = {
        success: true,
        message: "Player account linked successfully.",
        playerId: `player_${cleanMobile.slice(-6)}`,
        mobileNumber: cleanMobile,
    };

    localStorage.setItem(LINKED_PLAYER_KEY, JSON.stringify(linkedAccount));

    return linkedAccount;
}

/**
 * Removes the linked player account mapping.
 * TODO: Replace localStorage mock with real API call to /api/player-link (DELETE)
 */
export async function deactivatePlayerLink(): Promise<LinkPlayerResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    localStorage.removeItem(LINKED_PLAYER_KEY);

    return {
        success: true,
        message: "Player account link deactivated.",
    };
}

/**
 * Returns the currently linked player account if any.
 */
export function getLinkedPlayerAccount(): LinkPlayerResponse | null {
    const stored = localStorage.getItem(LINKED_PLAYER_KEY);

    if (!stored) return null;

    try {
        return JSON.parse(stored) as LinkPlayerResponse;
    } catch {
        localStorage.removeItem(LINKED_PLAYER_KEY);
        return null;
    }
}
