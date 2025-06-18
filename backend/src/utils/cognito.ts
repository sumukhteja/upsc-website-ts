import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminGetUserCommand,
  ListUsersCommand,
  AdminUpdateUserAttributesCommand,
  AdminDeleteUserCommand,
  AdminInitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import type { CognitoUser } from "../types"

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION })
const userPoolId = process.env.COGNITO_USER_POOL_ID!
const clientId = process.env.COGNITO_CLIENT_ID!

export class CognitoService {
  async createUser(email: string, password: string, name: string, role = "user"): Promise<string> {
    try {
      // Create user
      const createCommand = new AdminCreateUserCommand({
        UserPoolId: userPoolId,
        Username: email,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "name", Value: name },
          { Name: "custom:role", Value: role },
          { Name: "email_verified", Value: "true" },
        ],
        // MessageAction: "SUPPRESS", // Don't send welcome email
        TemporaryPassword: password,
      })

      const result = await cognitoClient.send(createCommand)

      // Set permanent password
      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: userPoolId,
        Username: email,
        Password: password,
        Permanent: true,
      })

      await cognitoClient.send(setPasswordCommand)

      return result.User?.Username || email
    } catch (error) {
      console.error("Cognito create user error:", error)
      throw error
    }
  }

  async authenticateUser(email: string, password: string): Promise<any> {
    try {
      const command = new AdminInitiateAuthCommand({
        UserPoolId: userPoolId,
        ClientId: clientId,
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })

      const result = await cognitoClient.send(command)
      return result.AuthenticationResult
    } catch (error) {
      console.error("Cognito auth error:", error)
      throw error
    }
  }

  async getUser(username: string): Promise<CognitoUser | null> {
    try {
      const command = new AdminGetUserCommand({
        UserPoolId: userPoolId,
        Username: username,
      })

      const result = await cognitoClient.send(command)
      return {
        Username: result.Username!,
        Attributes: result.UserAttributes || [],
        UserCreateDate: result.UserCreateDate!,
        UserLastModifiedDate: result.UserLastModifiedDate!,
        Enabled: result.Enabled!,
        UserStatus: result.UserStatus!,
      }
    } catch (error) {
      console.error("Cognito get user error:", error)
      return null
    }
  }

  async listUsers(limit?: number, paginationToken?: string): Promise<{ users: CognitoUser[]; nextToken?: string }> {
    try {
      const command = new ListUsersCommand({
        UserPoolId: userPoolId,
        Limit: limit,
        PaginationToken: paginationToken,
      })

      const result = await cognitoClient.send(command)
      const users =
        result.Users?.map((user) => ({
          Username: user.Username!,
          Attributes: user.Attributes || [],
          UserCreateDate: user.UserCreateDate!,
          UserLastModifiedDate: user.UserLastModifiedDate!,
          Enabled: user.Enabled!,
          UserStatus: user.UserStatus!,
        })) || []

      return {
        users,
        nextToken: result.PaginationToken,
      }
    } catch (error) {
      console.error("Cognito list users error:", error)
      throw error
    }
  }

  async updateUser(username: string, attributes: Array<{ Name: string; Value: string }>): Promise<boolean> {
    try {
      const command = new AdminUpdateUserAttributesCommand({
        UserPoolId: userPoolId,
        Username: username,
        UserAttributes: attributes,
      })

      await cognitoClient.send(command)
      return true
    } catch (error) {
      console.error("Cognito update user error:", error)
      throw error
    }
  }

  async deleteUser(username: string): Promise<boolean> {
    try {
      const command = new AdminDeleteUserCommand({
        UserPoolId: userPoolId,
        Username: username,
      })

      await cognitoClient.send(command)
      return true
    } catch (error) {
      console.error("Cognito delete user error:", error)
      throw error
    }
  }
}

export const cognitoService = new CognitoService()
