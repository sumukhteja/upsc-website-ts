import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
})

const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!

export class AuthService {
  async signUp(email: string, password: string, name: string) {
    try {
      const command = new SignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
          {
            Name: "name",
            Value: name,
          },
        ],
      })

      const response = await cognitoClient.send(command)
      return {
        success: true,
        userSub: response.UserSub,
        message: "User created successfully. Please check your email for verification code.",
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  async confirmSignUp(email: string, confirmationCode: string) {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        ConfirmationCode: confirmationCode,
      })

      await cognitoClient.send(command)
      return {
        success: true,
        message: "Email verified successfully!",
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  async signIn(email: string, password: string) {
    try {
      const command = new InitiateAuthCommand({
        ClientId: CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })

      const response = await cognitoClient.send(command)

      if (response.AuthenticationResult) {
        return {
          success: true,
          tokens: {
            accessToken: response.AuthenticationResult.AccessToken,
            idToken: response.AuthenticationResult.IdToken,
            refreshToken: response.AuthenticationResult.RefreshToken,
          },
        }
      }

      return {
        success: false,
        error: "Authentication failed",
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  }
}

export const authService = new AuthService()
