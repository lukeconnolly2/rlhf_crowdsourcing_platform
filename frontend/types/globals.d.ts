export {}

export type Roles = "admin" | "developer" | "user"

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "developer"
    }
  }
}
