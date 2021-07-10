interface FieldError {
    field?: string;
    message: string;
}

export default class ResponseBase {
    ok: boolean = true;
    error?: FieldError;

    public static Succeed(): ResponseBase {
        return new ResponseBase();
    }

    public static Failed(message: string, field?: string): ResponseBase {
        return {
            ok: false,
            error: {
                field,
                message
            }
        };
    }
}