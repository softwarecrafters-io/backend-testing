import {Email} from "../../../../core/valueObjects/email";

describe('The Email', () => {
    it('should create a valid Email object for a valid email string', () => {
        const email = Email.create('example@example.com');
        expect(email.toString()).toBe('example@example.com');
    });

    it('should throw an error for an invalid email string', () => {
        expect(() => {
            Email.create('invalidEmail');
        }).toThrow('Invalid email format');
    });

    it('should return true for two identical emails', () => {
        const email1 = Email.create('example@example.com');
        const email2 = Email.create('example@example.com');
        expect(email1.isEqual(email2)).toBe(true);
    });

    it('should return false for two different emails', () => {
        const email1 = Email.create('example1@example.com');
        const email2 = Email.create('example2@example.com');
        expect(email1.isEqual(email2)).toBe(false);
    });
});
