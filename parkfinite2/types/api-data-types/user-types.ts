type UserAccountType = "NORMAL" | "ADMIN"

export interface UserAccountData {
    user_id: number,
    user_account_id: number,
    user_email: string,
    user_firstname: string,
    user_lastname: string,
    camera_permission: boolean,
    user_type: UserAccountType,
    xp: number
}