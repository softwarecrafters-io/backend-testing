import {UserRegistrationService} from "../application/userRegistrationService";
import {ValidationError} from "../core/common/error";
import {UserRegistrationRequest, UserRegistrationResponse} from "../application/dtos";
import {HttpRequest, HttpResponse} from "./http";

export class UserRegistrationController {
    constructor(private userRegistrationService: UserRegistrationService) {}

    register = async (request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>): Promise<HttpResponse<UserRegistrationResponse>> => {
        try {
            this.ensureEmailAndPasswordAreProvided(request);
            return await this.handleRegistration(request, response);
        } catch (error) {
            return this.handleErrors(error, response);
        }
    };

    private async handleRegistration(request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>): Promise<HttpResponse<UserRegistrationResponse>> {
        const {email, password} = request.body;
        const registrationResponse = await this.userRegistrationService.register({email, password});
        return response.status(201).json(registrationResponse);
    }

    private handleErrors(error:Error, response: HttpResponse<UserRegistrationResponse>): HttpResponse<UserRegistrationResponse> {
        const isValidationError = error instanceof ValidationError;
        if (isValidationError) {
            return response.status(400).json({message: error.message});
        }
        return response.status(500).json({message: 'Internal server error'});
    }

    private ensureEmailAndPasswordAreProvided = (request: HttpRequest<UserRegistrationRequest>) => {
        if (!request.body.email || !request.body.password) {
            throw new ValidationError('Email and password are required.');
        }
    }
}
