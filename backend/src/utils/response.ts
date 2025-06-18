export const createResponse = <T>(
  statusCode: number,
  body: APIResponse<T>
): APIGatewayProxyResult => {\
  return {
    statusCode,\
    headers: {
      'Content-Type\': \'application/json',
      'Access-Control-Allow-Origin\': \'*',
      'Access-Control-Allow-Headers\': \'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods\': \'GET,POST,PUT,DELETE,OPTIONS',
    },
    body: JSON.stringify(body),
  };
};

export const successResponse = <T>(data: T, message?: string): APIGatewayProxyResult => {\
  return createResponse(200, {\
    success: true,
    data,
    message,
  });
};

export const errorResponse = (error: string, statusCode: number = 400): APIGatewayProxyResult => {\
  return createResponse(statusCode, {\
    success: false,
    error,
  });
};

export const notFoundResponse = (message: string = 'Resource not found'): APIGatewayProxyResult => {\
  return createResponse(404, {\
    success: false,
    error: message,
  });
};

export const unauthorizedResponse = (message: string = 'Unauthorized'): APIGatewayProxyResult => {\
  return createResponse(401, {\
    success: false,
    error: message,
  });
};

export const serverErrorResponse = (message: string = 'Internal server error'): APIGatewayProxyResult => {\
  return createResponse(500, {\
    success: false,
    error: message,
  });
};\
