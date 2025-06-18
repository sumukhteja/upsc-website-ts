import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse, notFoundResponse } from "../utils/response"
import { quizDb } from "../utils/database"
import { v4 as uuidv4 } from "uuid"

export const getQuizzes: APIGatewayProxyHandler = async (event) => {
  try {
    const { subject, difficulty, page = "1", limit = "20" } = event.queryStringParameters || {}

    const pageNum = Number.parseInt(page)
    const limitNum = Number.parseInt(limit)

    let result

    if (subject) {
      result = await quizDb.query("subject = :subject", { ":subject": subject }, "SubjectIndex", limitNum)
    } else if (difficulty) {
      result = await quizDb.query(
        "difficulty = :difficulty",
        { ":difficulty": difficulty },
        "DifficultyIndex",
        limitNum,
      )
    } else {
      result = await quizDb.scan(undefined, undefined, limitNum)
    }

    return successResponse({
      quizzes: result.items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.count,
        totalPages: Math.ceil(result.count / limitNum),
      },
    })
  } catch (error: any) {
    console.error("GetQuizzes error:", error)
    return serverErrorResponse(error.message || "Failed to get quizzes")
  }
}

export const createQuiz: APIGatewayProxyHandler = async (event) => {
  try {
    const { question, options, correctAnswer, explanation, subject, difficulty, tags } = JSON.parse(event.body || "{}")

    if (!question || !options || correctAnswer === undefined || !subject || !difficulty) {
      return errorResponse("Question, options, correctAnswer, subject, and difficulty are required")
    }

    if (!Array.isArray(options) || options.length < 2) {
      return errorResponse("Options must be an array with at least 2 items")
    }

    if (correctAnswer < 0 || correctAnswer >= options.length) {
      return errorResponse("Correct answer index is invalid")
    }

    const quizId = uuidv4()
    const quiz = {
      id: quizId,
      question,
      options,
      correctAnswer,
      explanation: explanation || "",
      subject,
      difficulty,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: event.requestContext.authorizer?.claims?.sub || "system",
    }

    await quizDb.put(quiz)

    return successResponse(quiz, "Quiz created successfully")
  } catch (error: any) {
    console.error("CreateQuiz error:", error)
    return serverErrorResponse(error.message || "Failed to create quiz")
  }
}

export const updateQuiz: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}
    const { question, options, correctAnswer, explanation, subject, difficulty, tags } = JSON.parse(event.body || "{}")

    if (!id) {
      return errorResponse("Quiz ID is required")
    }

    const quiz = await quizDb.get({ id })
    if (!quiz) {
      return notFoundResponse("Quiz not found")
    }

    const updateExpression = []
    const expressionAttributeValues: any = {}

    if (question) {
      updateExpression.push("question = :question")
      expressionAttributeValues[":question"] = question
    }

    if (options) {
      if (!Array.isArray(options) || options.length < 2) {
        return errorResponse("Options must be an array with at least 2 items")
      }
      updateExpression.push("options = :options")
      expressionAttributeValues[":options"] = options
    }

    if (correctAnswer !== undefined) {
      const optionsToCheck = options || quiz.options
      if (correctAnswer < 0 || correctAnswer >= optionsToCheck.length) {
        return errorResponse("Correct answer index is invalid")
      }
      updateExpression.push("correctAnswer = :correctAnswer")
      expressionAttributeValues[":correctAnswer"] = correctAnswer
    }

    if (explanation !== undefined) {
      updateExpression.push("explanation = :explanation")
      expressionAttributeValues[":explanation"] = explanation
    }

    if (subject) {
      updateExpression.push("subject = :subject")
      expressionAttributeValues[":subject"] = subject
    }

    if (difficulty) {
      updateExpression.push("difficulty = :difficulty")
      expressionAttributeValues[":difficulty"] = difficulty
    }

    if (tags) {
      updateExpression.push("tags = :tags")
      expressionAttributeValues[":tags"] = tags
    }

    updateExpression.push("updatedAt = :updatedAt")
    expressionAttributeValues[":updatedAt"] = new Date().toISOString()

    const updatedQuiz = await quizDb.update({ id }, `SET ${updateExpression.join(", ")}`, expressionAttributeValues)

    return successResponse(updatedQuiz, "Quiz updated successfully")
  } catch (error: any) {
    console.error("UpdateQuiz error:", error)
    return serverErrorResponse(error.message || "Failed to update quiz")
  }
}

export const deleteQuiz: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}

    if (!id) {
      return errorResponse("Quiz ID is required")
    }

    const quiz = await quizDb.get({ id })
    if (!quiz) {
      return notFoundResponse("Quiz not found")
    }

    await quizDb.delete({ id })

    return successResponse({ id }, "Quiz deleted successfully")
  } catch (error: any) {
    console.error("DeleteQuiz error:", error)
    return serverErrorResponse(error.message || "Failed to delete quiz")
  }
}
