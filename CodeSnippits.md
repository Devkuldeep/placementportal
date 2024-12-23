```markdown
# MongoDB Connection Script

This script demonstrates how to connect to a MongoDB database using Mongoose.

```javascript
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
            "\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}"
        );
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;
```

# App Setup 

```javascript
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

export {app}
```

# Custom template for async hanlder function  path /utils/asyncHandler.js
```javascript
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        });
    }
};

```
# another way of make the handler funtion with promies

```javascript
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };

```

# Custom error handler funtion path /utils/apiError.js

```javascript

class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}

```

# Custom Api Response Hander funtion path /utils/apiResponseHander.js

```javascript
 

```




```