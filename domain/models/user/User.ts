import { AccessToken } from "../auth/AccessToken";
import { RefreshToken } from "../auth/RefreshToken";
import { SupabaseToken } from "../auth/SupabaseToken";
import { UserId } from "./UserId";

export class User {
    private constructor(
    private readonly _userId: UserId,
    private accessToken: AccessToken,
    private refreshToken?: RefreshToken,
    private supabaseToken?: SupabaseToken,
    private _name?: string,
    private _picture_url?: string,
    private _email?: string,
) {}

    static create(
        userId: UserId,
        accessToken: AccessToken,
        refreshToken?: RefreshToken,
        supabaseToken?: SupabaseToken,
        name?: string,
        picture_url?: string,
        email?: string,
    ): User {
        return new User(userId, accessToken, refreshToken, supabaseToken, name, picture_url, email);
    }

    get userId(): UserId {
        return this._userId;
    }

    get email(): string | undefined {
        return this._email!;
    }

    get name(): string | undefined {
        return this._name;
    }

    get picture_url(): string | undefined {
        return this._picture_url;
    }

    getAccessToken(): AccessToken {
        return this.accessToken;
    }

    getSupabaseToken(): SupabaseToken | undefined {
        return this.supabaseToken;
    }

    getRefreshToken(): RefreshToken | undefined {
        return this.refreshToken;
    }

    hasRefreshToken(): boolean {
        return !!this.refreshToken;
    }

    withUpdatedAccessToken(newAccessToken: AccessToken): User {
        return new User(this._userId, newAccessToken, this.refreshToken, this.supabaseToken, this._name, this._picture_url, this._email, this._expiresIn);
    }

    withUpdatedSupabaseToken(newSupabaseToken: SupabaseToken): User {
        return new User(this._userId, this.accessToken, this.refreshToken, newSupabaseToken, this._name, this._picture_url, this._email, this._expiresIn);
    }

    withUpdatedRefreshToken(newRefreshToken: RefreshToken): User {
        return new User(this._userId, this.accessToken, newRefreshToken, this.supabaseToken, this._name, this._picture_url, this._email, this._expiresIn);
    }
}